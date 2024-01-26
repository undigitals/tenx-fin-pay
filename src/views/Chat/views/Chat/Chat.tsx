import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MessagesList } from 'views/Chat/components/MessagesList/MessagesList';
import { MessageInput } from 'views/Chat/components/MessageInput/MessageInput';

import { chatActions } from 'store/chat/chat.slice';

export const Chat: FC<{ messages?: any }> = ({ messages }) => {
  const dispatch = useDispatch();
  const { getMobileLocation } = chatActions;

  useEffect(() => {
    dispatch(getMobileLocation());
  }, [dispatch, getMobileLocation]);

  return (
    <>
      <MessagesList messages={messages} />
      <MessageInput />
    </>
  );
};
