import React from 'react';
import { Select } from 'antd';
import { SCustomDropdown } from './CustomDropdown.style';
import { CustomDropdownInputProps } from './CustomDropdown.type';

export const CustomDropdown: React.FC<React.ComponentProps<typeof Select> & CustomDropdownInputProps> = ({
  children,
  value,
  onChange,
  placeholder = '',
  stylePreset = 'regular',
  bgColor = 'white',
  dDstyle = 'default',
  onBlur,
  onClick,
  defaultValue,
  dropdownStyle,
  showSearch,
  options,
  size = 'large',
  filterOption,
}) => (
  <SCustomDropdown
    value={value}
    stylePreset={stylePreset}
    placeholder={placeholder}
    bordered={false}
    {...(defaultValue ? { defaultValue } : {})}
    size={size}
    bgColor={bgColor}
    onChange={onChange}
    dDstyle={dDstyle}
    onBlur={onBlur}
    onClick={onClick}
    dropdownStyle={dropdownStyle}
    showSearch={showSearch}
    options={options}
    filterOption={filterOption}
  >
    {children}
  </SCustomDropdown>
);
