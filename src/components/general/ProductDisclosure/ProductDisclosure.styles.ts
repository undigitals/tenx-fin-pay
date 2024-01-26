import styled, { css } from 'styled-components/macro';
import { TProductStyleProps } from './ProductDisclosure.types';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 18px 0 26px 0;

  ${({ $styles = {}, $extraStyles = {} }: TProductStyleProps) => css({ ...$styles, ...$extraStyles })};
`;
