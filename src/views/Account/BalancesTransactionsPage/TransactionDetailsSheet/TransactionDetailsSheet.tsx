import React, { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText, Title } from 'components/general/Typography';
import { useLanguage } from 'utils/hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { useCurrencyFormat } from 'utils/hooks/useCurrencyFormat';
import { ITransactionDetailsSheet } from 'views/Account/BalancesTransactionsPage/BalancesTransactionsPage.types';
import { Sign } from 'views/Account/BalancesTransactionsPage/Sign';
import { STitleContainer } from './TransactionDetailsSheet.styles';

export const TransactionDetailsSheet: React.FC<ITransactionDetailsSheet> = ({ isOpen, transaction, onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { locale } = useLanguage();
  const { formatAutoSign } = useCurrencyFormat();

  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  }, [locale]);

  return (
    <CustomSheet isOpen={isOpen} header={false} wrapperPadding={false} onClose={onClose}>
      <STitleContainer>
        <Title font="Poppins" color={transaction?.acctTrnInfo.drCrType === 'Debit' ? 'red' : 'green'} fontWeight="SB" size="L">
          {transaction?.acctTrnInfo.drCrType === 'Debit' ? '- ' : '+ '}
          {formatAutoSign(transaction?.acctTrnInfo?.trnAmt?.amt)}
        </Title>
        <Sign type={transaction?.acctTrnInfo.drCrType === 'Debit' ? 'expense' : 'income'} />
      </STitleContainer>
      <CustomRow marginBottom={32} justifyContent="space-between">
        <Title font="Poppins" color="charcoal" fontWeight="SB" size="sL">
          {transaction?.acctTrnInfo?.desc[0]}
        </Title>
        <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
          {t('accountInformation.DebitCardPurchase')}
        </BodyText>
      </CustomRow>
      <CustomCard border={`2px solid ${theme.charcoal5}`} borderRadius={20} marginTop={16} marginBottom={32}>
        <CustomRow marginBottom={24} justifyContent="space-between">
          <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R">
            {t('accountInformation.Status')}
          </BodyText>
          <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B">
            {transaction?.acctTrnStatus?.acctTrnStatusCode}
          </BodyText>
        </CustomRow>
        <CustomRow marginBottom={24} justifyContent="space-between">
          <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R">
            {t('accountInformation.TransactionDate')}
          </BodyText>
          <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B">
            {transaction?.acctTrnInfo?.trnDt && dateFormatter.format(new Date(transaction.acctTrnInfo.trnDt))}
          </BodyText>
        </CustomRow>
        <CustomRow justifyContent="space-between" alignItems="start">
          <CustomRow flexDirection="column" alignItems="start" justifyContent="space-between" width="60%">
            <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginBottom={8}>
              {t('accountInformation.PostedDate')}
            </BodyText>
            <BodyText textType="bodyText" color="charcoal70" size="T" fontWeight="R">
              {t('accountInformation.ThePostDateDescription')}
            </BodyText>
          </CustomRow>
          <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B">
            {transaction?.acctTrnInfo?.postedDt && dateFormatter.format(new Date(transaction.acctTrnInfo.postedDt))}
          </BodyText>
        </CustomRow>
      </CustomCard>
    </CustomSheet>
  );
};
