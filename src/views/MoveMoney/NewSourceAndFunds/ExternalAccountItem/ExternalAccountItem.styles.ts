import styled from 'styled-components/macro';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { getColorByProp } from 'utils/helpers/styleHelpers';
import { CustomCardProps } from './ExternalAccountItem.type';

export const SCustomCard = styled(CustomCard)<CustomCardProps>`
  border: 2px solid ${getColorByProp('bgColor', 'transparent')};
`;
