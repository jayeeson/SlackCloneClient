import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChannelState } from '../types';

const initialState: ChannelState = {
  activeChannelId: 2,
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setActiveChannelId: (state, { payload }: PayloadAction<{ channelId: number }>) => {
      const { channelId } = payload;
      if (!channelId) {
        return state;
      }
      return { ...state, activeChannelId: channelId };
    },
  },
});