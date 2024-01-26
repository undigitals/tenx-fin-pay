import { ReactNode } from 'react';
import { TThemeColor } from 'styles/theme';

export interface IExtraStyles {
  readonly [key: string]: string | number | undefined;
}

export interface ICustomCard {
  marginBottom?: number | string;
  marginTop?: number | string;
  cursorPointer?: boolean;
  borderRadius?: number;
  padding?: string;
  border?: string;
  width?: string;
  height?: string;
  background?: TThemeColor;
  position?: string;
  $extraStyles?: IExtraStyles;
}

export interface CustomCardProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  marginBottom?: number;
  marginTop?: number;
  margin?: string;
  cursorPointer?: boolean;
  borderRadius?: number;
  padding?: string;
  border?: string;
  width?: string;
  height?: string;
  position?: string;
  background?: TThemeColor;
  ref?: HTMLHeadingElement;
  extraStyles?: IExtraStyles;
}

export interface ICustomCardProps {
  $extraStyles?: IExtraStyles;
}
