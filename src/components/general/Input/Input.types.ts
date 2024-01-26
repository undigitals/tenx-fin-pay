import { Input, InputProps, InputNumber } from 'antd';

export type TInputProps = 'text' | 'password' | 'tel' | 'number';

export interface IInput extends InputProps {
  label?: string;
  type?: TInputProps;
  iconRender?: any;
  onBeige?: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  isError?: boolean;
  isSuccess?: boolean;
}

export interface ISInput {
  type: TInputProps;
  onBeige: boolean;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  isError: boolean;
  isSuccess: boolean;
}

export const INPUT_TYPES_MAP: Record<TInputProps, typeof Input | typeof Input.Password | typeof InputNumber> = {
  text: Input,
  tel: Input,
  password: Input.Password,
  number: InputNumber,
};
