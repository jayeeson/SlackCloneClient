import socketio from 'socket.io-client';
import { asyncEmit } from '../helpers/promisify';
import {
  ChatChannel,
  ChatMessage,
  CreateChannelRequest,
  CreateServerResponse,
  SendMessagePayload,
  StartupData,
} from '../types';

class SocketApi {
  socket = socketio('/');

  connect = () => {
    this.socket.on('connect', () => {
      console.log('Connected to server socket successfully.');
    });
    this.socket.on('disconnect', () => {
      console.log('disconnect received');
      this.socket.connect();
    });
  };

  login = (username: string) => {
    this.socket.emit('login', { username });
  };

  logout = () => {
    console.log('emitting logout event');
    this.socket.emit('logout');
  };

  setActiveServer = (newServer: number, oldServer?: number) => {
    this.socket.emit('setActiveServer', { newServer, oldServer });
  };

  getStartupData = async () => {
    console.log('about to await');
    const data = await asyncEmit<StartupData>(this.socket, 'getStartupData', {});
    console.log('received startup response');
    return data;
  };

  createServer = async (serverName: string) => {
    console.log('about to await create server');
    const data = await asyncEmit<CreateServerResponse | undefined>(this.socket, 'createServer', { serverName });
    console.log('create server data', data);
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

  sendMessage = async (payload: SendMessagePayload) => {
    this.socket.emit('message', payload, (status: string) => {
      console.log('response to sendMessage received');
      console.log(status);
    });
  };
}

export default new SocketApi();
