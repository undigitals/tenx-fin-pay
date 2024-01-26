import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 16px 52px 16px 20px;
  border-radius: 20px;
  background: ${getColor('charcoal5')};

  .amount {
    font-weight: 700;
  }
`;
