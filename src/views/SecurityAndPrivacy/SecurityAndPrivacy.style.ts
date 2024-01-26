import styled from 'styled-components';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Card } from './Card/Card';

export const SCustomCard = styled(CustomCard)`
  padding: 24px;
  gap: 24px;
  display: grid;
`;

export const SCard = styled(Card)`
  padding: 24px;
  color: red;
`;
