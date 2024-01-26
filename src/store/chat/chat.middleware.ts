import { Middleware } from 'redux';
import { getChatWebSocket, resetChatWebSocket } from 'views/Chat/services/socket.service';
import { chatActions } from './chat.slice';

let typingTimeoutId: NodeJS.Timeout | null = null;

/* eslint-disable */
export const chatMiddleware: Middleware = (store) => {
  let pingInterval: NodeJS.Timeout | null = null;

  return (next) => (action) => {
    const { token, userId, activeConversation, otpSeed } = store.getState();
    const { isConnected } = store.getState().chat;
    const { user } = store.getState().authentication;

    if (chatActions.startConnecting.match(action) && !isConnected) {
      const chatSocket = getChatWebSocket(action.payload);

      chatSocket.onopen = () => {
        store.dispatch(chatActions.setIsConnected());
        store.dispatch(chatActions.setPingMessage());
      };

      chatSocket.onerror = (err: any) => {
        // store.dispatch(chatActions.setError('WS Error:' + JSON.stringify(err)));
        store.dispatch(chatActions.reconnectToWebSocket());
      };

      chatSocket.onclose = () => {
        store.dispatch(chatActions.clearPingMessage());
      };

      chatSocket.onmessage = (event: any) => {
        if (event.data.length) {
          const { data } = event;
          const isTyping = JSON.parse(data).activities[0].entities.some((entity: any) => entity.type === 'Typing');
          const messages = JSON.parse(event.data).activities;

          if (isTyping && messages[0].from.id !== user.userId) {
            store.dispatch(chatActions.setTyping(true));

            if (typingTimeoutId) {
              clearTimeout(typingTimeoutId);
            }

            typingTimeoutId = setTimeout(() => {
              store.dispatch(chatActions.setTyping(false));
            }, 1000);
          }

          store.dispatch(chatActions.addMessages(messages));
          messages.forEach((message: any) => store.dispatch(chatActions.receiveMessage(message)));
        }
      };
    }

    if (chatActions.closeChat.match(action) && isConnected) {
      console.log('closeChat!');
      resetChatWebSocket();
      store.dispatch(chatActions.connectionClosed());
      store.dispatch(chatActions.clearPingMessage());
    }

    next(action);
  };
};
