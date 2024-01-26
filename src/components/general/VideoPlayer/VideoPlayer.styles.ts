import { Slider } from 'antd';
import styled from 'styled-components/macro';
import { lighten, transparentize } from 'polished';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { Icon } from 'components/general/Icon/Icon';
import { getColor } from 'utils/helpers/styleHelpers';
import { ISControlsOverlayProps, ISProgressBarProps } from './VideoPlayer.types';

export const SContainer = styled.div`
  position: relative;
`;

export const STime = styled(CustomText)`
  position: absolute;
  font-size: 14px;
  bottom: 25px;
  left: 53px;
`;

export const PlayPauseBtn = styled(Icon)`
  position: absolute;
  bottom: 24px;
  left: 18px;
  cursor: pointer;
`;

export const FullscreenBtn = styled(Icon)`
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;
`;

export const SProgressbarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
`;

export const SPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${getColor('white')};
`;

export const ProgressBar = styled(Slider)<ISProgressBarProps>`
  left: 0;
  right: 0;
  margin: 0;

  .ant-slider {
    &-rail {
      border-radius: 0;
    }

    &-step {
      border: 1px solid ${(props) => getColor(props.color)};
      border-left: 0;
      border-right: 0;
    }

    &-track {
      background: ${(props) => getColor(props.color)} !important;
    }

    &:hover {
      .ant-slider-step {
        border: 1px solid ${(props) => getColor(props.color)};
      }

      .ant-slider-track {
        background: ${(props) => lighten(0.1, getColor(props.color)(props))} !important;
      }
    }

    &-handle {
      width: 10px;
      height: 10px;
      margin-top: -3px;
      background-color: ${(props) => getColor(props.color)};
      border: none;
    }
  }
`;

export const SControlsOverlay = styled.div<ISControlsOverlayProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: pointer;
  background: ${(props) => transparentize(props.isPlaying ? 1 : 0.6, getColor('white')(props))};
`;
