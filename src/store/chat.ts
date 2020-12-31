import _ from 'lodash';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ServerApi from '../apis/server';
import SocketApi from '../apis/socket';
import {
  ChatChannel,
  ChatMessage,
  ChatServer,
  ChatUser,
  CreateChannelRequest,
  localStorageKey,
  SendMessagePayload,
} from '../types';

interface ChatState {
  servers: { [idx: string]: ChatServer };
  channels: { [idx: string]: ChatChannel };
  messages: { [idx: string]: ChatMessage };
  user: ChatUser | null;
  activeChannelId: number;
  activeServerId: number;
  initialDataFetched: boolean;
}

const activeServerInStorage = parseInt(localStorage.getItem(localStorageKey.ChatUiSettings.activeServer) ?? '0', 10);
const initialState: ChatState = {
  servers: {},
  channels: {},
  messages: {},
  user: null,
  activeServerId: activeServerInStorage,
  activeChannelId: parseInt(localStorage.getItem(`server#${activeServerInStorage}`) ?? '0', 10),
  initialDataFetched: false,
};

export const getStartupData = createAsyncThunk('chat/getInitialData', async () => {
  const data = await ServerApi.getStartupData();
  return data;
});

export const getOldestMessages = createAsyncThunk(
  'chat/getOldestMessages',
  async ({ quantity, offset }: { quantity: number; offset?: number }) => {
    const data = await ServerApi.getOldestMessages(quantity, offset);
    return data;
  }
);

export const createServer = createAsyncThunk('chat/createServer', async ({ serverName }: { serverName: string }) => {
  const data = await ServerApi.createServer(serverName);
  return data;
});

export const createChannel = createAsyncThunk('chat/createChannel', async (payload: CreateChannelRequest) => {
  const data = await ServerApi.createChannel(payload);
  return data;
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async (payload: SendMessagePayload) => {
  const data = await ServerApi.sendMessage(payload);
  console.log(data);
  return data;
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }: PayloadAction<{ channelId: number }>) => {
      const { channelId } = payload;
      if (!channelId) {
        return state;
      }
      localStorage.setItem(`server#${state.activeServerId}`, channelId.toString());
      return { ...state, activeChannelId: channelId };
    },
    setActiveServer: (state, { payload }: PayloadAction<{ serverId: number }>) => {
      const { serverId } = payload;
      if (!serverId) {
        return state;
      }
      SocketApi.setActiveServer(serverId, state.activeServerId);
      localStorage.setItem(localStorageKey.ChatUiSettings.activeServer, state.activeChannelId.toString());
      const storedActiveChannel = localStorage.getItem(`server#${serverId}`);
      const randomChannelInServer = Object.values(state.channels).find(channel => channel.serverId === serverId);
      return {
        ...state,
        activeServerId: serverId,
        activeChannelId: storedActiveChannel ? parseInt(storedActiveChannel, 10) : randomChannelInServer?.id ?? 0,
      };
    },
    clearFetchedData: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getStartupData.fulfilled,
      (
        state,
        {
          payload,
        }: PayloadAction<{
          servers: ChatServer[];
          channels: ChatChannel[];
          user: ChatUser;
        }>
      ) => {
        if (payload) {
          const serverId = state.activeServerId || payload.servers[0]?.id;
          return {
            ...state,
            initialDataFetched: true,
            servers: { ..._.mapKeys(payload.servers, 'id') },
            channels: { ..._.mapKeys(payload.channels, 'id') },
            user: payload.user,
            activeServerId: serverId,
            activeChannelId:
              (state.activeChannelId ||
                Object.values(state.channels).find(channel => channel.serverId === serverId)?.id) ??
              0,
          };
        }
        return state;
      }
    );
    builder.addCase(
      createServer.fulfilled,
      (state, { payload }: PayloadAction<{ server: ChatServer; channels: ChatChannel[] }>) => {
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
      }
    );
    builder.addCase(createChannel.fulfilled, (state, { payload }: PayloadAction<ChatChannel>) => {
      const { id } = payload;
      return { ...state, channels: { ...state.channels, [id]: payload }, activeChannelId: id };
    });
    builder.addCase(getOldestMessages.fulfilled, (state, { payload }: PayloadAction<ChatMessage[]>) => {
      return { ...state, messages: { ..._.mapKeys(payload, 'id') } };
    });
  },
});
