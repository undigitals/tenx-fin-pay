import { TThemeColor } from 'styles/theme';
import { MouseEvent } from 'react';
import { SVG_ICONS } from 'assets/iconsList';
import { ICON_SIZE_MAP } from './Icon.constants';

export type TIconName = typeof SVG_ICONS[number];

export interface IIconProps {
  name: TIconName | string;
  display?: string;
  className?: string;
  type?: 'pictogram' | 'icon';
  color?: TThemeColor;
  pictBgColor?: TThemeColor;
  size?: keyof typeof ICON_SIZE_MAP;
  cursorPointer?: boolean;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  onClick?: (event: MouseEvent) => void;
}

export interface IIconSignProps {
  bgColor?: TThemeColor;
  iconName: TIconName;
  iconColor?: TThemeColor;
  className?: string;
}

export interface ISSvgIconProps {
  name?: string;
  cursorPointer: boolean;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  width?: string | number;
  height?: string | number;
  pictBgColor: TThemeColor;
  clear?: boolean;
}
