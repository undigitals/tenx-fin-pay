import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

interface IButtonSendMessageProps {
  isConnected: boolean;
}

export const SMessageInputInnerWrapper = styled.div`
  background-color: ${getColor('white')};
  margin-top: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #eaeaea;
  border-radius: 1rem;
  padding: 0.75rem 1.25rem;
  min-height: 3.5rem;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
    height: 15px;
  }
`;

export const SMessageInputPlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin-right: 11px;
  background: ${getColor('transparent')};
  &:hover {
    color: ${getColor('blue')};
  }

  &:focus {
    outline: none;
  }
`;

export const SMessageInputSendButton = styled.button<IButtonSendMessageProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-left: 0.75rem;
  cursor: pointer;
  color: ${getColor('blue')};
  user-select: none;
  background: ${getColor('transparent')};
  border: none;
  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: default;
    pointer-events: none;
    color: ${getColor('royalblue4')};
  }

  & > svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

export const SMessageInputVoiceButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-left: 0.25rem;
  cursor: pointer;
  color: ${getColor('blue')};
  user-select: none;
  padding: 0.25rem;
  background: ${getColor('transparent')};
  border: none;
  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: default;
    pointer-events: none;
    color: ${getColor('royalblue4')};
  }

  & > svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

export const SMessageTextArea = styled.textarea`
  width: 100%;
  font-size: 1rem !important;
  border: 0;
  color: ${getColor('independence2')};
  resize: none;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
    height: 15px;
  }

  &:focus {
    outline: none;
  }
  max-height: 6rem;
`;

export const SMessageInputClearButton = styled.button`
  position: absolute;
  right: 3rem;
  line-height: 0;
  cursor: pointer;
  padding: 0.25rem;
  background: ${getColor('transparent')};
  &:hover {
    color: ${getColor('blue')};
  }

  & svg {
    width: 0.75rem;
    height: 0.75rem;
  }
`;
