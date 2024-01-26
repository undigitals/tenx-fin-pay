import React, { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from 'styled-components';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText, Title } from 'components/general/Typography';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { useLanguage } from 'utils/hooks/useLanguage';
import { useTransferMoneyMutation } from 'store/user/accounts/accounts.api';
import { Loader } from 'components/general/Loader/Loader';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { IPartyAcctRelRecItem } from 'store/user/accounts/accounts.types';
import { getAccountNameByAuth, getFiservBalance } from 'views/Account/Summary/InternalTransfer/internalTransferHelper';
import { TransferErrorModal } from 'views/Account/Summary/InternalTransfer/InternalTransferModals/TransferErrorModal';
import { getLastFourDigitsOfAccId } from 'utils/helpers/accounts/accountsHelper';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { formatLocaleDate } from 'utils/helpers/date';
import { SSheet } from './ConfirmTransferSheet.styles';

type IConfirmTransferSheetProps = {
  isOpen: boolean;
  isErrorModalOpen: boolean;
  senderAccount: IPartyAcctRelRecItem | null;
  recipientAccount: IPartyAcctRelRecItem | null;
  transferNote: string;
  transferAmount: number;
  handleOpenErrorModal: () => void;
  handleCloseErrorModal: () => void;
  handleOpenSuccessSheet: () => void;
  onClose: () => void;
};

