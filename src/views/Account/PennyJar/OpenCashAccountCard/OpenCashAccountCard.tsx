import { BodyText, Title } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SCashAccountImage } from 'views/Main/MainPage/Accounts/OpenCashAccountCard/OpenCashAccountCard.styles';

export const OpenCashAccountCard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <CustomCard>
      <SCashAccountImage />

      <Title size="M" fontWeight="M" justifyContent="center" marginBottom={16} marginTop={32}>
        {t('pennyJar.CashAccountTitle')}
      </Title>

      <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal60" justifyContent="center">
        {t('pennyJar.CashAccountSubtitle')}
      </BodyText>
    </CustomCard>
  );
};
