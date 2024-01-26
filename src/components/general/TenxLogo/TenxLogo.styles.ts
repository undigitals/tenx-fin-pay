import styled from 'styled-components/macro';
import { ILogoProps } from './TenxLogo.types';

export const Logotype = styled.div<ILogoProps>`
  height: ${({ height }) => (height === 'auto' ? 'auto' : `${height}rem`)};
  display: block;
`;
