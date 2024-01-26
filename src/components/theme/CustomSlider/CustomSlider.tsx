import { SliderSingleProps } from 'antd';
import React from 'react';
import { SSlider } from './CustomSlider.styles';

export const CustomSlider: React.FC<SliderSingleProps> = ({ ...props }) => <SSlider {...props} />;
