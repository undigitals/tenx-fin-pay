import styled from 'styled-components/macro';
import { MEDIA_SIZE } from 'utils/helpers/styleHelpers';

export const SBrand = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0 36px 0;
  cursor: pointer;
`;

export const SBrandV2 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  min-height: 110px;
  padding-left: 20px;
  cursor: pointer;

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    min-height: 50px;
    padding-left: 80px;
    width: 210px;
  }
`;
