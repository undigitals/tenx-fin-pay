import styled, { css } from 'styled-components';
import { getColor, ifProp } from 'utils/helpers/styleHelpers';
import { images } from 'assets';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';

export const STenxPayImage = styled.div<{ isDesktop?: boolean }>`
  display: block;
  margin: 0 auto;
  height: 120px;
  width: 250px;
  background-color: ${getColor('white')};
  background: url(${images.moneyTime}) no-repeat center / contain;
  background-size: auto;

  ${ifProp(
    'isDesktop',
    css`
      background-size: cover;
      height: 160px;
    `
  )};
`;

export const SBox = styled.div`
  padding: 32px 20px 32px;
  margin-top: 16px;
  margin-bottom: 48px;
  display: flex;
  background: ${getColor('white')};
  border-radius: 20px;
  flex-direction: column;

  button.primary {
    padding-block: 10px;
  }
`;

export const StyledCustomButton = styled(CustomButton)`
  height: 44px;
`;
