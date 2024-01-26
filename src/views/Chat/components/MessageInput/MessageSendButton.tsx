import { Icon } from 'components/general/Icon/Icon';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectChatState } from 'store/chat/chat.slice';
import { SMessageInputSendButton } from './MessageInput.styled';

type MessageVoiceButtonType = {
  handleSendMessage: () => void;
};

export const MessageSendButton: FC<MessageVoiceButtonType> = ({ handleSendMessage }) => {
  const { isConnected } = useSelector(selectChatState);

  return (
    <SMessageInputSendButton isConnected={isConnected} type="button" disabled={!isConnected} onClick={() => handleSendMessage()} data-testid="send-button">
      <Icon name="sendMessage" color={isConnected ? 'blue' : 'blue40'} />
    </SMessageInputSendButton>
  );
};
