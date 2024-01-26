import styled from 'styled-components';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { MEDIA_SIZE } from 'utils/helpers/styleHelpers';

export const SGoalsAndTools = styled.div`
  padding-top: 70px;
  padding-bottom: 25px;
  position: relative;
`;

export const SCustomRow = styled(CustomRow)`
  flex-direction: column;
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    flex-direction: row;
    align-items: unset;
    gap: 30px;
  }
`;
