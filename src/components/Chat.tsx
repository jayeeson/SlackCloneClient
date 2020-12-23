import React, { Fragment, useEffect } from 'react';
import { socket, SocketEvent } from '../apis/socket';

const Chat = () => {
  useEffect(() => {
    socket.on(SocketEvent.NEW_MESSAGE, () => {
      console.log('new message received');
    });
  }, []);

  return <Fragment></Fragment>;
};

export default Chat;
