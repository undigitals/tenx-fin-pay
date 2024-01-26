import styled, { css } from 'styled-components';
import { getColor, getColorIf, ifProp } from 'utils/helpers/styleHelpers';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Card } from 'views/MoveMoney/AddMoneyPage/Card/Card';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Icon } from 'components/general/Icon/Icon';
import { IBtnProps, ICustomCard } from './FundsPage.type';

export const SBtn = styled(CustomButton)<IBtnProps>`
  padding: 0;
  justify-content: right;
  background: ${getColor('transparent')};
  color: ${getColorIf('isActive', 'charcoal70', 'blue')};
  border: none;
  font-weight: 700;
  font-family: 'DM Sans';
`;

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

export const SCustomButton = styled(CustomButton)`
  padding: 0;
  border: none;
`;

export const SAmountCard = styled(CustomCard)<ICustomCard>`
  ${ifProp(
    'isError',
    css`
      border: 2px solid ${getColor('red')} !important;
    `
  )};
  padding: 24px;
  gap: 24px;
  display: grid;
`;

export const SCard = styled(Card)`
  padding: 24px;
  color: red;
`;

export const SIcon = styled(Icon)`
  margin-left: 5px;
  width: 22px;
  height: 18px;
`;
