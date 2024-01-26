import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SPercPoints = styled.div`
  background: ${getColor('white')};
  width: 237px;
  height: 55px;
  padding-right: 18px;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const SWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 5px;
  top: 0;
  max-width: 100%;
  display: flex;
  align-items: center;
  margin: 0 -20px 30px 0;
`;

export const SCoin = styled.img`
  margin-left: 10px;
`;
