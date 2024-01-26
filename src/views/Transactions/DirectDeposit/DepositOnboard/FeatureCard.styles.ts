import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 20px;
  background: ${getColor('cream70')};
  margin-right: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 14px;

  flex: none;
  order: 0;
`;
