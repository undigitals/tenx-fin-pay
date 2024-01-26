import React from 'react';
import { TThemeColor } from 'styles/theme';

export type TChipSize = 'small' | 'middle' | 'big';
export type TChipPreset = 'primary' | 'light' | 'cream' | 'red' | 'tab' | 'default' | 'disabled';

export type TChipExtraStyles = {
  width?: string | number;
  background?: TThemeColor;
  color?: TThemeColor;
  border?: string;
  borderColor?: TThemeColor;
};

export interface TChipStyle {
  margin?: string;
  marginTop?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  padding?: string;
  paddingTop?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  paddingBottom?: string | number;
}

export type TChipElStyleProps = {
  className?: string;
  noHoverEffect?: boolean;
  $styleProps?: TChipStyle;
  $extraStyles?: TChipExtraStyles;
};

export interface TChipElProps extends TChipElStyleProps {
  $size?: TChipSize;
  $preset?: TChipPreset;
  $isActive?: boolean;
}

export interface TChipProps extends TChipStyle {
  size?: TChipSize;
  preset?: TChipPreset;
  isActive?: boolean;
  id?: string | number;
  value?: string | number;
  children: string;
  withImage?: boolean;
  withIcon?: boolean;
  withClose?: boolean;
  imageSrc?: string;
  imgAlt?: string;
  iconName?: string;
  isDisabled?: boolean;
  onChipClick?: any;
  onCloseClick?: (id?: string | number, e?: React.MouseEvent) => void;
  extraStyles?: TChipExtraStyles;
  className?: string;
  noHoverEffect?: boolean;
  'data-testid'?: string;
}
