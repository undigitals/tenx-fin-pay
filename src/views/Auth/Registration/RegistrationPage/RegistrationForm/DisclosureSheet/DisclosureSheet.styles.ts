import styled from 'styled-components/macro';
import { getColor } from 'utils/helpers/styleHelpers';

export const SSheetFooter = styled.div`
  width: 100%;
  padding: 10px 10px 20px;
  & .ant-checkbox {
    border: 2px solid ${getColor('charcoal30')};
    border-radius: 6px;
    &-inner {
      border: 0;
    }
  }
  .ant-checkbox:hover,
  .ant-checkbox-wrapper:hover,
  .ant-checkbox:hover,
  .ant-checkbox-input:focus {
    .ant-checkbox-inner {
      border: 0;
    }
  }
`;
