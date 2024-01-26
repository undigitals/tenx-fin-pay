import React from 'react';

export type TPreset = 'primary' | 'red' | 'primary-red' | 'secondary' | 'transparent' | 'primary-with-outline' | '';
export type TSize = 'small' | 'middle' | 'middleStretch' | 'large' | 'middleAlt' | 'xl' | undefined;
export type TType = 'button' | 'submit' | 'reset' | undefined;

export interface ICustomButtonStyleObj {
  marginBottom?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  marginLeft?: string | number;
  letterSpacing?: string | number;
  width?: string | number;
}

export interface IExtraStyles {
  readonly [key: string]: string | number | boolean | undefined;
}

export interface ICustomButtonStyleProps {
  $size?: TSize;
  $preset?: TPreset;
  $StyleObj?: ICustomButtonStyleObj;
}

export interface ICustomButtonProps extends ICustomButtonStyleObj {
  type?: TType;
  className?: string;
  preset?: TPreset;
  size?: TSize;
  children: any;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
