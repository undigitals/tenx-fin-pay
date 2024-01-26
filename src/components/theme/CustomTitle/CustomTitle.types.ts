import { TThemeColor } from 'styles/theme';
import { ReactNode } from 'react';

export type TTitleSizeProp = 'smallest' | 'smaller' | 'small' | 'normal' | 'big' | 'xl' | 'bigger' | 'biggest';
export type TTitleWeightProp = 'lighter' | 'light' | 'normal' | 'strong';
export type TTitleMarginProp = 'none' | 'smallest' | 'smaller' | 'small' | 'normal' | 'big' | 'bigger' | 'biggest' | 'xl';
export type TTextTagProp = 'div' | 'h1' | 'h2' | 'h3';
export type TTitleAlignProp = 'start' | 'end' | 'center';
export type TTextAlignProp = 'start' | 'center' | 'end';
export type TTitleFontProp = 'Poppins' | 'DM Sans';

export interface ICustomTitleStyleObj {
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingRight?: number | string;
  paddingLeft?: number | string;
}
export interface ICustomTitleProps {
  $StylesObj?: ICustomTitleStyleObj;
  $extraStyles?: { [key: string]: string | number | undefined };
}
export interface ICustomTitle extends ICustomTitleStyleObj {
  icon?: JSX.Element;
  children: string | ReactNode;
  fontWeight?: TTitleWeightProp;
  size?: TTitleSizeProp;
  textTag?: TTextTagProp;
  textColor?: TThemeColor;
  align?: TTitleAlignProp;
  marginBottom?: TTitleMarginProp;
  marginTop?: TTitleMarginProp;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  lineHeight?: number | string;
  font?: TTitleFontProp;
  textAlign?: TTextAlignProp;
  extraStyles?: { [key: string]: string | number | undefined };
}

export interface ICustomTitleIcon {
  src?: string;
}

export interface ICustomTitleText extends ICustomTitleProps {
  fontWeight: TTitleWeightProp;
  size: TTitleSizeProp;
  color: TThemeColor;
  lineHeight?: number | string;
  font?: TTitleFontProp;
  textAlign?: TTextAlignProp;
}

export interface ICustomTitleContainer {
  marginBottom: TTitleMarginProp;
  marginTop: TTitleMarginProp;
  align: TTitleAlignProp;
}
