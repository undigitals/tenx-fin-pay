import { TThemeColor } from 'styles/theme';
import { css, DefaultTheme, FlattenInterpolation, FlattenSimpleInterpolation, ThemedStyledProps, ThemeProps } from 'styled-components';

type TIfPropVal = FlattenInterpolation<ThemedStyledProps<any, DefaultTheme>>;
type TMediaSize = 'maxDesktop' | 'minDesktop' | 'tablet' | 'mobile';

export const MEDIA_SIZE: Record<TMediaSize, number> = {
  maxDesktop: 1600,
  minDesktop: 1280,
  tablet: 768,
  mobile: 376,
};

export const getColor = (colorName: TThemeColor) => (props: ThemeProps<DefaultTheme>) => props.theme[colorName];
export const getColorByProp =
  (propName: string, fallback = 'none') =>
  (props: any) =>
    props.theme[props[propName]] || fallback;
export const getColorIf = (propFlagName: string, ifColorName: TThemeColor, elseColorName: TThemeColor) => (props: any) =>
  props[propFlagName] ? props.theme[ifColorName] : props.theme[elseColorName] || 'transparent';
export const getProp =
  (propName: string, fallbackVal: string | number = '') =>
  (props: any) =>
    props[propName] || fallbackVal;
export const ifProp =
  (propFlagName: string, ifVal: string | number | TIfPropVal, elseVal: string | number | TIfPropVal = '') =>
  (props: any) =>
    props[propFlagName] ? ifVal : elseVal;

export const mediaFrom = (from: number | TMediaSize, cssItem: string | FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<DefaultTheme>>) => css`
  @media only screen and (min-width: ${typeof from === 'number' ? from : MEDIA_SIZE[from]}px) {
    ${cssItem};
  }
`;

export const mediaUpTo = (upTo: number | TMediaSize, cssItem: string | FlattenSimpleInterpolation) => css`
  @media only screen and (max-width: ${typeof upTo === 'number' ? upTo : MEDIA_SIZE[upTo]}px) {
    ${cssItem};
  }
`;

export const mediaUpToHeight = (upTo: number, cssItem: string | FlattenSimpleInterpolation) => css`
  @media only screen and (max-height: ${upTo}px) {
    ${cssItem};
  }
`;

export const round = (size: number, bgColor: TThemeColor = 'transparent') => css`
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  background: ${getColor(bgColor)};
`;

type TJustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
type TAlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch';

export const flex = (direction: 'row' | 'column' = 'row', justifyContent: TJustifyContent = 'center', alignItems: TAlignItems = 'center') => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
