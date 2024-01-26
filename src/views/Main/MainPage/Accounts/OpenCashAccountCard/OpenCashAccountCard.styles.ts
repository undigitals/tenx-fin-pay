import styled, { css } from 'styled-components/macro';
import { images } from 'assets';
import { getColor, mediaUpTo, ifProp } from 'utils/helpers/styleHelpers';

export const SCashAccountImage = styled.div<{ isDesktop?: boolean }>`
  display: block;
  margin: 0 auto;
  height: 120px;
  width: 250px;
  background-color: ${getColor('white')};
  background: url(${images.cash}) no-repeat center / contain;

  ${ifProp(
    'isDesktop',
    css`
      background-size: cover;
      height: 150px;
    `
  )};

  ${mediaUpTo(
    380,
    css`
      flex: 1 1 auto;
    `
  )}
`;
