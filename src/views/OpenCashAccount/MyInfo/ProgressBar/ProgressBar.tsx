import React from 'react';
import { STAGES } from 'views/OpenCashAccount/MyInfo/MyInfo.constants';
import { Stepper } from 'components/general/Stepper/Stepper';
import { ProgressBarInputProps } from './ProgressBar.type';

export const ProgressBar: React.FC<ProgressBarInputProps> = ({ stage }) => {
  const activeIndex = STAGES.indexOf(stage);

  const steps = stage === 'Join Accountholder' ? STAGES.slice(0, activeIndex + 1) : STAGES;

  return <Stepper currentStep={activeIndex} steps={steps} />;
};
