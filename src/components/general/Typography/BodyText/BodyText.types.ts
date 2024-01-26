import React, { ReactNode } from 'react';
import { IStylesProps, ITextType, TDisplayProp, TFontProp, TJustifyContentProp, TSizeProp, TTagProp, TTextAlignProp, TWeightProp } from 'components/general/Typography/Typography.types';
import { TThemeColor } from 'styles/theme';

export interface IBodyText extends IStylesProps {
  children: string | ReactNode;
  textType: ITextType;
  icon?: JSX.Element;
  fontWeight: TWeightProp;
  size: TSizeProp;
  textTag?: TTagProp;
  color: TThemeColor;
  textAlign?: TTextAlignProp;
  justifyContent?: TJustifyContentProp;
  className?: string;
  innerClassName?: string;
  display?: TDisplayProp;
  lineHeight?: number | string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  font?: TFontProp;
  nowrap?: boolean;
  underlined?: boolean;
  cursorPointer?: boolean;
}

export interface IBodyTextContainer extends IStylesProps {
  justifyContent?: TJustifyContentProp;
  display?: TDisplayProp;
  nowrap?: boolean;
  cursorPointer?: boolean;
}
