import React, { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText, Title } from 'components/general/Typography';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { images } from 'assets';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { format } from 'date-fns';
import { getIconName, getFiservBalance, getAccountNameByAuth } from 'views/Account/Summary/InternalTransfer/internalTransferHelper';
import { SAccountIconContainer, SNoteContainer } from 'views/Account/Summary/InternalTransfer/InternalTransferPage.styles';
import { getLastFourDigitsOfAccId } from 'utils/helpers/accounts/accountsHelper';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { IPartyAcctRelRecItem } from 'store/user/accounts/accounts.types';

type ISuccessTransferSheetProps = {
  isOpen: boolean;
  senderAccount: IPartyAcctRelRecItem | null;
  recipientAccount: IPartyAcctRelRecItem | null;
  transferNote: string;
  transferAmount: number;
  handleTransferDone: () => void;
  processType?: string;
};

export const SuccessTransferSheet = ({ isOpen, senderAccount, recipientAccount, transferNote, transferAmount, handleTransferDone, processType }: ISuccessTransferSheetProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { fiservAccountsData } = useSelector(selectAccountsData);
  const { accounts } = useSelector(selectCurrentUser) || {};

  const currentDate = useMemo(() => format(new Date(), 'MMM dd, yyyy'), [isOpen]);
  const fromAccount = useMemo(() => accounts?.find((account) => account.fiservAccountId === senderAccount?.partyAcctRelKeys.acctKeys.acctId), [accounts, senderAccount]);
  const toAccount = useMemo(() => accounts?.find((account) => account.fiservAccountId === recipientAccount?.partyAcctRelKeys.acctKeys.acctId), [accounts, recipientAccount]);

  const fromFiservAccount = useMemo(
    () => fiservAccountsData?.partyAcctRelRec?.find((item) => item.partyAcctRelKeys.acctKeys.acctId === fromAccount?.fiservAccountId),
    [fiservAccountsData, fromAccount]
  );
  const toFiservAccount = useMemo(() => fiservAccountsData?.partyAcctRelRec?.find((item) => item.partyAcctRelKeys.acctKeys.acctId === toAccount?.fiservAccountId), [fiservAccountsData, toAccount]);

  const fromAccountNewBalance = fromAccount?.fiservAccountId === undefined ? undefined : getFiservBalance(fiservAccountsData?.partyAcctRelRec, fromAccount.fiservAccountId);
  const toAccountNewBalance = toAccount?.fiservAccountId === undefined ? undefined : getFiservBalance(fiservAccountsData?.partyAcctRelRec, toAccount.fiservAccountId);

  return (
    <CustomSheet isOpen={isOpen} header={false} height="100%" wrapperPadding={false} onClose={handleTransferDone}>
      <CustomRow marginBottom={32} flexDirection="column">
        {!processType && <img src={images.congratulation} alt="successInternalTransfer" />}

        <Title font="Poppins" color="charcoal" fontWeight="SB" size="S" marginTop={!processType ? 38 : 10} extraStyles={{ alignSelf: 'flex-start' }}>
          {t('internalTransfer.Transfer Successful')}
        </Title>
      </CustomRow>

      <BodyText textType="bodyText" font="Poppins" color="charcoal" size="M" fontWeight="SB" textAlign="start">
        {t('internalTransfer.Transaction Receipt')}
      </BodyText>

      <CustomCard border={`2px solid ${theme.charcoal5}`} borderRadius={20} marginTop={16} marginBottom={32}>
        <CustomRow marginBottom={27}>
          <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
            {t('internalTransfer.Amount Transferred')}
          </BodyText>
          <CustomAmount size="smallerStrong" amount={transferAmount} />
        </CustomRow>

        <CustomRow marginBottom={27}>
          <CustomRow width="30%">
            <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginRight={10}>
              {t('internalTransfer.Account from')}
            </BodyText>
          </CustomRow>

          {fromAccount && (
            <CustomRow justifyContent="flex-end" width="70%" extraStyles={{ flexWrap: 'wrap' }}>
              <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" extraStyles={{ whiteSpace: 'break-spaces' }}>
                {getAccountNameByAuth(fromAccount)}
              </BodyText>
              <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginLeft={5} nowrap>
                ({getLastFourDigitsOfAccId(fiservAccountsData?.partyAcctRelRec, fromAccount.fiservAccountId)})
              </BodyText>
            </CustomRow>
          )}
        </CustomRow>

        <CustomRow marginBottom={27}>
          <CustomRow width="30%">
            <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginRight={10}>
              {t('internalTransfer.Account to')}
            </BodyText>
          </CustomRow>

          {toAccount && (
            <CustomRow justifyContent="flex-end" width="70%" extraStyles={{ flexWrap: 'wrap' }}>
              <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" extraStyles={{ whiteSpace: 'break-spaces' }}>
                {getAccountNameByAuth(toAccount)}
              </BodyText>
              <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginLeft={5} nowrap>
                ({getLastFourDigitsOfAccId(fiservAccountsData?.partyAcctRelRec, toAccount.fiservAccountId)})
              </BodyText>
            </CustomRow>
          )}
        </CustomRow>

        <CustomRow>
          <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
            {t('internalTransfer.Date')}
          </BodyText>
          <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B">
            {currentDate}
          </BodyText>
        </CustomRow>
      </CustomCard>

      <BodyText textType="bodyText" font="Poppins" color="charcoal" size="M" fontWeight="SB" textAlign="start" marginBottom={16}>
        {t('internalTransfer.Note')}
      </BodyText>

      <SNoteContainer>
        <BodyText textType="bodyText" color="charcoal40" size="T" fontWeight="R">
          {transferNote}
        </BodyText>
      </SNoteContainer>

      <BodyText textType="bodyText" font="Poppins" color="charcoal" size="M" fontWeight="SB" textAlign="start" marginTop={32}>
        {t('internalTransfer.New Balances')}
      </BodyText>

      <CustomCard border={`2px solid ${theme.charcoal5}`} borderRadius={20} marginTop={16} marginBottom={32}>
        {fromAccount && fromFiservAccount && (
          <CustomRow marginBottom={14}>
            <CustomRow justifyContent="flex-start">
              <SAccountIconContainer>
                <Icon name={getIconName(fromFiservAccount)} color="orange" />
              </SAccountIconContainer>
              <CustomRow flexDirection="column" alignItems="flex-start">
                <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginLeft={12} extraStyles={{ whiteSpace: 'break-spaces' }}>
                  {getAccountNameByAuth(fromAccount)}
                </BodyText>
                <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginLeft={12} nowrap>
                  ({getLastFourDigitsOfAccId(fiservAccountsData?.partyAcctRelRec, fromAccount.fiservAccountId)})
                </BodyText>
              </CustomRow>
            </CustomRow>
            {fromAccountNewBalance !== undefined && <CustomAmount size="smallerStrong" amount={fromAccountNewBalance} />}
          </CustomRow>
        )}
        {toAccount && toFiservAccount && (
          <CustomRow>
            <CustomRow justifyContent="flex-start">
              <SAccountIconContainer>
                <Icon name={getIconName(toFiservAccount)} color="orange" />
              </SAccountIconContainer>
              <CustomRow flexDirection="column" alignItems="flex-start">
                <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginLeft={12} extraStyles={{ whiteSpace: 'break-spaces' }}>
                  {getAccountNameByAuth(toAccount)}
                </BodyText>
                <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginLeft={12} nowrap>
                  ({getLastFourDigitsOfAccId(fiservAccountsData?.partyAcctRelRec, toAccount.fiservAccountId)})
                </BodyText>
              </CustomRow>
            </CustomRow>
            {toAccountNewBalance !== undefined && <CustomAmount size="smallerStrong" amount={toAccountNewBalance} />}
          </CustomRow>
        )}
      </CustomCard>

      <CustomButton preset="primary" onClick={handleTransferDone} marginTop={24} marginBottom={32}>
        {t('internalTransfer.Done')}
      </CustomButton>

      <SuttonDisclaimerNote />
    </CustomSheet>
  );
};
