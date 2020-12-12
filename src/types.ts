export interface PanelState {
  sidebar: boolean;
  msgPanel: boolean;
  viewPanel: boolean;
  sidebarWidth: number;
  viewPanelWidth: number;
}

export interface ChannelState {
  activeChannelId: number;
}

export enum DraggablePanel {
  sidebarWidth = 'sidebarWidth',
  viewPanelWidth = 'viewPanelWidth',
}

export const localStorageKey = { DraggablePanel };
export type localStorageKey = typeof DraggablePanel;
