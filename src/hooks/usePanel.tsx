import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { panelsSlice } from '../store/panels';
import { DraggablePanel } from '../types';

const usePanel = (
  panel: DraggablePanel
): [number | null, ActionCreatorWithPayload<any, string> | null, string | null] => {
  const { sidebarWidth, viewPanelWidth, sidebarOpen, viewPanelOpen } = useSelector((state: RootState) => ({
    sidebarWidth: state.panels.sidebarWidth,
    viewPanelWidth: state.panels.viewPanelWidth,
    sidebarOpen: state.panels.sidebar,
    viewPanelOpen: state.panels.viewPanel,
    mainPanelOpen: state.panels.mainPanel,
  }));
  if (panel === DraggablePanel.sidebarWidth) {
    const display = sidebarOpen ? 'inline' : 'none';
    return [sidebarWidth, panelsSlice.actions.setSidebarWidth, display];
  } else if (panel === DraggablePanel.viewPanelWidth) {
    const display = viewPanelOpen ? 'inline' : 'none';
    return [viewPanelWidth, panelsSlice.actions.setViewPanelWidth, display];
  }
  return [null, null, null];
};

export default usePanel;
