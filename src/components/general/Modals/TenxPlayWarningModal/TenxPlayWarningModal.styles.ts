import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SList = styled.ul`
  padding-left: 25px;

  li {
    color: ${getColor('blue')};
    font-weight: 700;
    font-size: 14px;
    margin-right: 4px;
  }
`;
