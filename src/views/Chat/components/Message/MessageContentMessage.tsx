import React, { FC } from 'react';
import { TMessageOriginTypes } from 'store/chat/chat.types';
import { SMessageContent } from './Message.styled';

type MessageContentMessageType = {
  origin: TMessageOriginTypes;
  text: string;
  isCorrectAnswer?: boolean;
  isFromUser?: boolean;
  isIntro: boolean | undefined;
};

const MessageContentMessage: FC<MessageContentMessageType> = ({ origin, text, isCorrectAnswer, isFromUser, isIntro }) => {
  const createMessageMarkup = () => ({
    __html: `${text}`,
  });

  return (
    // eslint-disable-next-line react/no-danger
    <SMessageContent origin={origin} dangerouslySetInnerHTML={createMessageMarkup()} isCorrectAnswer={isCorrectAnswer} isFromUser={isFromUser} isIntro={isIntro} />
  );
};

export { MessageContentMessage };
