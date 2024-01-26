import { Radio } from 'antd';
import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SRadio = styled(Radio)`
  .ant-radio {
    &-checked {
      border-color: ${getColor('creamSS3')} !important;
    }

    &-inner {
      border-color: ${getColor('creamSS3')} !important;
      background-color: ${getColor('cream')} !important;

      :after {
        background-color: ${getColor('blue')} !important;
      }
    }

    :hover {
      border-color: ${getColor('creamSS3')} !important;
    }
  }
`;
