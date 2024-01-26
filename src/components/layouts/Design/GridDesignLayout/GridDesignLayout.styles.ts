import styled from 'styled-components/macro';
import { MEDIA_SIZE } from 'utils/helpers/styleHelpers';

export const SContainer = styled.div<{ noContentPadding?: boolean }>`
  display: flex;
  min-height: 100%;
  max-width: 100%;
  padding: 0 15px;
  align-items: stretch;
  flex: 1 1 auto;
  overscroll-behavior: none;

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    padding: ${({ noContentPadding }) => (noContentPadding ? '0' : '0 32px')};
  }
`;

export const SContent = styled.div`
  flex: 1 1 auto;
  min-height: 100%;
  max-width: 100%;
`;
