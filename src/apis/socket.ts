import socketio from 'socket.io-client';
import { asyncEmit } from '../helpers/asyncEmit';
import { store } from '../store';
import { chatSlice } from '../store/chat';
import {
  ChatChannel,
  ChatMessage,
  CreateChannelRequest,
  CreateServerResponse,
  SendMessagePayload,
  StartupData,
} from '../types';

class SocketApi {
  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketio('/');
  }

  connect = () => {
    this.socket.on('connect', () => {
      console.log('Connected to server socket successfully.');
    });
    this.socket.on('message', (payload: ChatMessage) => {
      store.dispatch(chatSlice.actions.receivedMessage(payload));
    });
  };

  login = (username: string) => {
    this.socket.emit('login', { username });
  };

  logout = () => {
    this.socket.emit('logout');
  };

  setActiveServer = (newServer: number, oldServer?: number) => {
    this.socket.emit('setActiveServer', { newServer, oldServer });
  };

  setActiveChannel = (newChannel: number, oldChannel?: number) => {
    this.socket.emit('setActiveChannel', { newChannel, oldChannel });
  };

  getStartupData = async () => {
    const data = await asyncEmit<StartupData>(this.socket, 'getStartupData', {});
    return data;
  };

  createServer = async (serverName: string) => {
    const data = await asyncEmit<CreateServerResponse | undefined>(this.socket, 'createServer', { serverName });
    return data;
  };

  createChannel = async (payload: CreateChannelRequest) => {
    const data = await asyncEmit<ChatChannel>(this.socket, 'createChannel', payload);
    return data;
  };

  getOldestMessages = async (quantity: number, offset?: number) => {
    const data = await asyncEmit<ChatMessage[]>(this.socket, 'getOldestMessages', { quantity, offset });
    return data;
  };

  getNewestMessages = async (quantity: number, offset?: number) => {
    const data = await asyncEmit<ChatMessage[]>(this.socket, 'getNewestMessages', { quantity, offset });
    return data;
  };

  getLatestMessagesForChannel = async (channelId: number, quantity: number, offset?: number) => {
    const data = await asyncEmit<ChatMessage[]>(this.socket, 'getLatestMessagesForChannel', {
      channelId,
      quantity,
      offset,
    });
    return data;
  };

  sendMessage = async (payload: SendMessagePayload) => {
    this.socket.emit('message', payload);
  };
}

export default new SocketApi();
