import { mediaFrom, mediaUpTo } from 'utils/helpers/styleHelpers';
import styled, { css } from 'styled-components';
import { BaseSlider } from 'components/general/Slider/Slider';

export const SContainer = styled.div`
  ${mediaUpTo(
    'minDesktop',
    css`
      .title-web {
        display: none;
      }
    `
  )}

  ${mediaFrom(
    'minDesktop',
    css`
      .title-mobile {
        display: none;
      }

      .video-item {
        max-width: 360px;
        margin-right: 15px;
      }
    `
  )}
`;

export const SBaseSlider = styled(BaseSlider)``;
