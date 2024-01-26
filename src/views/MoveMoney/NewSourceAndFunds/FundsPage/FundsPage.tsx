import React, { useState, useEffect, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'utils/hooks/store';
import { useToggle } from 'utils/hooks/useToggle';
import { Icon } from 'components/general/Icon/Icon';
import { useTransferToExternalAccountMutation, useTransferFromExternalAccountMutation, useLazyGetRiskSessionQuery } from 'store/ingo/ingo.api';
import { setShowAdditionalInformationModal } from 'store/ui.slice';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { getThirdPatryAccountById } from 'utils/helpers/accounts/accountsHelper';
import { CashAccountCard } from 'views/MoveMoney/NewSourceAndFunds/CashAccountCard/CashAccountCard';
import { FundCard } from 'views/MoveMoney/NewSourceAndFunds/FundCard/FundCard';
import { BodyText, Title } from 'components/general/Typography';
import { TransferSuccessSheet } from 'components/general/Modals/FundTransferModal/TransferSuccessSheet';
import { TransferConfirmationSheet } from 'components/general/Modals/FundConfirmationModal/TransferConfirmationSheet';
import { useAccounts } from 'utils/hooks/useAccounts';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { Loader } from 'components/general/Loader/Loader';

import clsx from 'clsx';
import { SLink } from 'views/HelpAndSupport/HelpAndSupport.styles';
import { ConsentSheet } from 'components/general/Consent/ConsentSheet';
import { useConsents } from 'utils/hooks/useConsents';
import { ConsentType } from 'components/general/Consent/Consents.types';
import { AMOUNT_LIMITS } from 'vars/const/AMOUNT_LIMITS';
import { ISendFunds, IFundsPageProps } from './FundsPage.type';
import { TransferErrorModal } from './TransferErrorModal';
import { SBtn, SIcon } from './FundsPage.style';
import { AddNoteSheet } from './AddNoteSheet/AddNoteSheet';
import { AmountCard } from './AmountCard/AmountCard';
import { InfoModal } from './InfoModal/InfoModal';

const HEAD_TEXTS = {
  ADD: {
    TITLE: 'moveMoney.ExternalAccountTransfer',
    SUBTITLE: 'moveMoney.AddMoneyFromExternalAccount',
  },
  SEND: {
    TITLE: 'moveMoney.ExternalAccountTransfer',
    SUBTITLE: 'moveMoney.SendMoneyToExternalAccount',
  },
};

const INGO_LIMIT_ERRORS_CODE = [603, 711, 712, 713, 714, 715, 716];
const INGO_DECLINE_ERRORS_CODE = [710, 851, 852, 853, 854, 856, 857, 858, 859, 860, 862, 863, 864, 865];

export const FundsPage: React.FC<IFundsPageProps> = ({ isSendType = false }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { cashAccounts, isLoading: areAccountsLoading } = useAccounts();
  const [transferToExternalAccountAPI, transferToExternalAccountAPIResult] = useTransferToExternalAccountMutation();
  const [transferFromExternalAccountAPI, transferFromExternalAccountAPIResult] = useTransferFromExternalAccountMutation();
  const [getRiskSession, getRiskSessionResult] = useLazyGetRiskSessionQuery();
  const isLoading =
    transferToExternalAccountAPIResult.isLoading || transferFromExternalAccountAPIResult.isLoading || getRiskSessionResult.isLoading || getRiskSessionResult.isFetching || areAccountsLoading;
  const isTransferSuccess = transferToExternalAccountAPIResult.isSuccess || transferFromExternalAccountAPIResult.isSuccess;
  const { thirdPartyData } = useSelector(selectAccountsData);
  const { risk_session_token: riskSessionToken } = getRiskSessionResult?.data?.session ?? {};
  const transactionIdRef = useRef('');
  const location = useLocation() as ISendFunds;
  const transferConfirmModal = useToggle();
  const infoModal = useToggle();
  const transferSuccessModal = useToggle();
  const transferErrorModal = useToggle(false, { message: '', title: '', isIngoError: false } as { message: string | React.ReactElement; title: string; isIngoError: boolean });
  const addNoteSheet = useToggle(false);
  const { consentsData } = useConsents(ConsentType.SUTTON);
  const disclosureSheet = useToggle();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isLowBalance, setIsLowBalance] = useState(false);
  const [isMinLimitError, setIsMinLimitError] = useState(false);
  const [isMaxLimitError, setIsMaxLimitError] = useState(false);
  const [selectedExternalAccountId, setSelectedExternalAccountId] = useState(location?.state?.selectedExternalAccountId || '');
  const [selectedAccountId, setSelectedAccountId] = useState(cashAccounts[0]?.accountId);
  const selectedAccount = useMemo(() => cashAccounts.find((account) => account.accountId === selectedAccountId), [selectedAccountId, cashAccounts]);
  const thirdPartyAccount = useMemo(() => getThirdPatryAccountById(thirdPartyData, selectedExternalAccountId), [thirdPartyData, selectedExternalAccountId]);
  const isBtnDisabled = !selectedExternalAccountId || !selectedAccount?.type || isMinLimitError || isMaxLimitError || isLowBalance;

  const validateLimits = (value: number, balance = 0) => {
    if (isSendType) {
      setIsLowBalance(value > balance);
    }
    setIsMaxLimitError(value > AMOUNT_LIMITS.SINGLE_MAX);
    setIsMinLimitError(value < 0 || value < AMOUNT_LIMITS.SINGLE_MIN);
  };

  const openConsent = () => {
    transferErrorModal.hide();
    disclosureSheet.show();
  };

  const handleTransferError = (error: any) => {
    if (INGO_DECLINE_ERRORS_CODE.includes(error.data.Data.status)) {
      transferErrorModal.setData({
        message: t(`moveMoney.ThisTransactionWasDeclined`),
        title: t(`moveMoney.TransactionDeclined`),
        isIngoError: true,
      });
    } else if (INGO_LIMIT_ERRORS_CODE.includes(error.data.Data.status)) {
      transferErrorModal.setData({
        message: <Trans i18nKey="moveMoney.SorryForTheInconvenience" components={{ Link: <SLink onClick={openConsent} /> }} />,
        title: t(`moveMoney.TransactionLimitExceeded`),
        isIngoError: true,
      });
    } else {
      transferErrorModal.setData({
        message: t(`moveMoney.SorryWeAreUnableToCompleteThisTransaction`),
        title: t(`moveMoney.TransferIncomplete`),
        isIngoError: true,
      });
    }
    transferErrorModal.show();
  };

  const handleOpenConfirmSheet = async () => {
    await getRiskSession();
    transactionIdRef.current = uuidv4();
    transferConfirmModal.show();
  };

  const handleNoteAdded = (savedNote: string) => {
    setNote(savedNote);
  };

  const handleConfirm = () => {
    const externalAccount = getThirdPatryAccountById(thirdPartyData, selectedExternalAccountId);
    const requestBody = {
      accountId: selectedAccountId,
      externalAccount: externalAccount?.thirdPartyAccountId,
      accountType: externalAccount?.thirdPartyAccountType,
      amount: Number(amount),
      notes: note ? [note] : [],
      transactionId: transactionIdRef.current,
      riskSessionToken,
    };
    if (isSendType) {
      transferToExternalAccountAPI(requestBody)
        .unwrap()
        .then(() => {
          transferSuccessModal.show();
        })
        .catch((error) => {
          handleTransferError(error);
        });
    } else {
      transferFromExternalAccountAPI(requestBody)
        .unwrap()
        .then(() => {
          transferSuccessModal.show();
        })
        .catch((error) => {
          handleTransferError(error);
        });
    }

    transferConfirmModal.hide();
  };

  const handleAmountChange = (val: string) => {
    const valueNum = Number(val);
    validateLimits(valueNum, selectedAccount?.balance);
    setAmount(val);
  };

  const handleAvailableClick = () => {
    dispatch(
      setShowAdditionalInformationModal({
        displayAdditionalInformationModal: true,
        additionalInformationModalType: 'externalAvailable',
      })
    );
  };

  const handleInfoClick = () => {
    infoModal.show();
  };

  useEffect(() => {
    if (amount.length) {
      validateLimits(Number(amount), selectedAccount?.balance);
    }
  }, [amount, selectedAccount]);

  useEffect(() => {
    if (isTransferSuccess) {
      transferSuccessModal.show();
    }
  }, [isTransferSuccess]);

  return (
    <>
      {isLoading && <Loader />}
      <Title size="S" fontWeight="SB" font="Poppins" marginBottom={12}>
        {t(isSendType ? HEAD_TEXTS.SEND.TITLE : HEAD_TEXTS.ADD.TITLE)}
      </Title>
      <BodyText textType="bodyText" color="charcoal70" fontWeight="R" font="DM Sans" size="M" marginBottom={16}>
        {t(isSendType ? HEAD_TEXTS.SEND.SUBTITLE : HEAD_TEXTS.ADD.SUBTITLE)}
      </BodyText>

      <Title size="sS" fontWeight="SB" font="Poppins" marginBottom={15} marginTop={15}>
        {t('externalTransfer.From')}
      </Title>
      {isSendType ? (
        <CashAccountCard items={cashAccounts} onSelect={setSelectedAccountId} selectedAccount={selectedAccount} modalTitle={t('moveMoney.TransferMoneyFrom')} />
      ) : (
        <FundCard items={thirdPartyData} onSelect={setSelectedExternalAccountId} selected={selectedExternalAccountId} modalTitle={t('externalTransfer.AddFundsFrom')} />
      )}

      <Title size="sS" fontWeight="SB" font="Poppins" marginBottom={15} marginTop={33}>
        {t('externalTransfer.To')}
      </Title>
      {isSendType ? (
        <FundCard items={thirdPartyData} onSelect={setSelectedExternalAccountId} selected={selectedExternalAccountId} modalTitle={t('moveMoney.TransferMoneyTo')} />
      ) : (
        <CashAccountCard items={cashAccounts} onSelect={setSelectedAccountId} selectedAccount={selectedAccount} modalTitle={t('externalTransfer.AddFundsTo')} />
      )}

      <CustomRow justifyContent="space-between" marginTop={35} marginBottom={10}>
        <CustomRow justifyContent="flex-start">
          <Title size="sS" fontWeight="SB" font="Poppins" marginRight={6}>
            {t('externalTransfer.EnterAmount')}
          </Title>
          <Icon color="blue" name="circleInfo" size="smallest" onClick={handleInfoClick} cursorPointer />
        </CustomRow>
        <SBtn size="middle" onClick={addNoteSheet.show}>
          {t('externalTransfer.AddNote')} <SIcon name="chat" size="small" color="blue" marginLeft={5} />
        </SBtn>
      </CustomRow>

      <AmountCard amount={amount} handleAmountChange={handleAmountChange} wrapperClassName={clsx(isMinLimitError || isMaxLimitError || (isLowBalance && isSendType && 'error'))} />

      <CustomRow justifyContent="flex-start" marginTop={16} onClick={handleAvailableClick}>
        <SBtn size="middle">{t('externalTransfer.WhenAvailable')}</SBtn>
      </CustomRow>

      {(isMaxLimitError || isMinLimitError || isLowBalance) && (
        <BodyText marginTop={10} textType="errorText" display="flex" textAlign="start" size="S" fontWeight="R" color="red">
          {isLowBalance && !isMaxLimitError ? t('moveMoney.InsufficientBalance') : t(isMaxLimitError ? 'moveMoney.AmountMax' : 'moveMoney.AmountBelowTheMin')}
        </BodyText>
      )}

      <CustomRow marginTop={90} marginBottom={24}>
        <CustomButton preset="primary" type="submit" disabled={isBtnDisabled} onClick={handleOpenConfirmSheet}>
          {t('externalTransfer.Continue')}
        </CustomButton>
      </CustomRow>

      <TransferConfirmationSheet
        isOpen={transferConfirmModal.isActive}
        onClose={transferConfirmModal.hide}
        amountTransferred={Number(amount)}
        onConfirm={handleConfirm}
        isSendType={isSendType}
        thirdPartyAccount={thirdPartyAccount}
        tenxAccount={selectedAccount}
        fingerPrintData={getRiskSessionResult.data}
      />

      <TransferSuccessSheet
        isOpen={transferSuccessModal.isActive}
        handleClose={transferSuccessModal.hide}
        thirdPartyAccount={thirdPartyAccount}
        tenxAccount={selectedAccount}
        amountTransferred={Number(amount)}
        isSendType={isSendType}
      />

      <TransferErrorModal
        isOpen={transferErrorModal.isActive}
        errorData={transferErrorModal.data}
        handleClose={transferErrorModal.hide}
        handleCloseConfirmationModal={transferConfirmModal.hide}
        isSendType={isSendType}
      />

      <AddNoteSheet isOpen={addNoteSheet.isActive} onClose={addNoteSheet.hide} handleNoteAdded={handleNoteAdded} />

      <CustomRow marginBottom={30}>
        <SuttonDisclaimerNote />
      </CustomRow>

      {consentsData?.map((disclosure) => (
        <ConsentSheet key={disclosure.id} consentData={disclosure} isOpen={disclosureSheet.isActive} onClose={disclosureSheet.hide} isReadonly />
      ))}

      <InfoModal isModalVisible={infoModal.isActive} handleOnCancel={infoModal.hide} />
    </>
  );
};
