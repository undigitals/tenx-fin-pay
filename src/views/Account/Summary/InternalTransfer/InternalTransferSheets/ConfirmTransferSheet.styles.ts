import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import styled from 'styled-components';

export const SSheet = styled(CustomSheet)`
  button:is(.default, .primary) {
    width: 120px;
    padding: 10px 24px;
    font-family: 'Poppins';
    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;
  }
`;
