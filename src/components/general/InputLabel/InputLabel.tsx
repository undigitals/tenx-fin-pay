import React from 'react';
import { SInputLabel } from './InputLabel.styles';
import { IInputLabelProps, ICustomInputStyleObject } from './InputLabel.types';

export const InputLabel: React.FC<IInputLabelProps> = ({ children, color, ...props }) => {
  const StyleObj: ICustomInputStyleObject = {
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    marginRight: props.marginRight,
    marginLeft: props.marginLeft,
    fontFamily: props.fontFamily,
  };

  return (
    <SInputLabel $StyleObj={StyleObj} color={color}>
      {children}
    </SInputLabel>
  );
};
