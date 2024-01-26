import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const AccountsBox = styled.div`
  padding: 32px 20px 24px;
  gap: 48px;
  background: ${getColor('white')};
  border-radius: 20px;
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SUnavailableFiserv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0 50px;

  .unavailable-image {
    margin-bottom: 80px;
  }
`;
