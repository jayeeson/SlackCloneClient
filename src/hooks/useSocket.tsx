import React, { useEffect } from 'react';
import socketio from 'socket.io-client';

const useSlackSocket = () => {
  useEffect(() => {
    const socket = socketio('/');

    socket.on('connect', () => {
      console.log('connected');
      socket.emit('handshake', 'hi');
    });
    socket.on('message', (data: any) => {
      console.log(data);
    });
  }, []);

  return <React.Fragment />;
};

export default useSlackSocket;
