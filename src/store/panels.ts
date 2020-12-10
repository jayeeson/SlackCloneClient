import { createSlice } from '@reduxjs/toolkit';
import { PanelState } from '../types';

const initialState: PanelState = { sidebar: true, msgPanel: true, viewPanel: true };

export const panelsSlice = createSlice({
  name: 'openPanels',
  initialState,
  reducers: {
    doOpenSidebar: state => ({ ...state, sidebar: true }),
    doCloseSidebar: state => ({ ...state, sidebar: false }),
    doOpenMsgPanel: state => ({ ...state, msgPanel: true }),
    doCloseMsgPanel: state => ({ ...state, msgPanel: false }),
    doOpenViewPanel: state => ({ ...state, viewPanel: true }),
    doCloseViewPanel: state => ({ ...state, viewPanel: false }),
  },
});
