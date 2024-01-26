import React from 'react';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { useChat } from 'utils/hooks/useChat';
import { ChatApp } from 'views/Chat';
import './ChatSheet.css';

export const ChatSheet: React.FC = () => {
  const { isVisible, close } = useChat();
  return (
    <CustomSheet isOpen={isVisible} header={false} onClose={close} className="chatSheet" wrapperPadding={false}>
      {isVisible && <ChatApp />}
    </CustomSheet>
  );
};
