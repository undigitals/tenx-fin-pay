import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SCircle = styled.div`
  width: 40px;
  height: 40px;
  background: ${getColor('blue5')};
  border-radius: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SIconWrapper = styled.div`
  margin: 13px 7px;
`;
