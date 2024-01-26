import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import { TThemeColor } from 'styles/theme';

export interface IMaskedInput extends MaskedInputProps {
  label?: string;
  onBeige?: boolean;
  isBorderHidden?: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  minWidth?: number;
  isError?: boolean;
  isSuccess?: boolean;
  placeholderColor?: TThemeColor;
  isSuffixIcon?: boolean;
}

export interface ISMaskedInput {
  onBeige: boolean;
  isBorderHidden: boolean;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  minWidth: number;
  isError: boolean;
  isSuccess: boolean;
  placeholderColor: TThemeColor;
}
