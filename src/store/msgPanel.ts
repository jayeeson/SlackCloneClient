import { createSlice } from '@reduxjs/toolkit';
import { MsgPanelType } from '../types';

interface PanelState {
  openPanel: MsgPanelType;
}

const initialState: PanelState = {
  openPanel: MsgPanelType.ChannelMessageList,
};

export const msgPanelSlice = createSlice({
  name: 'msgPanel',
  initialState,
  reducers: {
    openChannelMessageList: state => ({ ...state, openPanel: MsgPanelType.ChannelMessageList }),
    openDirectMessageIndex: state => ({ ...state, openPanel: MsgPanelType.DirectMessageIndex }),
  },
});
