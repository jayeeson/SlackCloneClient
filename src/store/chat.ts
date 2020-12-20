import _ from 'lodash';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ServerApi from '../apis/server';
import { ChatChannel, ChatMessage, ChatServer, ChatUser, CreateChannelRequest, SendMessagePayload } from '../types';

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
  activeChannelId: 2, ///\todo: fix value
  activeServerId: 1, ///\todo: fix value
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
      return { ...state, activeChannelId: channelId };
    },
    setActiveServer: (state, { payload }: PayloadAction<{ serverId: number }>) => {
      const { serverId } = payload;
      if (!serverId) {
        return state;
      }
      return { ...state, activeServerId: serverId };
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
          return {
            ...state,
            initialDataFetched: true,
            servers: { ..._.mapKeys(payload.servers, 'id') },
            channels: { ..._.mapKeys(payload.channels, 'id') },
            user: payload.user,
            activeServerId: payload.servers[0]?.id,
          };
        }
        return state;
      }
    );
    builder.addCase(createServer.fulfilled, (state, { payload }: PayloadAction<ChatServer>) => {
      const { id, name, ownerUserId } = payload;
      if (payload.id) {
        return { ...state, servers: { ...state.servers, [id]: { id, name, ownerUserId } }, activeServerId: id };
      }
    });
    builder.addCase(createChannel.fulfilled, (state, { payload }: PayloadAction<ChatChannel>) => {
      const { id } = payload;
      return { ...state, channels: { ...state.channels, [id]: payload }, activeChannelId: id };
    });
    builder.addCase(getOldestMessages.fulfilled, (state, { payload }: PayloadAction<ChatMessage[]>) => {
      console.log('payload', payload);
      return { ...state, messages: { ..._.mapKeys(payload, 'id') } };
    });
  },
});
