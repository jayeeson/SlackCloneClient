import socketio from 'socket.io-client';

export const socket = socketio('/');

class SocketApi {
  connect = () => {
    socket.on('connect', () => {
      console.log('Connected to server socket successfully.');
    });
  };

  login = (username: string) => {
    socket.emit('login', { username });
  };

  logout = () => {
    console.log('emitting logout event');
    socket.emit('logout');
  };

  setActiveServer = (newServer: number, oldServer?: number) => {
    socket.emit('setActiveServer', { newServer, oldServer });
  };
}

export enum SocketEvent {
  NEW_MESSAGE = 'NEW_MESSAGE',
}

export default new SocketApi();
