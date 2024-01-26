import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SContainer = styled.div`
  appearance: none;
  outline: none;
  width: 100%;
  border: 2px solid transparent;
  border-radius: 20px;
  padding: 24px 24px 5px 24px;
  font-family: 'Poppins';
  font-size: 24px;
  line-height: 1.5;
  font-weight: 600;
  text-align: right;
  color: ${getColor('charcoal')};
  background-color: white;
  transition: border-color 100ms;

  :is(:focus, :hover) {
    border-color: ${getColor('blue')};
  }

  &.error {
    border-color: ${getColor('red')};
  }

  :is(:disabled) {
    background: ${getColor('white')};
    border-color: transparent;
    color: ${getColor('charcoal30')};
  }

  input[inputmode='decimal'] {
    border: 0;
    padding: 0;
  }
`;
