import { images } from 'assets';
import { BodyText, Title } from 'components/general/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectPolicies } from 'store/user/authentication.slice';
import { PreFilledSection } from './PreFilledSection/PreFilledSection';
import { FindEmployerSection } from './FindEmployerSection/FindEmployerSection';
import { AccountDetailsSection } from './AccountDetailsSection/AccountDetailsSection';
import { SBodyTextDT, SLayout } from './SetUpDepositPage.styles';

export const SetUpDepositPage = () => {
  const { t } = useTranslation();
  const policies = useSelector(selectPolicies);

  return (
    <SLayout>
      <div className="deposit-header">
        <div className="center-image">
          <img src={images.startDeposit} alt="Start Deposit" />
        </div>

        <Title size="M" fontWeight="M">
          {t('setUpDeposit.Title')}
        </Title>
      </div>

      <div className="options">
        {policies?.TruvEnabled && <FindEmployerSection />}
        <PreFilledSection />
      </div>
      <SBodyTextDT textType="bodyText" color="charcoal70" size="T" fontWeight="R" justifyContent="start" marginTop={20} paddingRight={10}>
        {t('setUpDeposit.automatically.TruvDescription')}
      </SBodyTextDT>

      <AccountDetailsSection />

      <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="T" marginTop={65} marginBottom={40} paddingRight={10} lineHeight={1.3}>
        {t('setUpDeposit.Disclosure')}
      </BodyText>
    </SLayout>
  );
};
