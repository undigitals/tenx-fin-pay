import { InputProps } from 'antd';
import { TThemeColor } from 'styles/theme';

export type TInputProps = 'text' | 'password' | 'tel' | 'number';

export interface ICustomInputProps extends InputProps {
  type?: TInputProps;
  bgColor?: 'white' | 'creamSS2' | 'cream';
  inputTheme?: 'default' | 'sms-code' | 'my-info' | 'filter' | 'on-white' | string;
  className?: string;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  height?: number;
  padding?: string;
  isEmpty?: boolean;
  stringMode?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  borderRadius?: number;
  iconAfter?: {
    color?: TThemeColor;
    name: string;
  };
}
