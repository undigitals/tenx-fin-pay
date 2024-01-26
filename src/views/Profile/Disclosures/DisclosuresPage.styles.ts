import styled from 'styled-components/macro';
import { getColor } from 'utils/helpers/styleHelpers';

export const SDisclosureContainer = styled.div`
  width: 100%;
  margin-top: 17px;
  padding: 0 12px;
  border-radius: 12.5px;
  background: ${getColor('white')};
  .disclosure-item {
    margin: 28px 0;
    padding-right: 18px;
    .icon-chevronRight {
      width: 20px;
    }
  }
`;
