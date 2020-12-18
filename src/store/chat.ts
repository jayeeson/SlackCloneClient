import _ from 'lodash';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ServerApi from '../apis/server';
import { ChatChannel, ChatServer, ChatUser, CreateChannelRequest } from '../types';

interface ChatState {
  servers: { [idx: string]: ChatServer };
  channels: { [idx: string]: ChatChannel };
  user: ChatUser | null;
  activeChannelId: number;
  activeServerId: number;
  initialDataFetched: boolean;
}

const initialState: ChatState = {
  servers: {},
  channels: {},
  user: null,
  activeChannelId: 2, ///\todo: fix value
  activeServerId: 1, ///\todo: fix value
  initialDataFetched: false,
};

export const fetchStartupData = createAsyncThunk('chat/fetchInitialData', async () => {
  const data = await ServerApi.getStartupData();
  return data;
});

export const createServer = createAsyncThunk('chat/createServer', async ({ serverName }: { serverName: string }) => {
  const data = await ServerApi.createServer(serverName);
  console.log(data);
  return data;
});

export const createChannel = createAsyncThunk('chat/createChannel', async (payload: CreateChannelRequest) => {
  const data = await ServerApi.createChannel(payload);
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
      fetchStartupData.fulfilled,
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
            activeServerId: payload.servers[0].id,
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
  },
});
