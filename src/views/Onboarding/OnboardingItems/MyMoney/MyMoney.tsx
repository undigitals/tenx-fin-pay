import React from 'react';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';
import { SOnboardingItemCard, STextContainer } from 'views/Onboarding/OnboardingItems/OnboardingItem.styles';
import { useTranslation } from 'react-i18next';
import { SMyMoneyImage } from './MyMoney.styles';

export const MyMoney: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SOnboardingItemCard>
      <SMyMoneyImage />
      <STextContainer>
        <CustomTitle size="bigger" fontWeight="light" marginBottom="normal" lineHeight={1.5}>
          {t('preRegOnboarding.Start with MyMoney Journey')}
        </CustomTitle>
        <CustomText size="bigger" fontWeight="normal" lineHeight={1.5}>
          This 3-minute quiz will tell you areas where you&apos;re already doing well with your money and where you might want to focus.
        </CustomText>
      </STextContainer>
    </SOnboardingItemCard>
  );
};
