import React from 'react';
import { SCustomRadioButtonsGroup } from './CustomRadioButtonsGroup.styles';

interface ICustomRadioButtonsProps {
  children: React.ReactNode;
}

export const CustomRadioButtonsGroup: React.FC<ICustomRadioButtonsProps> = ({ children }) => <SCustomRadioButtonsGroup>{children}</SCustomRadioButtonsGroup>;
