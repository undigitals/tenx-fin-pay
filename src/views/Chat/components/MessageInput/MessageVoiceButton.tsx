import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'components/general/Icon/Icon';
import { selectChatState } from 'store/chat/chat.slice';
import { SMessageInputVoiceButton } from './MessageInput.styled';

type MessageVoiceButtonType = {
  handleRecordVoiceMessage: () => void;
};

export const MessageVoiceButton: FC<MessageVoiceButtonType> = ({ handleRecordVoiceMessage }) => {
  const { isConnected } = useSelector(selectChatState) || {};

  return (
    <SMessageInputVoiceButton type="button" disabled={!isConnected} onClick={() => handleRecordVoiceMessage()} data-testid="voice-button">
      <Icon name="microphone" color={isConnected ? 'blue' : 'blue40'} />
    </SMessageInputVoiceButton>
  );
};
