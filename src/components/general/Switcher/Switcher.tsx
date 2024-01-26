import React from 'react';
import { SInner, SSwitcher } from './Switcher.styles';
import { ISwitcherProps } from './Switcher.types';

export const Switcher: React.FC<ISwitcherProps> = ({ activeColor = 'blue', inactiveColor = 'charcoal60', checked = false, onClick, ...props }) => (
  <SSwitcher color={checked ? activeColor : inactiveColor} checked={checked} type="button" role="switch" aria-checked={checked} {...props} onClick={onClick}>
    <SInner checked={checked} />
  </SSwitcher>
);
