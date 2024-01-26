import React from 'react';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';
import { SOnboardingItemCard, STextContainer } from 'views/Onboarding/OnboardingItems/OnboardingItem.styles';
import { useTranslation } from 'react-i18next';
import { SFinancialWellnessImage } from './FinancialWellness.styles';

export const FinancialWellness: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SOnboardingItemCard>
      <SFinancialWellnessImage />
      <STextContainer>
        <CustomTitle size="bigger" fontWeight="light" marginBottom="normal" lineHeight={1.5}>
          {t("preRegOnboarding.We'd love to show you around!")}
        </CustomTitle>
        <CustomText size="bigger" fontWeight="normal" lineHeight={1.5}>
          {t('preRegOnboarding.Using our app, learn how we can help you achieve')}
          <CustomText size="bigger" fontWeight="stronger" lineHeight="30px">
            {t('preRegOnboarding.financial wellness.')}
          </CustomText>
        </CustomText>
      </STextContainer>
    </SOnboardingItemCard>
  );
};
