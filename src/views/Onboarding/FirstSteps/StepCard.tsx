import { BodyText, Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import React from 'react';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { SStepCard } from './OnboardingFirstStepsPage.styles';

interface IStepCard {
  title: string;
  description: string;
  buttonText?: string;
  img: string;
  onClick?: () => void;
  className?: string;
}

export const StepCard: React.FC<IStepCard> = ({ title, description, buttonText, img, onClick, className }) => {
  const { isDesktopSize } = useDeviceDimension();

  return (
    <SStepCard imageUrl={img} className={className}>
      <div>
        {isDesktopSize && (
          <CustomRow marginBottom={32} justifyContent="center" height="150px">
            <img src={img} alt={title} width="120px" />
          </CustomRow>
        )}

        <Title size={isDesktopSize ? 'T' : 'sS'} fontWeight="SB" marginBottom={16} marginLeft={isDesktopSize ? 0 : 100}>
          {title}
        </Title>

        <BodyText textType="bodyText" size={isDesktopSize ? 'N' : 'T'} fontWeight="R" marginBottom={16} marginLeft={isDesktopSize ? 0 : 100} color="charcoal">
          {description}
        </BodyText>
      </div>
      {buttonText && (
        <CustomRow justifyContent={isDesktopSize ? 'center' : 'flex-end'}>
          <CustomButton size="small" preset="primary" onClick={onClick}>
            {buttonText}
          </CustomButton>
        </CustomRow>
      )}
    </SStepCard>
  );
};
