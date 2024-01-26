import styled, { css } from 'styled-components/macro';
import { ICustomInputStyle } from './InputLabel.types';

export const SInputLabel = styled.label`
  font-family: Poppins;
  ${({ $StyleObj }: ICustomInputStyle) => css({ ...$StyleObj })};
`;
