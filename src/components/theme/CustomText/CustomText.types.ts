import { TThemeColor } from 'styles/theme';

export type TTextSizeProp = 'smaller' | 'small' | 'normal' | 'big' | 'bigger' | 'xl' | 'xxl' | 'biggest' | '16' | '18' | '30' | '6' | '32';
export type TTextWeightProp = 'normal' | 'strong' | 'stronger' | 'strongest';
export type TTextColorProp = 'charcoal' | 'charcoal50' | 'charcoal60' | 'charcoal70' | 'blue' | 'red' | 'green' | 'white';
export type TTextAlignProp = 'left' | 'center' | 'right';
export type TDisplayProp = 'flex' | 'inline';
export type TTextStyleProp = 'normal' | 'italic' | 'oblique';
export type TTextFontProp = 'Poppins' | 'DM Sans';

export interface ICustomTextStyleObj {
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
}
interface ICustomTextStyleProps {
  $StylesObj?: ICustomTextStyleObj;
  $extraStyles?: { [key: string]: string | number | undefined };
}
export interface ICustomText extends ICustomTextStyleObj {
  children: React.ReactNode;
  icon?: JSX.Element;
  fontWeight?: TTextWeightProp;
  size?: TTextSizeProp;
  textColor?: TThemeColor;
  style?: React.CSSProperties;
  textAlign?: TTextAlignProp;
  className?: string;
  innerClassName?: string;
  display?: TDisplayProp;
  lineHeight?: number | string;
  cursorPointer?: boolean;
  fontStyle?: TTextStyleProp;
  onClick?: () => void;
  font?: TTextFontProp;
  nowrap?: boolean;
  extraStyles?: { [key: string]: string | number | undefined };
}

export interface ICustomTextText extends ICustomTextStyleProps, ICustomTextStyleObj {
  fontWeight: TTextWeightProp;
  size: TTextSizeProp;
  color: TThemeColor;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  textAlign?: TTextAlignProp;
  fontStyle?: TTextStyleProp;
  display?: TDisplayProp;
  lineHeight?: number | string;
  cursorPointer?: boolean;
  onClick?: () => void;
  font?: TTextFontProp;
}

export interface ICustomTextSkeleton {
  width: TTextSizeProp;
}

export interface ISCustomTextContainerProps {
  display?: TDisplayProp;
  nowrap?: boolean;
}
