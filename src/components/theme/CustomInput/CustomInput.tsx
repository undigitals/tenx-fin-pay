import React from 'react';
import { Input, InputNumber } from 'antd';
import { SAfterIcon, SCustomInput, SINputContainer } from './CustomInput.styles';
import { ICustomInputProps, TInputProps } from './CustomInput.types';

const INPUT_TYPES_MAP: Record<TInputProps, typeof Input | typeof Input.Password | typeof InputNumber> = {
  text: Input,
  tel: Input,
  password: Input.Password,
  number: InputNumber,
};

export const CustomInput: React.FC<ICustomInputProps> = ({
  type = 'text',
  inputTheme = 'default',
  bgColor,
  className = '',
  bordered = false,
  marginBottom = 0,
  marginRight = 0,
  height = 55,
  padding = '17px 26px',
  isEmpty = false,
  stringMode = false,
  isError = false,
  isSuccess = false,
  borderRadius = 100,
  iconAfter,
  ...props
}) => (
  <SINputContainer>
    <SCustomInput
      as={INPUT_TYPES_MAP[type]}
      bgColor={bgColor}
      inputTheme={inputTheme}
      bordered={bordered}
      padding={padding}
      marginBottom={marginBottom}
      marginRight={marginRight}
      height={height}
      type={type}
      isEmpty={isEmpty}
      isError={isError}
      isSuccess={isSuccess}
      stringMode={stringMode}
      borderRadius={borderRadius}
      iconAfter={iconAfter}
      {...props}
      className={`custom-input-${inputTheme} ${className}`}
    />
    {iconAfter && <SAfterIcon name={iconAfter.name} color={iconAfter?.color} />}
  </SINputContainer>
);
