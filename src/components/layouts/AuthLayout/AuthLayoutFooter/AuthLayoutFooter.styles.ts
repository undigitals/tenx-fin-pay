import styled from 'styled-components/macro';
import { getColor, MEDIA_SIZE } from 'utils/helpers/styleHelpers';

export const SAddress = styled.div`
  flex: 0 0 auto;
  font-size: 11px;
  text-align: center;
  margin-bottom: 45px;
  padding-top: 30px;

  .ant-typography {
    color: ${getColor('charcoal60')};
    margin-bottom: 0;
  }

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    text-align: left;
    padding-left: 50px;
  }
`;
