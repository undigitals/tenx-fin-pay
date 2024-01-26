import React from 'react';
import clsx from 'clsx';
import { Icon } from './Icon';
import { IIconSignProps } from './Icon.types';
import { SIconSign } from './Icon.styles';

export const IconSign = ({ className, iconName, iconColor = 'charcoal', bgColor = 'white' }: IIconSignProps) => (
  <SIconSign bgColor={bgColor} className={clsx('icon-sign', className)}>
    <Icon name={iconName} color={iconColor} />
  </SIconSign>
);
