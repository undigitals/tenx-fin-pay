import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SAmountInput = styled.div`
  input[inputmode='decimal'] {
    appearance: none;
    outline: none;
    width: 100%;
    padding: 24px;
    border: 2px solid transparent;
    border-radius: 20px;
    font-family: 'Poppins';
    font-size: 24px;
    line-height: 1.5;
    font-weight: 600;
    text-align: right;
    color: ${getColor('charcoal')};
    transition: border-color 100ms;
  }

  input[inputmode='decimal']:is(:focus, :hover) {
    border-color: ${getColor('blue')};
  }

  &.error input[inputmode='decimal'] {
    border-color: ${getColor('red')};
  }

  input[inputmode='decimal']:disabled {
    background: ${getColor('white')};
    border-color: transparent;
    color: ${getColor('charcoal30')};
  }
`;
