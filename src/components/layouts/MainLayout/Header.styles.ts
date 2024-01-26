import styled, { css } from 'styled-components';
import { tenxLong } from 'assets/logos';
import { getColor, ifProp, getProp, getColorByProp } from 'utils/helpers/styleHelpers';
import { TThemeColor } from 'styles/theme';
import { discover, bell, chat } from 'assets/icons';

export const SCircle = styled.div<{ marginRight?: number; backgroundColor?: TThemeColor }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  margin-right: ${getProp('marginRight', 0)}px;

  ${ifProp(
    'backgroundColor',
    css`
      background-color: ${getColorByProp('backgroundColor')};
    `,
    css`
      background-color: ${getColor('charcoal5')};
    `
  )};
`;

export const SHeader = styled.header<{ isRounded: boolean | undefined }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 60px;

  ${ifProp(
    'isRounded',
    css`
      margin: 30px;
      background-color: white;
      border-radius: 20px;
      box-shadow: 0px 16px 24px 0px #0000000a;
    `,
    css`
      border-bottom: 1px solid ${getColor('creamS5')};
    `
  )};

  h1 {
    height: 24px;
    margin: 0;
  }

  h1 > a {
    display: inline-block;
    width: 145px;
    height: 100%;
    background: url(${tenxLong}) no-repeat center/contain;
    text-indent: -9999em;
  }

  button.language {
    appearance: none;
    cursor: pointer;
    margin-right: 24px;
    padding: 4px 8px;
    border: none;
    border-radius: 16px;
    background-color: ${getColor('creamS5')};
    font-size: 14px;
    font-weight: 700;
    color: ${getColor('blue')};

    &::before {
      content: '';
      display: inline-block;
      width: 24px;
      aspect-ratio: 1;
      vertical-align: middle;
      margin-right: 8px;
      background: url(${discover}) no-repeat center/contain;
    }

    & > span:first-child {
      display: inline-block;
      text-indent: -9999em;
    }
  }

  button.notifications {
    appearance: none;
    cursor: pointer;
    width: 24px;
    aspect-ratio: 1;
    padding: 0;
    border: none;
    background: url(${bell}) no-repeat center/contain;
    text-indent: -9999em;
  }
  button.chat {
    appearance: none;
    cursor: pointer;
    width: 24px;
    aspect-ratio: 1;
    padding: 0;
    border: none;
    background: url(${chat}) no-repeat center/contain;
    text-indent: -9999em;
    ${ifProp(
      'isRounded',
      css``,
      css`
        margin-right: 20px;
      `
    )};
  }
`;
