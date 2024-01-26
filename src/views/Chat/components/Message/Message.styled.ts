import styled, { css } from 'styled-components';
import { TMessageOriginTypes } from 'store/chat/chat.types';
import { getColor } from 'utils/helpers/styleHelpers';

interface IMessageProps {
  origin?: TMessageOriginTypes;
  isCorrectAnswer?: boolean;
  isActionResponse?: boolean;
  fromBot?: boolean;
  isIntro?: boolean;
  isFromUser?: boolean;
}

export const SMessage = styled.div<IMessageProps>`
  display: flex;
  flex-direction: column;
  ${({ isActionResponse }) =>
    isActionResponse &&
    css`
      display: none;
    `}

  ${({ origin, isFromUser }) =>
    origin === 'OUTBOX' || isFromUser
      ? css`
          justify-content: flex-end;
        `
      : css`
          margin-bottom: 1.5rem;
        `}
  &:first-child {
    margin-top: auto;
  }

  .content {
    position: relative;
    display: flex;
    align-items: center;
    margin: 8px 0 18px;
    order: 2;
    font-size: 14px;
    line-height: 20px;
    ${({ isFromUser }) =>
      !isFromUser &&
      css`
        width: fit-content;
      `}

    ${({ origin, isFromUser }) =>
      origin === 'OUTBOX' || isFromUser
        ? css`
            justify-content: flex-end;
          `
        : css`
            justify-content: flex-start;
          `}
  }

  time {
    font-size: 10px;
    position: absolute;
    right: 0;
    bottom: -1.2rem;
    flex-shrink: 0;

    ${({ origin }) =>
      origin === 'OUTBOX'
        ? css`
            order: 1;
            color: ${getColor('white')};
          `
        : css`
            order: 3;
            color: ${getColor('cadetgrey')};
          `}
  }

  section {
    order: 2;
  }

  ul.actions {
    padding: 0;
    margin: 0;
    list-style: none;

    button {
      display: block;
      border-radius: 16px;
      border: none;
      padding: 8px 24px;
      margin: 12px 0;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      color: ${getColor('charcoal')};
      background-color: ${getColor('blue10')};
      max-width: 340px;
    }
  }
`;

export const SMessageContent = styled.span<IMessageProps>`
  display: inline-block;
  padding: 6px 12px;
  line-height: 20px;
  border-radius: 16px;
  font-size: 14px;
  min-width: 50px;
  max-width: 350px;

  ${({ origin, isFromUser, isIntro }) =>
    origin === 'OUTBOX' || isFromUser
      ? css`
          background-color: ${getColor('blue')};
          color: ${getColor('white')};

          &:after {
            content: '';
            position: absolute;
            width: 10px;
            height: 14px;
            right: -2px;
            bottom: -3px;
            border-radius: 0 10px;
            border-bottom: 2px solid ${getColor('blue')};
            border-left: 2px solid ${getColor('blue')};
            transform: rotate(-25deg);
            background: ${getColor('blue')};
            box-shadow: 2px -3px ${getColor('blue')};
            z-index: 0;
          }
          &:before {
            content: '';
            position: absolute;
            width: 6px;
            height: 16px;
            right: -5px;
            bottom: -1px;
            border-radius: 0 10px;
            border-bottom: 0 solid ${getColor('blue')};
            border-left: 2px solid ${getColor('blue')};
            background: ${getColor('white')};
            z-index: 2;
          }
        `
      : css`
          border: ${isIntro ? '2px solid #eaeaea' : '2px solid #eaeaea'};
          background-color: ${getColor('white')};
          color: ${getColor('black')};
          ${isIntro
            ? `
          &:before {
            content: '';
            position: absolute;
            width: 6px;
            height: 16px;
            left: -4px;
            bottom: -1px;
            border-radius: 10px 0;
            border-bottom: 2px solid #eaeaea;
            border-right: 2px solid #eaeaea;
          }
          &:after {
            content: '';
            position: absolute;
            width: 9px;
            height: 9px;
            left: -2px;
            bottom: -3px;
            border-radius: 10px 0;
            border-bottom: 2px solid #eaeaea;
            border-right: 2px solid #eaeaea;
            transform: rotate(25deg);
          }`
            : ''}
        `}
`;
