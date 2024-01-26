import styled from 'styled-components';
import { css } from 'styled-components/macro';
import { getColor } from 'utils/helpers/styleHelpers';

export const SLabel = styled.label<{ disabled?: boolean }>`
  position: relative;
  font-family: 'DM Sans';
  width: 100%;

  color: ${getColor('charcoal')};
  ${({ disabled }) =>
    disabled &&
    css`
      color: ${getColor('charcoal30')};
    `};
`;

export const SWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: 'DM Sans';
`;

export const SRadio = styled.input<{ checked?: boolean; disabled?: boolean }>`
  cursor: pointer;
  opacity: 0;
  position: absolute;
  width: 100%;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `};
`;

export const SRadioInner = styled.span<{ isError?: boolean; checked?: boolean; disabled?: boolean }>`
  position: relative;
  display: block;
  box-sizing: border-box;
  top: 0;
  left: 0;  
  width: 24px;
  height: 24px;
  border: 2px solid ${getColor('charcoal10')};
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `};
  ${({ isError }) =>
    isError
      ? css`
          border-color: ${getColor('red')};
        `
      : css`
          border-color: ${getColor('charcoal10')};
        `};
  border-radius: 50%;
  transition: all 0.3s;
  margin-right: 8px;

  &:hover {
    border-color: ${getColor('blue')};
  }

  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 8px;
    height: 8px;
    margin-top: -4px;
    margin-left: -4px;
    content: ' ';
    border-radius: 50%;

    ${({ checked }) =>
      checked
        ? css`
            background-color: ${getColor('blue')};
          `
        : css`
            background-color: transparent;
          `};

    ${({ isError }) =>
      isError &&
      css`
        background-color: transparent;
      `}
`;
export const SText = styled.span``;
export const SErrorText = styled.div<{ isError?: boolean }>`
  margin-left: 32px;
  ${({ isError }) =>
    isError &&
    css`
      color: ${getColor('red')};
    `};
`;
