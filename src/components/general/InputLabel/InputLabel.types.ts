export type TTextFontProp = 'Poppins' | 'DM Sans';

export interface ICustomInputStyleObject {
  marginTop?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  fontFamily?: TTextFontProp;
}

export interface ICustomInputStyle {
  $StyleObj: ICustomInputStyleObject;
}

export interface IInputLabelProps extends ICustomInputStyleObject {
  children: React.ReactNode;
  color?: string;
}
