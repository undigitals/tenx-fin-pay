import React from 'react';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { SContainer, SInnerCircle, SLine, SOuterCircle, SIcon } from './StepBar.styles';

interface IStepBarProps {
  stepNumber: number;
  isLast?: boolean;
  isDone?: boolean;
  isFailed?: boolean;
}

export const StepBar: React.FC<IStepBarProps> = ({ stepNumber, isLast = false, isDone = false, isFailed = false }) => {
  const stepBgColor = (isDone && 'green') || (isFailed && 'red') || 'white';

  return (
    <SContainer isLast={isLast}>
      <SOuterCircle isFailed={isFailed}>
        <SInnerCircle bgColor={stepBgColor}>
          <CustomText size="small" fontWeight="strong">
            {!isDone && !isFailed && stepNumber}
            {isDone && <SIcon name="checked" color="white" />}
            {isFailed && <SIcon name="close" color="white" />}
          </CustomText>
        </SInnerCircle>
      </SOuterCircle>
      {!isLast && <SLine />}
    </SContainer>
  );
};
