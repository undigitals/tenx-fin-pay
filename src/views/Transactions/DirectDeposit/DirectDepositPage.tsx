import React from 'react';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { DirectDepositForm } from './DirectDepositForm/DirectDepositForm';
import { SLayout } from './DirectDepositPage.style';

export const DirectDepositPage = () => {
  const { t } = useTranslation();

  return (
    <SLayout>
      <Title font="Poppins" size="M" fontWeight="SB" color="charcoal" marginBottom={35} marginTop={5}>
        {t('directDeposit.Direct Deposit')}
      </Title>

      <Title font="Poppins" size="T" fontWeight="SB" marginBottom={5}>
        {t('directDeposit.Amount per Paycheck')}
      </Title>
      <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal70" marginBottom={32} lineHeight={1.5}>
        {t('directDeposit.Please select the preferred amount you’d like deposited into your account per paycheck.')}
      </BodyText>

      <DirectDepositForm />
    </SLayout>
  );
};
