import React from 'react';
import { BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IAccountItem } from 'store/user/accounts/accounts.types';
import { selectCurrentAuthState } from 'store/user/authentication.slice';
import { DataListItem } from 'views/Account/AccountInformation/DataListItem/DataListItem';
import { SDetailsWrapper } from 'views/Transactions/DirectDeposit/SetUpDeposit/SetUpDepositPage.styles';

export const AccountDetailsSection = () => {
  const { t } = useTranslation();
  const { systemProperties } = useSelector(selectCurrentAuthState);
  const { user } = useSelector(selectCurrentAuthState);
  const cashAccountNumber = user?.accounts?.find((account: IAccountItem) => account.owner && account.type === 'Cash')?.fiservAccountId ?? '';

  return (
    <SDetailsWrapper>
      <div className="details-header">
        <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="B" justifyContent="start" marginBottom={16} marginTop={32}>
          {t('setUpDeposit.accountDetails.Title')}
        </BodyText>

        <BodyText textType="bodyText" color="charcoal70" size="T" fontWeight="R" justifyContent="start" marginBottom={20}>
          {t('setUpDeposit.accountDetails.Description')}
        </BodyText>
      </div>

      <CustomCard className="data-list">
        <DataListItem title={t('setUpDeposit.accountDetails.RoutingNumber')} number={systemProperties?.routingNumber || ''} tooltip="routingNumber" />
        <DataListItem title={t('setUpDeposit.accountDetails.CashAccountNumber')} number={cashAccountNumber} tooltip="accountNumber" isLast />
      </CustomCard>
    </SDetailsWrapper>
  );
};
