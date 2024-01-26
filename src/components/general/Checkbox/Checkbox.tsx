import React, { useEffect, useState } from 'react';
import { BodyText } from 'components/general/Typography';
import { SCheckbox, SCheckboxWrapper, SInputWrapper, SIcon } from './Checkbox.styles';
import { TCheckboxProps } from './Checkbox.types';

export const Checkbox: React.FC<TCheckboxProps> = ({
  children,
  checked = false,
  id,
  disabled = false,
  name = '',
  isError,
  errorText = '',
  onChange = () => {},
  bgColor,
  textColorChecked = 'charcoal70',
  textColorUnchecked = 'charcoal30',
  marginBottom = 0,
  ...props
}) => {
  const [isChecked, setChecked] = useState(checked || false);
  const isInputError = isError || (!isChecked && props['aria-invalid']);

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange(e);
  };

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  return (
    <div style={{ marginBottom }}>
      <SCheckboxWrapper>
        <SInputWrapper $isError={isInputError} bgColor={bgColor}>
          {isChecked && <SIcon name="checked" size="smallest" color="blue" />}
          <SCheckbox type="checkbox" checked={isChecked} name={name || id} disabled={disabled} onChange={onChangeCheckbox} />
        </SInputWrapper>
        <BodyText textType="bodyText" font="DM Sans" color={disabled ? textColorUnchecked : textColorChecked} size="N" fontWeight="R">
          {children}
        </BodyText>
      </SCheckboxWrapper>

      {isError && (
        <BodyText textType="bodyText" color="red" font="DM Sans" size="N" fontWeight="R">
          {errorText}
        </BodyText>
      )}
    </div>
  );
};
