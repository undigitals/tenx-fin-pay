import React, { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'views/Chat/components/Message/Message';
import { selectUserId } from 'store/user/authentication.slice';
import { chatActions, selectChatState } from 'store/chat/chat.slice';
import { useSendMessageMutation } from 'store/chat/chat.api';
import { mobileCallUrlRedirect } from 'services/mobileService';
import { IMessage } from 'store/chat/chat.types';
import { SMessagesList } from './MessagesList.styled';

export const MessagesList: FC<{ messages?: any }> = ({ messages }) => {
  const { selectedQuestion } = useSelector(selectChatState) || {};
  const userId = useSelector(selectUserId);
  const [isActionButtonClicked, setIsActionButtonClicked] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { token, activeConversation, otpSeed } = useSelector(selectChatState) || {};
  const { setMessageAsActionResponse } = chatActions;
  const [sendMessage] = useSendMessageMutation();
  const messagesListRef = useRef<HTMLDivElement>(null);

  const handleActionClick = (type: string, text: string, value: string) => {
    setIsActionButtonClicked((prev) => !prev);
    if (type === 'openUrl') {
      mobileCallUrlRedirect(value);

      // redirect if chat rendered in iframe with id
      // if (window.frameElement?.id.length) {
      //   window.open(value)?.focus();
      // }
      window.open(value)?.focus();
    }

    if (type === 'imBack') {
      const messageEntity = {
        id: activeConversation?.conversationId,
        fromUserId: userId,
        text,
        authToken: token,
        otpToken: otpSeed,
        isActionResponse: true,
      };

      dispatch(setMessageAsActionResponse());
      sendMessage(messageEntity);
    }
  };

  useEffect(() => {
    if (messagesListRef.current) {
      const scrollHeight = messagesListRef.current?.scrollHeight;
      messagesListRef.current?.scroll({ top: scrollHeight });
    }
  }, [messages]);

  return (
    <SMessagesList ref={messagesListRef} id="chatBody">
      {messages &&
        messages
          .filter((msg1: IMessage, i: number, a: any) => a.findIndex((msg2: IMessage) => msg2.id === msg1.id) === i)
          .filter((msg: any) => msg.text?.length)
          .map((msg: any, index: number) => (
            <Message
              key={msg.timestamp}
              isActionButtonClicked={isActionButtonClicked}
              intentId={selectedQuestion?.intentId || ''}
              isActionResponse={msg.isActionResponse}
              {...msg}
              actionClickHandler={handleActionClick}
              isIntro={index === 0}
              isFromUser={msg.from.id === userId}
            />
          ))}
    </SMessagesList>
  );
};
