import React from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { SMessageInputPlusButton } from './MessageInput.styled';

export const MessageAttachmentButton: React.FC = () => (
  <SMessageInputPlusButton type="button">
    <Icon name="circlePlus" size="small" />
  </SMessageInputPlusButton>
);
