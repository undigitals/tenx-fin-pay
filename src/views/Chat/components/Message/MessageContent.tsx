import React, { ReactElement } from 'react';
import { IMessage, MessageTypes } from 'store/chat/chat.types';
import { MessageContentTyping } from './MessageContentTyping';
import { MessageContentVoice } from './MessageContentVoice';
import { MessageContentMessage } from './MessageContentMessage';

type TMessageContentComponentsType = {
  [key in MessageTypes]: ReactElement | null;
};

type TMessageContentProps = Pick<IMessage, 'text' | 'contentType' | 'origin' | 'isCorrectAnswer' | 'isFromUser' | 'isIntro'>;

export const MessageContent: React.FC<TMessageContentProps> = ({ text, contentType = MessageTypes.MESSAGE, origin, isCorrectAnswer, isFromUser, isIntro }) => {
  const MessageContentComponents: Readonly<TMessageContentComponentsType> = Object.freeze({
    [MessageTypes.MESSAGE]: <MessageContentMessage origin={origin} text={text} isFromUser={isFromUser} isCorrectAnswer={isCorrectAnswer} isIntro={isIntro} />,
    [MessageTypes.TYPING]: <MessageContentTyping origin={origin} />,
    [MessageTypes.VOICE]: <MessageContentVoice />,
    [MessageTypes.SYSTEM]: null,
  });

  return MessageContentComponents[contentType];
};
