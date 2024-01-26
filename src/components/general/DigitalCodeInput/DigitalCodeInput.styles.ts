import styled, { css } from 'styled-components/macro';
import { mediaUpTo, ifProp, getColor } from 'utils/helpers/styleHelpers';
import { CustomText } from 'components/theme/CustomText/CustomText';

interface ISFields {
  borderRadius?: string;
  isWrapped?: boolean;
  showCaret?: boolean;
}

const CodeInputStatusStyle = css`
  .success {
    border: 2px solid ${getColor('green')} !important;
    &:hover,
    &:focus {
      border: 2px solid ${getColor('green')} !important;
    }
  }

  .error {
    border: 2px solid ${getColor('red')} !important;
    &:hover,
    &:focus {
      border: 2px solid ${getColor('red')} !important;
    }
  }

  .focused {
    border: 2px solid ${getColor('blue')} !important;
    &:hover,
    &:focus {
      border: 2px solid ${getColor('blue')} !important;
    }
  }
`;

const CodeInputStyle = css`
  display: flex;
  justify-content: center;
  min-width: 25px;
  max-width: 56px;

  text-align: center;
  padding: 0;
  touch-action: pan-y;

  ${mediaUpTo(
    400,
    css`
      min-width: 20px;
    `
  )}

  input {
    text-align: center;
    font-weight: 700;
    touch-action: pan-y;
  }

  &.custom-text {
    min-width: auto;
    &-inner {
      font-family: DM Sans, sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #353131;
      text-align: left;
      display: block;
      line-height: 1.2;
      cursor: default;
      font-style: normal;
    }
  }
`;

export const SFields = styled.div<ISFields>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${ifProp(
    'isWrapped',
    css`
      & > div > div:not(.custom-text-inner) {
        border-radius: 0;
        margin-bottom: 0;
        border: none !important;
        background-color: transparent;
        ${CodeInputStyle}
        ${mediaUpTo(
          340,
          css`
            min-width: 17px;
          `
        )}
      }
      input {
        caret-color: ${ifProp('showCaret', 'auto', 'transparent')};
        width: 10px;
        font-size: 14px;
      }
      ${CodeInputStatusStyle}
    `,
    css`
      & > div {
        ${CodeInputStyle}
      }
    `
  )};

  ${mediaUpTo(
    500,
    css`
      gap: 5px;
    `
  )}

  ${mediaUpTo(
    340,
    css`
      gap: 1px;
    `
  )}
`;

export const SError = styled(CustomText)`
  position: absolute;
  bottom: -48px;
  margin: 0;
`;
