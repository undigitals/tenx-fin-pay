import styled, { css } from 'styled-components/macro';
import { mediaFrom } from 'utils/helpers/styleHelpers';

export const SDiscoverContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
`;

export const SCardsContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaFrom(
    'minDesktop',
    css`
      flex-direction: row;
      gap: 25px;
    `
  )}
`;
