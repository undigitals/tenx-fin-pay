import styled from 'styled-components/macro';
import { getColor } from 'utils/helpers/styleHelpers';

export const SLayout = styled.div`
  display: inline-flex;
  gap: 8px;
  padding: 8px;
  border: solid 2px ${getColor('charcoal20')};
  border-radius: 8px;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;

  &:last-child {
    margin-right: 0;
  }
`;
