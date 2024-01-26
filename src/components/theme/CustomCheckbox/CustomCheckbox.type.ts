import { CheckboxProps } from 'antd';

export interface TCustomCheckboxStyleObj {
  marginBottom?: number;
}
export interface ICustomCheckboxProps extends CheckboxProps, TCustomCheckboxStyleObj {
  borderColor?: 'creamSS2' | 'blue';
  marginBottom?: number;
  chBoxType?: string;
}

export interface ISCheckboxProps extends CheckboxProps {
  borderColor: 'creamSS2' | 'blue';
  $StyleObj: any;
  $chBoxType?: string;
}
