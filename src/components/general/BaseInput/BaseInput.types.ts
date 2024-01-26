import React from 'react';
import { TThemeColor } from 'styles/theme';
import { ICON_SIZE_MAP } from 'components/general/Icon/Icon.constants';

type TType = 'text' | 'password' | 'tel' | 'number';

export interface ISInputContainer {
  disabled: boolean;
  onBeige: boolean;
  marginBottom: number;
  isError: boolean;
  isSuccess: boolean;
  isPhoneInput: boolean;
  ignoreBorder: boolean;
  justifyContent?: 'space-between' | 'flex-start' | 'flex-end' | 'center' | 'space-evenly' | 'space-around';
  noBorder?: boolean;
  padding?: string;
  height?: string;
}

export interface IInput extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  onBeige?: boolean;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  isError?: boolean;
  isSuccess?: boolean;
  isPhoneInput?: boolean;
  customPlaceholder?: boolean;
  prefixText?: string;
  prefix?: string;
  prefixColor?: TThemeColor;
  prefixSize?: keyof typeof ICON_SIZE_MAP;
  suffix?: string;
  suffixColor?: TThemeColor;
  suffixSize?: keyof typeof ICON_SIZE_MAP;
  disabled?: boolean;
  ignoreBorder?: boolean;
  placeholder?: string;
  type?: TType;
  value?: string;
  passwordIcon?: boolean;
  defaultValue?: string | number | readonly string[] | undefined;
  containerStyle?: React.CSSProperties;
  justifyContent?: 'space-between' | 'flex-start' | 'flex-end' | 'center' | 'space-evenly' | 'space-around';
  noBorder?: boolean;
  padding?: string;
  height?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  prefixClick?: () => void;
  suffixClick?: () => void;
}

export interface ISInput {
  onBeige: boolean;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  isError: boolean;
  isSuccess: boolean;
  customPlaceholder?: boolean;
}
