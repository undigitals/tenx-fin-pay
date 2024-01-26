import styled, { css } from 'styled-components/macro';
import { flexCenter, getColorByProp, getProp, ifProp, round } from 'utils/helpers/styleHelpers';
import { TThemeColor } from 'styles/theme';
import { ISSvgIconProps } from './Icon.types';

export const SIconContainer = styled.div<ISSvgIconProps>`
  width: ${getProp('width')}px;
  height: ${getProp('height')}px;
  margin-left: ${getProp('marginLeft', 0)}px;
  margin-right: ${getProp('marginRight', 0)}px;
  margin-top: ${getProp('marginTop', 0)}px;
  margin-bottom: ${getProp('marginBottom', 0)}px;
  background: ${getColorByProp('color')} no-repeat center !important;
  //noinspection CssUnknownTarget
  mask: url(/svg-icons.svg#icon-${getProp('name')}) center no-repeat !important;
  mask-size: cover;
  cursor: ${ifProp('cursorPointer', 'pointer', 'default')};

  ${ifProp(
    'clear',
    css`
      background: url(/svg-icons.svg#icon-${getProp('name')}) center no-repeat !important;
      mask: none !important;
    `
  )};
`;

export const SIconSign = styled.div<{ bgColor: TThemeColor }>`
  ${flexCenter};
  flex: 0 0 auto;
  ${(props) => round(48, props.bgColor)};
`;
