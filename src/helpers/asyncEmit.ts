export const asyncEmit = <T>(socket: SocketIOClient.Socket, eventName: string, arg: { [index: string]: any }) => {
  return new Promise<T>(resolve => {
    socket.emit(eventName, arg, (callbackArgs: T) => {
      resolve(callbackArgs);
    });
  });
};
