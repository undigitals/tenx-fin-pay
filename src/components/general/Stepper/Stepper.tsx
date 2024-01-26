import React from 'react';
import { TThemeColor } from 'styles/theme';
import { SBar, SBlockWrapper, SContainer } from './Stepper.styles';

export interface IStepper {
  steps: string[];
  currentStep: number;
  passedColor?: TThemeColor;
  activeColor?: TThemeColor;
  inactiveColor?: TThemeColor;
}

export const Stepper: React.FC<IStepper> = ({ steps, currentStep = 0, passedColor = 'green', activeColor = 'blue', inactiveColor = 'creamS10' }) => {
  const getBarColor = (index: number): TThemeColor => {
    if (currentStep === index) {
      return activeColor;
    }

    return currentStep > index ? passedColor : inactiveColor;
  };

  return (
    <SContainer>
      {steps.map((step, index) => {
        return (
          <SBlockWrapper>
            <SBar bgColor={getBarColor(index)} />
          </SBlockWrapper>
        );
      })}
    </SContainer>
  );
};
