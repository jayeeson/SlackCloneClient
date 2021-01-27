import { createSlice } from '@reduxjs/toolkit';
import { MainPanelType } from '../types';

interface PanelState {
  openPanel: MainPanelType;
}

const initialState: PanelState = {
  openPanel: MainPanelType.ChannelMessageList,
};

export const msgPanelSlice = createSlice({
  name: 'msgPanel',
  initialState,
  reducers: {
    openChannelMessageList: state => ({ ...state, openPanel: MainPanelType.ChannelMessageList }),
    openDirectMessageIndex: state => ({ ...state, openPanel: MainPanelType.DirectMessageIndex }),
  },
});
