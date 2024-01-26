import React, { useState } from 'react';
import { SSwitch, SInner, SLabel } from './CustomSwitch.styles';
import { CustomSwitchProps } from './CustomSwitch.types';

export const CustomSwitch: React.FC<CustomSwitchProps> = ({ firstLabel = '', secondLabel = '' }) => {
  const [selected, setSelected] = useState<any>(0);

  const handleToggle = (toggled?: number) => {
    setSelected(toggled);
  };

  return (
    <SSwitch>
      <SInner selected={selected === 0} onClick={() => handleToggle(0)}>
        {firstLabel && <SLabel selected={selected === 0}>{firstLabel}</SLabel>}
      </SInner>
      <SInner selected={selected === 1} onClick={() => handleToggle(1)}>
        {secondLabel && <SLabel selected={selected === 0}>{secondLabel}</SLabel>}
      </SInner>
    </SSwitch>
  );
};
