import ReconnectingWebSocket from 'reconnecting-websocket';

// @ts-ignore
let chatSocket: any;
export const getChatWebSocket = (streamUrl: string) => {
  if (chatSocket) {
    return chatSocket;
  }

  const options = {
    minUptime: 3000,
    connectionTimeout: 1000,
  };

  chatSocket = new ReconnectingWebSocket(streamUrl, [], options);

  chatSocket.onerror = (err: any) => {
    // eslint-disable-next-line no-console
    console.error('Chat socket error', err);
  };

  return chatSocket;
};

export const resetChatWebSocket = () => {
  chatSocket?.close();
  chatSocket = null;
};
