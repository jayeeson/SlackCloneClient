export enum LoginStatus {
  LoggedIn = 'LoggedIn',
  LoggedOut = 'LoggedOut',
  Unknown = 'Unknown',
}

export enum DraggablePanel {
  sidebarWidth = 'sidebarWidth',
  viewPanelWidth = 'viewPanelWidth',
}

export const localStorageKey = { DraggablePanel };
export type localStorageKey = typeof DraggablePanel;
