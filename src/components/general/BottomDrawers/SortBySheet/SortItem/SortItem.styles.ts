import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SCardInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${getColor('blue')};
  border-radius: 16px 0px;
  width: 126px;
  padding: 8px 16px 8px 16px;
  margin: -25px 0px 16px -25px;
`;
