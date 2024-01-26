import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SDestinationAccount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: ${getColor('white')};
  border-radius: 16px;
  cursor: pointer;
  height: 56px;

  .information-container {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
  }
`;
