import React, { useState } from 'react';
import { SSwitch, SInner } from './CustomCheckSwitch.styles';
import { CustomCheckSwitchProps } from './CustomCheckSwitch.types';

export const CustomCheckSwitch: React.FC<CustomCheckSwitchProps> = ({ checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChecked = () => {
    const updatedState = !isChecked;
    setIsChecked(updatedState);
    onChange?.(updatedState);
  };

  return (
    <SSwitch checked={isChecked} onClick={() => handleChecked()}>
      <SInner selected={!isChecked} checked={isChecked} />
      <SInner selected={isChecked} checked={isChecked} />
    </SSwitch>
  );
};
