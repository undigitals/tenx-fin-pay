import styled, { css } from 'styled-components/macro';
import { getColor, getColorIf } from 'utils/helpers/styleHelpers';
import { InnerProps, SwitchProps } from './CustomCheckSwitch.types';

export const SSwitch = styled.div<SwitchProps>`
  height: 24px;
  width: 44px;
  border-radius: 100px;
  background: ${getColorIf('checked', 'blue', 'charcoal70')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SInner = styled.div<InnerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 4px;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;

  ${({ checked, selected }) => {
    if (checked && !selected) {
      return css`
        background: ${getColor('blue')};
      `;
    }
    if (selected) {
      return css`
        background: ${getColor('white')};
      `;
    }

    return css`
      background: ${getColor('charcoal70')};
    `;
  }};
`;
