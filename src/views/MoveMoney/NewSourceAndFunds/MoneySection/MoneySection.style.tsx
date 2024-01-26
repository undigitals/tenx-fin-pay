import styled, { css } from 'styled-components';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Card } from 'views/MoveMoney/NewSourceAndFunds/Card/Card';
import { mediaUpTo } from 'utils/helpers/styleHelpers';

export const SLayout = styled.div`
  margin-top: 15px;
  padding-bottom: 6px;
  ${mediaUpTo(
    'mobile',
    css`
      margin-top: 8px;
    `
  )}
`;

export const SCustomCard = styled(CustomCard)`
  padding: 24px;
  gap: 24px;
  display: grid;
`;

export const SCard = styled(Card)`
  padding: 24px;
  color: red;
`;
