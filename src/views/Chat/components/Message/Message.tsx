import React from 'react';
import { IMessage } from 'store/chat/chat.types';
import { BodyText } from 'components/general/Typography';
import { format } from 'date-fns';
import { MessageContent } from './MessageContent';
import { SMessage } from './Message.styled';

interface IMessageProps extends IMessage {
  actionClickHandler: (type: string, text: string, value: string) => void;
  isClickActionButton: boolean;
}

export const Message = ({
  from,
  origin,
  timestamp,
  hasSuggestion,
  isIntent,
  intentId,
  id,
  onSelect,
  selected,
  isCorrectAnswer,
  suggestedActions,
  actionClickHandler,
  isActionResponse,
  isIntro,
  isFromUser,
  ...props
}: IMessageProps) => {
  return (
    <SMessage className="message" isActionResponse={isActionResponse} origin={origin} isFromUser={isFromUser} isCorrectAnswer={isCorrectAnswer} isIntro={isIntro}>
      <div className="content">
        <MessageContent origin={origin} {...props} isFromUser={isFromUser} isCorrectAnswer={isCorrectAnswer} isIntro={isIntro} />
        <time dateTime={format(new Date(timestamp), 'HH:mm')}>{format(new Date(timestamp), 'HH:mm aaa')}</time>
      </div>
      {suggestedActions?.actions && (
        <section>
          <BodyText textType="helperText" size="T" fontWeight="R" color="charcoal70" marginTop="spacing-normal">
            Choose from these options:
          </BodyText>
          <ul className="actions">
            {suggestedActions.actions.map((action) => (
              <li key={action.text}>
                <button type="button" onClick={() => actionClickHandler(action.type, action.text, action.value)}>
                  {action.title}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </SMessage>
  );
};
