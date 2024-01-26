// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { Form } from 'antd';
import { SLabel, SInput, SInputContainer, SSpan } from './BaseInput.styles';
import { IInput } from './BaseInput.types';

export const BaseInput: React.FC<IInput> = ({
  label,
  placeholder,
  value,
  defaultValue,
  prefix,
  prefixText,
  prefixColor,
  prefixSize = 'normal',
  height = '56px',
  padding = '16px 20px',
  justifyContent = 'space-between',
  noBorder,
  suffix,
  suffixColor,
  suffixSize = 'normal',
  type = 'text',
  autoComplete,
  disabled = false,
  ignoreBorder = false,
  onBeige = false,
  isError = false,
  isSuccess = false,
  isPhoneInput = false,
  passwordIcon = false,
  customPlaceholder = false,
  marginBottom = 4,
  marginRight = 0,
  marginLeft = 0,
  containerStyle,
  onChange,
  onKeyUp,
  onKeyDown,
  onBlur,
  onClick,
  suffixClick,
  prefixClick,
  ...props
}) => {
  const { status } = Form.Item.useStatus();
  const [inputType, setInputType] = useState(type);

  const toggleHiddenPassword = () => {
    if (inputType === 'text') setInputType('password');
    if (inputType === 'password') setInputType('text');
    if (inputType === 'number') setInputType('number');
  };

  return (
    <>
      {label && <SLabel>{label}</SLabel>}
      <SInputContainer
        disabled={disabled}
        className={`input-status-${status} base-input-container`}
        onBeige={onBeige}
        onClick={onClick}
        isPhoneInput={isPhoneInput}
        marginBottom={marginBottom}
        marginRight={marginRight}
        marginLeft={marginLeft}
        isError={isError}
        isSuccess={isSuccess}
        style={containerStyle}
        ignoreBorder={ignoreBorder}
        justifyContent={justifyContent}
        noBorder={noBorder}
        height={height}
        padding={padding}
      >
        {prefix && <Icon name={prefix} size={prefixSize} className="prefix" onClick={prefixClick} cursorPointer color={prefixColor || 'charcoal40'} />}
        {prefixText && <SSpan>{prefixText}</SSpan>}
        <SInput
          placeholder={placeholder}
          customPlaceholder={customPlaceholder}
          type={inputType}
          value={value}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onBlur={onBlur}
          className="base-input-input"
          {...props}
        />
        {suffix && <Icon name={suffix} className="suffix" onClick={suffixClick} cursorPointer size={suffixSize} color={suffixColor || 'charcoal40'} />}
        {passwordIcon && (
          <Icon name={inputType === 'password' ? 'eyeHidden' : 'eye'} color={value ? 'blue' : 'charcoal40'} size={suffixSize} className="suffix" cursorPointer onClick={toggleHiddenPassword} />
        )}
      </SInputContainer>
    </>
  );
};
