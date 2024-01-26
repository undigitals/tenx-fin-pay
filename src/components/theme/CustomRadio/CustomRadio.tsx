import { RadioProps } from 'antd';
import React from 'react';
import { SRadio } from './CustomRadio.styles';

export const CustomRadio: React.FC<RadioProps> = ({ children, ...props }) => <SRadio {...props}>{children}</SRadio>;
