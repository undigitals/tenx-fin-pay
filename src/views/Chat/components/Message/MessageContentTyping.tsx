import React, { FC } from 'react';
import { TMessageOriginTypes } from 'store/chat/chat.types';
import { SMessageContent } from './Message.styled';

type MessageContentTypingType = {
  origin: TMessageOriginTypes;
};

export const MessageContentTyping: FC<MessageContentTypingType> = ({ origin }) => (
  <SMessageContent origin={origin}>
    <div className="flex gap-0.5">
      <div className="h-2 w-2 bg-gray-500 rounded col-span-2 animate-pulse" />
      <div className="h-2 w-2 bg-gray-500 rounded col-span-2 animate-pulse" />
      <div className="h-2 w-2 bg-gray-500 rounded col-span-2 animate-pulse" />
    </div>
  </SMessageContent>
);
