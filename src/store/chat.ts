import _ from 'lodash';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ServerApi from '../apis/server';
import { ChatChannel, ChatServer, ChatUser } from '../types';

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
  activeChannelId: 2,
  activeServerId: 1,
  initialDataFetched: false,
};

export const fetchInitialData = createAsyncThunk('chat/fetchInitialData', async () => {
  const data = await ServerApi.getStartupData();
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
  },
  extraReducers: builder => {
    builder.addCase(
      fetchInitialData.fulfilled,
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
          };
        }
        return state;
      }
    );
  },
});
