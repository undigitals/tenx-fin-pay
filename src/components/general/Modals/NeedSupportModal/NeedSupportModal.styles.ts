import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  outline: none;
  font-weight: 500;
  font-family: Poppins;
  color: ${getColor('blue')};
  border: 2px solid ${getColor('blue')};
  padding: 8px 24px;
  font-size: 14px;
  line-height: 20px;
  margin-top: 24px;

  &:active,
  &:visited,
  &:hover {
    color: ${getColor('blue')};
  }
`;
