import _ from 'lodash';
import { AnyAction, createAsyncThunk, createSlice, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import SocketApi from '../apis/socket';
import {
  ChatChannel,
  ChatMessage,
  ChatServer,
  ChatUser,
  CreateChannelRequest,
  SendMessagePayload,
  StartupData,
} from '../types';
import { getLocalStorageActiveChannel, getLocalStorageActiveServer } from '../helpers/localStorage';
import { AppThunk, RootState } from '.';

interface ChatState {
  servers: { [idx: string]: ChatServer };
  channels: { [idx: string]: ChatChannel };
  messages: { [idx: string]: ChatMessage };
  user: ChatUser | null;
  activeChannelId: number;
  activeServerId: number;
  initialDataFetched: boolean;
}

const initialState: ChatState = {
  servers: {},
  channels: {},
  messages: {},
  user: null,
  activeServerId: 0,
  activeChannelId: 0,
  initialDataFetched: false,
};

export const getStartupData = createAsyncThunk('chat/getInitialData', async (unusedParam, thunkAPI) => {
  const data = await SocketApi.getStartupData();
  const { username } = data.user;
  const serverId = getLocalStorageActiveServer(username);
  (thunkAPI.dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(setActiveServer({ serverId }));
  return data;
});

export const getOldestMessages = createAsyncThunk(
  'chat/getOldestMessages',
  async ({ quantity, offset }: { quantity: number; offset?: number }) => {
    const data = await SocketApi.getOldestMessages(quantity, offset);
    return data;
  }
);

export const getNewestMessages = createAsyncThunk(
  'chat/getNewestMessages',
  async ({ quantity, offset }: { quantity: number; offset?: number }) => {
    const data = await SocketApi.getNewestMessages(quantity, offset);
    return data;
  }
);

export const getLatestMessagesForChannel = createAsyncThunk(
  'chat/getLatestMessagesForChannel',
  async ({ channelId, quantity, offset }: { channelId: number; quantity: number; offset?: number }) => {
    const data = await SocketApi.getLatestMessagesForChannel(channelId, quantity, offset);
    return data;
  }
);

export const createServer = createAsyncThunk('chat/createServer', async ({ serverName }: { serverName: string }) => {
  const data = await SocketApi.createServer(serverName);
  if (!data) {
    throw new Error('server error, could not create new chat server');
  }
  return data;
});

export const createChannel = createAsyncThunk('chat/createChannel', async (payload: CreateChannelRequest) => {
  const data = await SocketApi.createChannel(payload);
  return data;
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async (payload: SendMessagePayload) => {
  const data = await SocketApi.sendMessage(payload);
  return data;
});

export const setActiveServer = ({ serverId }: { serverId: number }): AppThunk => (dispatch, getState) => {
  const state = getState();
  const username = state.chat.user?.username;
  dispatch(chatSlice.actions.setActiveServerImpl({ serverId, username }));

  const storedActiveChannel = getLocalStorageActiveChannel(serverId, username ?? '');
  const randomChannelInServer = Object.values(state.chat.channels).find(channel => channel.serverId === serverId);
  dispatch(
    chatSlice.actions.setActiveChannel({
      channelId: (storedActiveChannel || randomChannelInServer?.id) ?? 0,
      username,
    })
  );
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }: PayloadAction<{ channelId: number; username: string | undefined }>) => {
      const { channelId, username } = payload;
      if (!(channelId && username)) {
        return state;
      }
      SocketApi.setActiveChannel(channelId, state.activeChannelId);
      localStorage.setItem(`chatClient#activeChannel@${username}:${state.activeServerId}`, channelId.toString());
      return { ...state, activeChannelId: channelId };
    },
    setActiveServerImpl: (state, { payload }: PayloadAction<{ serverId: number; username?: string }>) => {
      const { serverId, username } = payload;
      if (!(serverId && username)) {
        return state;
      }
      SocketApi.setActiveServer(serverId, state.activeServerId);
      localStorage.setItem(`chatClient#activeServer@${username}`, serverId.toString());
      return { ...state, activeServerId: serverId };
    },
    clearFetchedData: () => {
      return initialState;
    },
    receivedMessage: (state, { payload }: PayloadAction<ChatMessage>) => {
      const { id } = payload;
      return { ...state, messages: { ...state.messages, [id]: { ...payload } } };
    },
  },
  extraReducers: {
    [getStartupData.fulfilled.type]: (state, { payload }: PayloadAction<StartupData>) => {
      if (payload) {
        return {
          ...state,
          servers: { ..._.mapKeys(payload.servers, 'id') },
          channels: { ..._.mapKeys(payload.channels, 'id') },
          initialDataFetched: true,
          user: payload.user,
        };
      }
      return state;
    },
    [createServer.fulfilled.type]: (
      state,
      { payload }: PayloadAction<{ server: ChatServer; channels: ChatChannel[] }>
    ) => {
      const { id, name, ownerUserId } = payload?.server;
      const defaultChannels: { [idx: string]: ChatChannel } = payload.channels.reduce((acc, cur) => {
        return { ...acc, [cur.id]: cur };
      }, {});
      if (id) {
        SocketApi.setActiveServer(id);

        return {
          ...state,
          servers: { ...state.servers, [id]: { id, name, ownerUserId } },
          activeServerId: id,
          channels: { ...state.channels, ...defaultChannels },
        };
      }
    },
    [createChannel.fulfilled.type]: (state, { payload }: PayloadAction<ChatChannel>) => {
      const { id } = payload;
      return { ...state, channels: { ...state.channels, [id]: payload }, activeChannelId: id };
    },
    [getOldestMessages.fulfilled.type]: (state, { payload }: PayloadAction<ChatMessage[]>) => {
      return { ...state, messages: { ..._.mapKeys(payload, 'id') } };
    },
    [getNewestMessages.fulfilled.type]: (state, { payload }: PayloadAction<ChatMessage[]>) => {
      return { ...state, messages: { ..._.mapKeys(payload, 'id') } };
    },
    [getLatestMessagesForChannel.fulfilled.type]: (state, { payload }: PayloadAction<ChatMessage[]>) => {
      return { ...state, messages: { ..._.mapKeys(payload, 'id') } };
    },
  },
});
