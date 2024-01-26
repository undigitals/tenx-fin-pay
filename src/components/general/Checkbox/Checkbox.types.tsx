import React, { ReactElement } from 'react';
import { TThemeColor } from 'styles/theme';

export type TCheckboxProps = {
  children?: string | ReactElement;
  checked?: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
  isError?: boolean;
  errorText?: string;
  onChange?: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  props?: object;
  color?: TThemeColor;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
  bgColor?: TThemeColor;
  textColorChecked?: TThemeColor;
  textColorUnchecked?: TThemeColor;
  marginBottom?: number;
};

export interface ISInputWrapper {
  bgColor?: TThemeColor;
  $isError?: boolean;
}
