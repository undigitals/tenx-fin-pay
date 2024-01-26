import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';

export const SAccountDrawer = styled(CustomSheet)`
  .body {
    display: flex;
    flex-direction: column;
    padding-bottom: 42px;
  }
`;

export const SAccountDefaultLabel = styled.div`
  display: inline-flex;
  padding: 8px 16px;
  background: ${getColor('blue')};
  margin-bottom: 18px;
  border-radius: 12px 0 16px 0;
`;
