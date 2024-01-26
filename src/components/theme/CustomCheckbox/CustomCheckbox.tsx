import React from 'react';
import { SCustomCheckbox, SCheckboxText } from './CustomCheckbox.styles';
import { ICustomCheckboxProps, TCustomCheckboxStyleObj } from './CustomCheckbox.type';

export const CustomCheckbox: React.FC<ICustomCheckboxProps> = ({ children, marginBottom, borderColor = 'blue', chBoxType, ...props }) => {
  const StyleObj: TCustomCheckboxStyleObj = {
    marginBottom,
  };
  return (
    <SCustomCheckbox $StyleObj={StyleObj} $chBoxType={chBoxType} borderColor={borderColor} {...props} data-testid="checkbox">
      <SCheckboxText>{children}</SCheckboxText>
    </SCustomCheckbox>
  );
};
