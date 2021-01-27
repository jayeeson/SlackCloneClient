import { createSlice } from '@reduxjs/toolkit';
import { MainPanelType } from '../types';

interface PanelState {
  openPanel: MainPanelType;
}

const initialState: PanelState = {
  openPanel: MainPanelType.ChannelMessageList,
};

export const mainPanelSlice = createSlice({
  name: 'mainPanel',
  initialState,
  reducers: {
    openChannelMessageList: state => ({ ...state, openPanel: MainPanelType.ChannelMessageList }),
    openDirectMessageIndex: state => ({ ...state, openPanel: MainPanelType.DirectMessageIndex }),
  },
});
