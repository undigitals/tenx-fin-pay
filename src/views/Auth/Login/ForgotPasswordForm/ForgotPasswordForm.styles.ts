import styled from 'styled-components/macro';
import { MEDIA_SIZE } from 'utils/helpers/styleHelpers';

export const SFormWrapper = styled.div`
  & .ant-form-item .ant-form-item-label {
    padding: 0;
  }
`;

export const SButtonWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;
