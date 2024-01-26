import styled from 'styled-components/macro';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';
import { getColorByProp } from 'utils/helpers/styleHelpers';
import { CustomCardProps } from './InternalAccountItem.type';

export const SCustomCard = styled(CustomCard)<CustomCardProps>`
  border: 2px solid ${getColorByProp('bgColor', 'transparent')};
`;

export const SCustomValue = styled(CustomTitle)`
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 0;
`;
