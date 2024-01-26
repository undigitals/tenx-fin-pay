import styled, { css } from 'styled-components';
import { MEDIA_SIZE, getColor, mediaUpTo } from 'utils/helpers/styleHelpers';
import { info } from 'assets/icons';
import { vector } from 'assets/images';

export const STenxPayMain = styled.div`
  width: 100%;
  background-color: ${getColor('white')};

  dl.balance {
    display: flex;
    justify-content: center;
    margin: 0;
  }

  dl.balance > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
  }

  dl.balance > div:first-child {
    margin-right: 20px;
    padding-right: 40px;
    background: url(${vector}) no-repeat right 0 center/20px 90%;

    ${mediaUpTo(
      'mobile',
      css`
        margin-right: 0;
      `
    )}
  }

  dl.balance dt {
    display: flex;
    flex-direction: column;
    position: relative;
    font-family: 'DM Sans';
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    color: ${getColor('charcoal70')};
  }

  dl.balance dt.available button {
    position: absolute;
    right: 0;
    appearance: none;
    vertical-align: middle;
    width: 16px;
    aspect-ratio: 1;
    margin-left: 8px;
    padding: 0;
    border: none;
    mask: url(${info}) no-repeat 0 / contain;
    background-color: ${getColor('blue')};
    text-indent: -9999em;
    cursor: pointer;
  }

  dl.balance dd {
    margin: 0;
  }

  .actions {
    overflow: hidden;
    margin-top: 20px;
    padding: 20px;

    ${mediaUpTo(
      400,
      css`
        margin-top: 17px;
        padding: 10px 0;
      `
    )}

    ${mediaUpTo(
      'mobile',
      css`
        margin-top: 20px;
        padding: 0;
        & > button {
          font-size: 11px;
          padding: 7px;
        }
      `
    )}
  }

  .actions.collapsed {
    height: 0;
    margin: 0;
    padding: 0;
  }

  .actions .buttons {
    display: flex;
    justify-content: center;
    column-gap: 8px;
    margin-bottom: 24px;
  }

  .actions button {
    flex-grow: 1;
    flex-basis: 0;
  }

  small {
    display: block;
    width: 100%;
    font-family: 'DM Sans';
    font-size: 12px;
    text-align: center;
    color: ${getColor('charcoal70')};
  }

  small.pay-period-days-left.several > span {
    color: ${getColor('orange')};
  }

  small.pay-period-days-left.error {
    color: ${getColor('red')};
  }

  ${mediaUpTo(
    'mobile',
    css`
      .earned {
        padding-left: 21px;

        & > div {
          font-size: 10px;
        }
      }
    `
  )}

  ${mediaUpTo(
    'mobile',
    css`
      .available {
        & span {
          font-size: 10px;
        }

        & button {
          width: 14px !important;
          right: 13% !important;
        }
      }
    `
  )}

  @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
    .actions {
      border-radius: 16px;
      background-color: ${getColor('blue5')};
    }
  }
`;
