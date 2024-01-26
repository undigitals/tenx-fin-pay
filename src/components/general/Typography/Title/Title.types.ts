import { TThemeColor } from 'styles/theme';
import { ReactNode } from 'react';
import { IStylesProps, TFontProp, TJustifyContentProp, TTitleSizeProp, TTagProp, TTextAlignProp, TWeightProp } from 'components/general/Typography/Typography.types';

export interface ITitle extends IStylesProps {
  children: string | ReactNode;
  icon?: JSX.Element;
  fontWeight?: TWeightProp;
  size?: TTitleSizeProp;
  color?: TThemeColor;
  lineHeight?: number | string;
  font?: TFontProp;
  textAlign?: TTextAlignProp;
  textTag?: TTagProp;
  justifyContent?: TJustifyContentProp;
}

export interface ITitleContainer extends IStylesProps {
  justifyContent?: TJustifyContentProp;
}
