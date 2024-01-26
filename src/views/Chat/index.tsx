import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ManagerHeader } from 'views/Chat/components/ManagerHeader/ManagerHeader';
import { useLazyGetIntentsQuery, useLazyGetConversationsQuery } from 'store/chat/chat.api';
import { chatActions, selectChatState } from 'store/chat/chat.slice';
import { Loader } from 'components/general/Loader/Loader';
import { iFrameMessagesListener } from './services/iframeService';
import { CustomerHeader } from './components/CustomerHeader/CustomerHeader';
import { Container } from './index.styles';
import { MessagesList } from './components/MessagesList/MessagesList';
import { MessageInput } from './components/MessageInput/MessageInput';

export const ChatApp: React.FC<{ role?: 'user' | 'manager' }> = ({ role = 'user' }) => {
  const chatState = useSelector(selectChatState);
  const [getConversations, getConversationsResult] = useLazyGetConversationsQuery();
  const [getIntents] = useLazyGetIntentsQuery();
  const dispatch = useDispatch();
  const isLoading = getConversationsResult.isLoading || chatState.connecting;

  const { getMobileLocation } = chatActions;

  useEffect(() => {
    dispatch(getMobileLocation());
  }, [dispatch, getMobileLocation]);

  const { token } = JSON.parse(sessionStorage.getItem('persist:authentication') as string) || { token: null };

  const reconnectToWS = () => {
    getConversations()
      .unwrap()
      .then((res) => {
        dispatch(chatActions.startConnecting(res?.streamUrl));
        dispatch(chatActions.setIsConnected());
      });
  };

  useEffect(() => {
    if (token) {
      getIntents();
      dispatch(chatActions.reconnectToWebSocket());
    }
  }, [token, getConversations, getIntents]);

  useEffect(() => {
    if (!chatState.isConnected) {
      reconnectToWS();
    }
  }, [chatState.isConnected]);

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'visible' && chatState?.activeConversation?.streamUrl) {
  //       reconnectToWS();
  //     }
  //   };
  //   window.addEventListener('visibilitychange', handleVisibilityChange);
  //
  //   return () => {
  //     window.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, []);

  return (
    <Container className="chat">
      {isLoading && <Loader />}
      {role === 'user' ? <CustomerHeader /> : <ManagerHeader />}
      <MessagesList messages={chatState?.messages} />
      {chatState.error ? <div style={{ textAlign: 'center' }}>{chatState.error}</div> : null}
      <MessageInput />
    </Container>
  );
};

iFrameMessagesListener();
