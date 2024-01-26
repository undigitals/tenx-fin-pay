import { Slider } from 'antd';
import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SSlider = styled(Slider)`
  .ant-slider {
    &-rail {
      background-color: ${getColor('charcoal5')} !important;
    }

    &-track {
      background-color: ${getColor('blue')} !important;
    }

    &-handle {
      border-color: ${getColor('white')} !important;
      background-color: ${getColor('blue')} !important;
      width: 20px;
      height: 20px;
      margin-top: -8px;
    }
  }
`;
