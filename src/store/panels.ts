import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import validateWidth from '../utils/validateWidth';
import { localStorageKey } from '../types';

interface PanelState {
  sidebar: boolean;
  msgPanel: boolean;
  viewPanel: boolean;
  sidebarWidth: number;
  viewPanelWidth: number;
}

const initialState: PanelState = {
  sidebar: true,
  msgPanel: true,
  viewPanel: false,
  sidebarWidth: validateWidth(localStorage.getItem(localStorageKey.DraggablePanel.sidebarWidth)) || 250,
  viewPanelWidth: validateWidth(localStorage.getItem(localStorageKey.DraggablePanel.viewPanelWidth)) || 250,
};

export const panelsSlice = createSlice({
  name: 'panels',
  initialState,
  reducers: {
    doOpenSidebar: state => ({ ...state, sidebar: true }),
    doCloseSidebar: state => ({ ...state, sidebar: false }),
    doOpenMainPanel: state => ({ ...state, msgPanel: true }),
    doCloseMainPanel: state => ({ ...state, msgPanel: false }),
    doOpenViewPanel: state => ({ ...state, viewPanel: true }),
    doCloseViewPanel: state => ({ ...state, viewPanel: false }),
    setSidebarWidth: (state, { payload }: PayloadAction<{ width: number }>) => {
      const { width } = payload;
      if (!width) {
        return state;
      }
      return { ...state, sidebarWidth: width };
    },
    setViewPanelWidth: (state, { payload }: PayloadAction<{ width: number }>) => {
      const { width } = payload;
      if (!width) {
        return state;
      }
      return { ...state, viewPanelWidth: width };
    },
  },
});
