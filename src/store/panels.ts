import { createSlice } from '@reduxjs/toolkit';
import { PanelState } from '../types';

const initialState: PanelState = { sidebar: true, msgPanel: true, viewPanel: true };

export const panelsSlice = createSlice({
  name: 'openPanels',
  initialState,
  reducers: {
    doOpenSidebar: state => {
      return { ...state, sidebar: true };
    },
    doCloseSidebar: state => {
      return { ...state, sidebar: false };
    },
    doOpenMsgPanel: state => {
      return { ...state, msgPanel: true };
    },
    doCloseMsgPanel: state => {
      return { ...state, msgPanel: false };
    },
    doOpenViewPanel: state => {
      return { ...state, viewPanel: true };
    },
    doCloseViewPanel: state => {
      return { ...state, viewPanel: false };
    },
  },
});
