import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const PhoneLink = styled.a`
  color: ${getColor('charcoal')};
  font-weight: 600;

  &:hover {
    color: ${getColor('blue')};
  }
`;
