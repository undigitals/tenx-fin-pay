import styled from 'styled-components/macro';
import { getColor } from 'utils/helpers/styleHelpers';
import { Link } from 'react-router-dom';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';

export const TenxyBox = styled.div`
  padding: 32px 20px 24px;
  gap: 48px;
  background: ${getColor('white')};
  border-radius: 20px;
  margin-bottom: 48px;
`;

export const STenxyBox = styled.div`
  padding: 32px 20px;
  gap: 48px;
  background: ${getColor('white')};
  border-radius: 20px;
  margin-bottom: 48px;
  margin-top: 16px;
  border: none;
`;

export const StyledTenxyBox = styled(TenxyBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledTenxPayContainer = styled(TenxyBox)`
  padding: 32px 20px 34px;

  .tenx-pay-main .actions button {
    flex-grow: 0;
    flex-basis: 169px;
  }
`;

export const StyledLink = styled(Link)`
  width: 100%;
  max-height: 51px;
  display: flex;
  align-items: center;
`;

export const StyledCustomButton = styled(CustomButton)`
  width: 100%;
  max-height: 51px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
