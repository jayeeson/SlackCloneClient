export enum LoginStatus {
  LoggedIn = 'LoggedIn',
  LoggedOut = 'LoggedOut',
  Unknown = 'Unknown',
}

export enum DraggablePanel {
  sidebarWidth = 'chatClient@sidebarWidth',
  viewPanelWidth = 'chatClient@viewPanelWidth',
}

export const localStorageKey = { DraggablePanel };

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

export interface ChatMessage {
  id: number;
  content: string;
  channelId: number;
  serverId: number;
  userId: number;
  displayName: string;
  timestamp: number;
  originalMsgId?: number;
  // contentType?: number;
  // deleted: boolean;
}

export interface CreateChannelRequest {
  channelName: string;
  serverId: number;
  description?: string;
  isPrivate?: boolean;
  addEveryone?: boolean;
  addTheseUsers?: string[];
  autoAddNewMembers?: boolean;
}

export interface SendMessagePayload {
  channelId: number;
  text: string;
  serverId: number;
}

enum MessageContentTypeKey {
  MESSAGE = 1,
  QUOTE = 2,
  THREAD = 4,
}

export enum MessageContentType {
  MESSAGE = MessageContentTypeKey.MESSAGE,
  QUOTE = MessageContentTypeKey.QUOTE,
  THREAD_PARENT = MessageContentTypeKey.THREAD,
  THREAD_REPLY = MessageContentTypeKey.THREAD + MessageContentTypeKey.MESSAGE,
}

export interface StartupData {
  servers: ChatServer[];
  channels: ChatChannel[];
  user: ChatUser;
  users: ChatUser[];
}

export interface CreateServerResponse {
  server: ChatServer;
  channels: ChatChannel[];
}
