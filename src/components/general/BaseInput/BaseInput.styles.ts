import styled, { css } from 'styled-components';
import { getColor, getProp, ifProp } from 'utils/helpers/styleHelpers';
import { ISInputContainer, ISInput } from './BaseInput.types';

const CommonFontStyles = css`
  font-size: 16px !important;
  font-weight: 400 !important;
  font-family: 'DM Sans', sans-serif !important;
`;

const AmountFontStyles = css`
  font-weight: 600;
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
  color: ${getColor('charcoal')};
`;

const DisabledStyles = css`
  background: ${getColor('charcoal5')} !important;
  border: 2px solid ${getColor('charcoal10')} !important;
  cursor: not-allowed;

  :focus,
  :hover {
    border: 2px solid ${getColor('charcoal10')} !important;
  }

  input {
    background: ${getColor('charcoal5')};
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const IgnoreBorderStyles = css`
  background: ${getColor('white')} !important;
  border: 2px solid ${getColor('white')} !important;

  :focus,
  :hover {
    border: 2px solid ${getColor('white')} !important;
  }
`;

const OnBeigeStyles = css`
  border: 2px solid ${getColor('white')} !important;

  :hover {
    border: 2px solid ${getColor('blue')} !important;
  }

  :focus-within {
    border: 2px solid ${getColor('blue')} !important;
  }

  &.input-status-error {
    border: 2px solid ${getColor('red')} !important;
  }
`;

const OnWhiteStyles = css`
  border: 2px solid ${getColor('charcoal10')} !important;

  :hover {
    border: 2px solid ${getColor('blue')} !important;
  }

  :focus-within {
    border: 2px solid ${getColor('blue')} !important;
  }

  &.input-status-error {
    border: 2px solid ${getColor('red')} !important;
  }
`;

const IsErrorStyles = css`
  border: 2px solid ${getColor('red')} !important;

  :hover {
    border: 2px solid ${getColor('red')} !important;
  }

  :focus-within {
    border: 2px solid ${getColor('red')} !important;
  }
`;

const IsSuccessStyles = css`
  border: 2px solid ${getColor('green')} !important;

  :hover {
    border: 2px solid ${getColor('green')} !important;
  }

  :focus-within {
    border: 2px solid ${getColor('green')} !important;
  }
`;

const IsPhoneInputStyles = css`
  border: none !important;
  padding: 0 !important;

  input {
    width: 10px;
    margin: 5px;
  }

  :hover,
  :focus-within {
    border: none !important;
  }
`;

export const SLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
  font-family: 'DM Sans', sans-serif;
  margin-bottom: 8px;
  margin-top: 10px;
`;

export const SInputContainer = styled.div<ISInputContainer>`
  ${ifProp('onBeige', OnBeigeStyles, OnWhiteStyles)};
  ${ifProp('isPhoneInput', IsPhoneInputStyles)};
  ${ifProp('isError', IsErrorStyles)};
  ${ifProp('isSuccess', IsSuccessStyles)};
  ${ifProp('disabled', DisabledStyles)};
  ${ifProp('ignoreBorder', IgnoreBorderStyles)};
  ${ifProp(
    'noBorder',
    css`
      border: none !important;
    `
  )};
  justify-content: ${getProp('justifyContent')};

  :disabled {
    background: ${getColor('charcoal5')};
    cursor: not-allowed;
  }

  display: flex;
  align-items: center;
  margin-bottom: ${getProp('marginBottom')}px;
  margin-right: ${getProp('marginRight')}px;
  margin-left: ${getProp('marginLeft')}px;
  height: ${getProp('height')};
  padding: ${getProp('padding')};
  border-radius: 16px;
  width: 100%;
  background: ${getColor('white')};

  ${CommonFontStyles};
  color: ${getColor('charcoal')};

  .prefix {
    margin-right: 12px;
  }

  .suffix {
    margin-left: 12px;
  }
`;

export const SInput = styled.input<ISInput>`
  border: none;
  width: 100%;
  height: 24px;
  padding: 0;
  outline: none;
  color: ${getColor('charcoal')};
  cursor: text;
  -webkit-text-fill-color: ${getColor('charcoal')};
  -webkit-user-select: text;

  ::placeholder {
    ${CommonFontStyles};
    color: ${getColor('charcoal40')};
    -webkit-text-fill-color: ${getColor('charcoal40')};
    ${ifProp('customPlaceholder', AmountFontStyles)};
  }
`;

export const SSpan = styled.span`
  font-weight: 600;
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
`;
