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

export interface ChatServer {
  id: number;
  name: string;
  ownerUserId: number;
}

export interface ChatChannel {
  id: number;
  name: string;
  serverId: number;
  isPrivate: boolean;
  topic: string;
  autoAddNewMembers: boolean;
  description?: string;
}

export interface ChatUser {
  id: number;
  username: string;
  displayName: string;
}
