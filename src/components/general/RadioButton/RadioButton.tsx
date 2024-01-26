import React, { useEffect, useState } from 'react';
import { SLabel, SRadio, SRadioInner, SErrorText, SWrapper } from './RadioButton.styles';
import { IRadioButtonProps } from './RadioButton.types';

export const RadioButton: React.FC<IRadioButtonProps> = ({ children, checked = false, disabled = false, isError, errorText = '', onChange = () => {}, ...props }) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onChange(e);
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <SLabel {...props} disabled={disabled}>
      <SWrapper>
        <SRadio type="radio" onChange={onChangeRadio} checked={isChecked} disabled={disabled} />
        <SRadioInner isError={isError} checked={isChecked} disabled={disabled} />
        {children}
      </SWrapper>

      <SErrorText isError={isError}>{errorText}</SErrorText>
    </SLabel>
  );
};
