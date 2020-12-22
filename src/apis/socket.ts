import socketio from 'socket.io-client';

export const socket = socketio('/');

class SocketApi {
  connect = () => {
    socket.on('connect', () => {
      console.log('Connected to server socket successfully.');
    });
  };
}

export enum SocketEvents {
  NEW_MESSAGE = 'NEW_MESSAGE',
}

export default new SocketApi();