export const ConfirmTransferSheet = ({
  isOpen,
  isErrorModalOpen,
  senderAccount,
  recipientAccount,
  transferNote,
  transferAmount,
  onClose,
  handleOpenSuccessSheet,
  handleOpenErrorModal,
  handleCloseErrorModal,
}: IConfirmTransferSheetProps) => {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const [transferMoneyAPI, transferMoneyAPIResult] = useTransferMoneyMutation();
  const { fiservAccountsData } = useSelector(selectAccountsData);
  const { accounts } = useSelector(selectCurrentUser) || {};
  const theme = useTheme();

  const currentDate = formatLocaleDate(new Date(), 'MMM dd, yyyy', locale);
  const fromAccount = useMemo(() => accounts?.find((account) => account.fiservAccountId === senderAccount?.partyAcctRelKeys.acctKeys.acctId), [accounts, senderAccount]);
  const toAccount = useMemo(() => accounts?.find((account) => account.fiservAccountId === recipientAccount?.partyAcctRelKeys.acctKeys.acctId), [accounts, recipientAccount]);
  const fromAccountBalance = useMemo(
    () => (fromAccount?.fiservAccountId === undefined ? undefined : getFiservBalance(fiservAccountsData?.partyAcctRelRec, fromAccount.fiservAccountId)),
    [fiservAccountsData?.partyAcctRelRec, fromAccount]
  );
  const toAccountBalance = useMemo(
    () => (toAccount?.fiservAccountId === undefined ? undefined : getFiservBalance(fiservAccountsData?.partyAcctRelRec, toAccount.fiservAccountId)),
    [fiservAccountsData?.partyAcctRelRec, toAccount]
  );

  const handleConfirm = async () => {
    onClose();

    const transferData = {
      fromAccountId: senderAccount!.partyAcctRelKeys.acctKeys.acctId,
      toAccountId: recipientAccount!.partyAcctRelKeys.acctKeys.acctId,
      amount: transferAmount,
      notes: [transferNote],
      transactionId: uuidv4(),
    };

    await transferMoneyAPI(transferData);
  };

  const handleTryAgain = () => {
    handleCloseErrorModal();
    handleConfirm();
  };

  useEffect(() => {
    if (transferMoneyAPIResult?.isSuccess) {
      handleOpenSuccessSheet();
    }

    if (transferMoneyAPIResult?.isError) handleOpenErrorModal();
  }, [transferMoneyAPIResult?.isSuccess, transferMoneyAPIResult?.isError]);

  if (transferMoneyAPIResult?.isLoading) return <Loader />;

  return (
    <>
      <SSheet isOpen={isOpen} header={false} height="100%" wrapperPadding={false} onClose={onClose}>
        <CustomRow justifyContent="flex-start" marginBottom={24}>
          <Icon name="arrowLeft" color="charcoal" cursorPointer onClick={onClose} />

          <Title font="Poppins" color="charcoal" marginLeft={15} fontWeight="SB" size="sM">
            {t('internalTransfer.Confirm Transfer')}
          </Title>
        </CustomRow>

        <BodyText textType="bodyText" font="Poppins" color="charcoal" size="M" fontWeight="SB" textAlign="start">
          {t('internalTransfer.Transfer Details')}
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
              <CustomRow justifyContent="flex-end" width="70%">
                <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" extraStyles={{ whiteSpace: 'break-spaces' }}>
                  {t(`account.${getAccountNameByAuth(fromAccount)}`)}
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
              <CustomRow justifyContent="flex-end" width="70%">
                <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" extraStyles={{ whiteSpace: 'break-spaces' }}>
                  {t(`account.${getAccountNameByAuth(toAccount)}`)}
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

        <BodyText textType="bodyText" font="Poppins" color="charcoal" size="M" fontWeight="SB" textAlign="start">
          {t('internalTransfer.After Transfer')}
        </BodyText>

        <CustomCard border={`2px solid ${theme.charcoal5}`} borderRadius={20} marginTop={16} marginBottom={32}>
          <CustomRow marginBottom={27} alignItems="flex-start">
            {fromAccount && (
              <CustomRow justifyContent="flex-start" width="65%" extraStyles={{ flexWrap: 'wrap' }}>
                <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" extraStyles={{ whiteSpace: 'break-spaces' }}>
                  {t(`account.${getAccountNameByAuth(fromAccount)}`)}
                </BodyText>
                <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginLeft={5} nowrap>
                  ({getLastFourDigitsOfAccId(fiservAccountsData?.partyAcctRelRec, fromAccount.fiservAccountId)})
                </BodyText>
              </CustomRow>
            )}

            {fromAccount && fromAccountBalance !== undefined && (
              <CustomRow flexDirection="column" gap={10} alignItems="flex-end" marginLeft={20} width="35%">
                <CustomAmount size="smaller" amount={fromAccountBalance} />
                <CustomAmount size="smaller" color="red" sign amount={-transferAmount} />
                <CustomAmount size="smallerStrong" amount={fromAccountBalance - transferAmount} />
              </CustomRow>
            )}
          </CustomRow>

          <CustomRow marginBottom={27} alignItems="flex-start">
            {toAccount && (
              <CustomRow justifyContent="flex-start" width="65%" extraStyles={{ flexWrap: 'wrap' }}>
                <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" extraStyles={{ whiteSpace: 'break-spaces' }}>
                  {t(`account.${getAccountNameByAuth(toAccount)}`)}
                </BodyText>
                <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginLeft={5} nowrap>
                  ({getLastFourDigitsOfAccId(fiservAccountsData?.partyAcctRelRec, toAccount.fiservAccountId)})
                </BodyText>
              </CustomRow>
            )}

            {toAccount && toAccountBalance !== undefined && (
              <CustomRow flexDirection="column" gap={10} alignItems="flex-end" marginLeft={20} width="35%">
                <CustomAmount size="smaller" amount={toAccountBalance} />
                <CustomAmount size="smaller" color="green" sign amount={transferAmount} />
                <CustomAmount size="smallerStrong" amount={toAccountBalance + transferAmount} />
              </CustomRow>
            )}
          </CustomRow>
        </CustomCard>

        <CustomRow justifyContent="flex-end" gap={8} marginBottom={30}>
          <CustomButton onClick={onClose}>{t('internalTransfer.Cancel')}</CustomButton>
          <CustomButton preset="primary" onClick={handleConfirm}>
            {t('internalTransfer.Confirm')}
          </CustomButton>
        </CustomRow>

        <SuttonDisclaimerNote />
      </SSheet>

      <TransferErrorModal handleTryAgain={handleTryAgain} isOpen={isErrorModalOpen} handleClose={handleCloseErrorModal} />
    </>
  );
};
