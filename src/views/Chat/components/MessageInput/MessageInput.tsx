import React, { ChangeEvent, FC, useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSendMessageMutation } from 'store/chat/chat.api';
import { chatActions, selectChatState } from 'store/chat/chat.slice';
import { MessageVoiceButton } from './MessageVoiceButton';
import { MessageSendButton } from './MessageSendButton';
import { SMessageInputInnerWrapper, SMessageTextArea } from './MessageInput.styled';
import { MessageAttachmentButton } from './MessageAttachmentButton';
import { MessageTyping } from './MessageTyping';

export const MessageInput: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { message, messageObject, typing } = useSelector(selectChatState) || {};
  const { setMessage, startRecognizing, stopRecognizing, prepareMessageObject, prepareSystemMessage } = chatActions;
  const [sendMessage] = useSendMessageMutation();
  const [voiceMessageMode, setVoiceMessageMode] = useState<boolean>(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messageInputWrapper = useRef<HTMLDivElement>(null);
  const handleSendMessage = useCallback(() => {
    if (!inputRef.current?.value.trim().length) return;
    dispatch(prepareMessageObject());
    dispatch(setMessage(''));
  }, [dispatch, prepareMessageObject]);

  const enterKeyListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        handleSendMessage();
        dispatch(setMessage(''));
      }
    },
    [handleSendMessage]
  );

  const handleRecordVoiceMessage = useCallback(() => {
    dispatch(startRecognizing());
    setVoiceMessageMode(false);
  }, [dispatch, startRecognizing]);

  const handleEditMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setMessage(e.target.value));
    setVoiceMessageMode(false);
    dispatch(prepareSystemMessage('Typing'));
  };

  const handleFocus = () => {
    dispatch(stopRecognizing());
  };

  useEffect(() => {
    const inputRefCurrent = inputRef.current;
    inputRefCurrent?.addEventListener('keydown', enterKeyListener);

    return () => {
      inputRefCurrent?.removeEventListener('keydown', enterKeyListener);
    };
  }, [enterKeyListener]);

  useEffect(() => {
    if (messageObject) {
      sendMessage(messageObject);
    }
  }, [messageObject, sendMessage]);

  useEffect(() => {
    if (inputRef.current) {
      const { style, scrollHeight } = inputRef.current;

      style.height = `${0}px`;
      style.height = `${scrollHeight}px`;

      if (!message.length) {
        style.height = `${1.81}rem`;
      }
    }
    if (messageInputWrapper.current) {
      const { style, scrollHeight } = messageInputWrapper.current;
      style.height = `${scrollHeight}px `;
      style.overflowY = 'scroll';

      style.paddingTop = `12px`;
      if (!message.length) {
        style.height = `${3.5}rem`;
      }
    }
  }, [message]);

  return (
    <div>
      {typing && <MessageTyping />}
      <SMessageInputInnerWrapper ref={messageInputWrapper} className="inputWrapper">
        <MessageAttachmentButton />
        <SMessageTextArea placeholder={t(`home.Type a message here`)} onChange={handleEditMessage} value={message} ref={inputRef} onFocus={handleFocus} data-testid="message-input" />
        {voiceMessageMode ? <MessageVoiceButton handleRecordVoiceMessage={handleRecordVoiceMessage} /> : <MessageSendButton handleSendMessage={handleSendMessage} />}
      </SMessageInputInnerWrapper>
    </div>
  );
};
