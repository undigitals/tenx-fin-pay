import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from 'components/general/Icon/Icon';
import { Loader } from 'components/general/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { API_ROUTES } from 'vars/const/API_ROUTES';
import { useSelector } from 'react-redux';
import { usePayments } from 'utils/hooks/usePayments';
import { useToggle } from 'utils/hooks/useToggle';
import { selectDisplayTenxPayModal, setHeaderTitle, setShowTenxPayModal } from 'store/ui.slice';
import { paymentsApi } from 'store/user/payments/payments.api';
import { clearPaymentStatus, selectPaymentsAccountsData, setSelectedAccount } from 'store/user/payments/payments.slice';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { useLazyGetImmediatePayFrameUrlQuery, useLazyGetWalletAccountsQuery } from 'store/user/accounts/accounts.api';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { PaymentPrepareSheet } from 'views/TenxPay/PaymentRequest/PaymentPrepareSheet';
import { PaymentRequestSheet } from 'views/TenxPay/PaymentRequest/PaymentRequestSheet';
import { PaymentErrorModal } from 'views/TenxPay/PaymentRequest/PaymentErrorModal';
import { TenxPayMain } from 'components/general/TenxPayMain/TenxPayMain';
import { useAppDispatch } from 'utils/hooks/store';
import { useTranslation } from 'react-i18next';
import { PaymentSuccessModal } from 'views/TenxPay/PaymentRequest/PaymentSuccessModal';
import { BodyText, Title } from 'components/general/Typography';
import { useLazyGetImmediateConsentsQuery, useUpdateConsentByPolicyMutation, useLazyGetEulaPolicyQuery } from 'store/user/users.api';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { TransferItem } from './components/TransferItem/TransferItem';
import { SLayout, SBlock, SIFrame, SIframeCloseButton, STransferBlock, SCustomButton } from './Home.styles';

export const HomePage = () => {
  const { t } = useTranslation();
  const [policyId, setPolicyId] = useState('');
  const [policyText, setPolicyText] = useState('');
  const [isCheckboxAgreed, setIsCheckboxAgreed] = useState(false);
  const [isPaymentRequestSheetStillOpen, setIsPaymentRequestSheetStillOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const dispatch = useAppDispatch();
  const { displayTenxPayModal, tenxPayModalType } = useSelector(selectDisplayTenxPayModal);
  const { immediatePayFrameUrl } = useSelector(selectAccountsData);
  const { paymentsInfo, getPaymentsInfoQueryResult } = usePayments();
  const iframeModal = useToggle();
  const prepareSheet = useToggle();
  const reviewSheet = useToggle();
  const termsSheet = useToggle();
  const navigate = useNavigate();
  const [preparePayment, preparePaymentResult] = paymentsApi.usePreparePaymentMutation();
  const [requestPayment, requestPaymentResult] = paymentsApi.useRequestPaymentMutation();
  const getAccountsQuery = paymentsApi.useGetPaymentAccountsQuery();
  const [getWalletAccounts] = useLazyGetWalletAccountsQuery();
  const [getImmediateConsents] = useLazyGetImmediateConsentsQuery();
  const [getEulaPolicyAPI, { isFetching: isEulaPolicyFetching }] = useLazyGetEulaPolicyQuery();
  const [updateConsentAPI] = useUpdateConsentByPolicyMutation();
  const [getImmediatePayFrameUrl] = useLazyGetImmediatePayFrameUrlQuery();

  const {
    accountId,
    additionalData,
    amountSelected,
    amountToTransfer,
    checkDate,
    checkSum,
    deliveryPeriod,
    estimatedDate,
    fee,
    feePayer,
    holiday,
    paymentType,
    pushUserId,
    selectedAccount,
    hasError,
    paymentSucceed,
    accounts,
    uuid,
  } = useSelector(selectPaymentsAccountsData);

  const handleAcceptTerms = async () => {
    await updateConsentAPI(policyId);
    termsSheet.hide();
  };

  const getEulaPolicy = async () => {
    const policy = await getEulaPolicyAPI().unwrap();
    console.log(`${API_ROUTES.immediate.eulaPolicies} response: ${policy}`);
    setPolicyText(policy.text);
    setPolicyId(policy.id);
  };

  const getConsents = async () => {
    const immediateConsents = await getImmediateConsents().unwrap();
    if (immediateConsents?.hasActiveConsents === false) {
      getEulaPolicy();
      termsSheet.show();
    }
  };

  const handleChangeAgree = () => {
    setIsCheckboxAgreed((preVal) => !preVal);
  };

  useEffect(() => {
    setPaymentAmount(Number(paymentsInfo.availableNow));
  }, [paymentsInfo]);

  const maxPayPeriodTransactionsCount = Number(paymentsInfo.maxPayPeriodTransactionsCount);
  const transfersAvailable = Number(paymentsInfo.transfersAvailable);
  const earnedThisCycle = Number(paymentsInfo.earnedThisCycle);
  const isActive = earnedThisCycle > 0;
  const completedTransfers = paymentsInfo?.transferredAmount > 0 ? maxPayPeriodTransactionsCount - transfersAvailable : 0;

  const handleViewHistoryClick = () => {
    navigate(ROUTES.tenxPayHistory.path, { state: 2 });
  };

  const handleAddAccountClick = useCallback(() => {
    if (!immediatePayFrameUrl) return;
    prepareSheet.hide();
    iframeModal.show();
  }, [immediatePayFrameUrl]);

  const handleInfoClick = () => {
    dispatch(setShowTenxPayModal({ displayTenxPayModal: true, tenxPayModalType: 'payPeriod' }));
  };

  const handleRequestPayment = () => {
    const body = {
      accountId,
      additionalData,
      amountSelected,
      amountToTransfer,
      checkDate,
      checkSum,
      deliveryPeriod,
      estimatedDate,
      fee,
      feePayer,
      holiday,
      paymentType,
      pushUserId,
      uuid,
      transactionId: uuidv4(),
    };

    requestPayment(body);
  };

  const handleCloseStatusModal = () => {
    prepareSheet.hide();
    dispatch(clearPaymentStatus());
  };

  const handleCloseIframe = () => {
    iframeModal.hide();
    prepareSheet.show();
    getAccountsQuery.refetch();
  };

  const handleTransferHistory = () => {
    navigate(ROUTES.tenxPayHistory.path, { state: 2 });
    dispatch(clearPaymentStatus());
  };

  const accountInfo = useMemo(
    // @ts-ignore
    () => {
      const { accountType, details, alias } = accounts?.find((acc: any) => acc.id === selectedAccount) ?? {};
      return { accountType, details, alias };
    },
    [accounts, selectedAccount]
  );

  const handlePrepareConfirm = (transferAmount: number) => {
    if (transferAmount > 0) {
      reviewSheet.show();
      setPaymentAmount(transferAmount);
      preparePayment({ accountId: selectedAccount, amount: transferAmount });
    }
  };

  const closePaymentSheets = () => {
    prepareSheet.hide();
    reviewSheet.hide();
  };

  useEffect(() => {
    if (requestPaymentResult.isError || requestPaymentResult.isSuccess) {
      reviewSheet.hide();
    }
  }, [requestPaymentResult.isError, requestPaymentResult.isSuccess]);

  useEffect(() => {
    if (preparePaymentResult.isError || hasError || paymentSucceed) {
      prepareSheet.hide();
    }
  }, [paymentSucceed, hasError, preparePaymentResult.isError]);

  useEffect(() => {
    if (selectedAccount !== null) {
      if (paymentAmount > 0) {
        preparePayment({ accountId: selectedAccount, amount: paymentAmount });
      }
    }
  }, [selectedAccount, paymentAmount]);

  const handleSelectAccount = (id: number) => {
    dispatch(setSelectedAccount(id));
  };

  useEffect(() => {
    if (typeof tenxPayModalType === 'undefined' && isPaymentRequestSheetStillOpen) {
      prepareSheet.show();
      reviewSheet.show();
    }
  }, [displayTenxPayModal, tenxPayModalType]);

  useEffect(() => {
    dispatch(setHeaderTitle('Tenx Pay'));
    getImmediatePayFrameUrl();
    getWalletAccounts();
    getConsents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SLayout>
      <Title marginBottom={32}>{t('tenxPayHome.Tenx Pay')}</Title>
      {getPaymentsInfoQueryResult?.isSuccess && (
        <SBlock>
          <TenxPayMain
            isActive={isActive}
            primaryButtonText={t('tenxPayHome.Request Pay')}
            secondaryButtonText={t('tenxPayHome.See Time Card')}
            onPrimaryButtonClick={prepareSheet.show}
            canDisablePrimaryButton
          />
          <STransferBlock>
            <div className="transfer-block">
              <BodyText marginRight={8} font="Poppins" size="M" fontWeight="SB" color="charcoal" textType="bodyText">
                {t('tenxPayHome.So far this pay period')}
              </BodyText>

              <Icon name="info" size="smaller" color="blue" cursorPointer onClick={handleInfoClick} />
            </div>

            <TransferItem iconName="transfersAvailableCompleted" title={t('tenxPayHome.Completed Transfers')} value={completedTransfers} />

            {paymentsInfo.transfersAvailable !== undefined && <TransferItem iconName="transfersAvailable" title={t('tenxPayHome.Transfers Remaining')} value={paymentsInfo.transfersAvailable} />}

            {paymentsInfo.transferredAmount !== undefined && <TransferItem iconName="transferredAmount" title={t('tenxPayHome.Amount Received')} value={`$${paymentsInfo.transferredAmount}`} />}
          </STransferBlock>

          <div className="view-transfer-history">
            <SCustomButton onClick={handleViewHistoryClick}>
              <BodyText color="blue" fontWeight="B" size="N" textType="bodyText">
                {t('tenxPayHome.View Transfer History')}
              </BodyText>
            </SCustomButton>
          </div>
        </SBlock>
      )}

      {getPaymentsInfoQueryResult?.isLoading && <Loader />}

      {/* Modals */}
      <PaymentErrorModal hasError={hasError} handleCloseStatusModal={handleCloseStatusModal} handleTransferHistory={handleTransferHistory} />

      <CustomModal
        open={iframeModal.isActive}
        onCancel={handleCloseIframe}
        padding="7px"
        topPosition="0"
        margin="0"
        contentHeight="100%"
        bodyStyle={{ height: '100%', maxHeight: '100%' }}
        isFullWidth
        isFullHeight
        closeIcon={
          <SIframeCloseButton>
            <Icon name="close" size="small" color="blue" />
          </SIframeCloseButton>
        }
      >
        <SIFrame width="100%" height="100%" title="add account" src={immediatePayFrameUrl} />
      </CustomModal>

      <PaymentSuccessModal paymentSucceed={paymentSucceed} handleCloseStatusModal={handleCloseStatusModal} />

      {/* Sheets */}
      <PaymentPrepareSheet
        accounts={accounts}
        getAccounts={getAccountsQuery.refetch}
        fee={fee}
        toggleRequestPercPay={prepareSheet.toggle}
        isOpen={prepareSheet.isActive}
        selectedAccount={selectedAccount}
        availableAmount={paymentsInfo.availableNow}
        availableMin={Number(paymentsInfo.availableMin)}
        handleAddAccountClick={handleAddAccountClick}
        handleSelectAccount={handleSelectAccount}
        onConfirm={handlePrepareConfirm}
        isLoading={preparePaymentResult.isLoading}
      />

      <PaymentRequestSheet
        isOpen={reviewSheet.isActive && !preparePaymentResult.isError && !preparePaymentResult.isLoading}
        isPaymentRequestStillOpen={setIsPaymentRequestSheetStillOpen}
        onClose={closePaymentSheets}
        checkDate={checkDate}
        accountInfo={accountInfo}
        amountToTransfer={amountToTransfer}
        fee={fee}
        amountSelected={amountSelected}
        estimatedDate={estimatedDate}
        handleCloseStatusModal={handleCloseStatusModal}
        handleRequestPayment={handleRequestPayment}
        toggleRequestPercPay={prepareSheet.toggle}
        isLoading={requestPaymentResult.isLoading}
      />

      <CustomSheet
        title={t('enrollTermsAndConditions.Terms And Conditions')}
        isOpen={termsSheet.isActive}
        onClose={termsSheet.hide}
        subtitle={t('enrollTermsAndConditions.Please read and agree to this disclosure')}
        footer={
          <>
            <Checkbox id="eConsent-checkbox" checked={isCheckboxAgreed} onChange={handleChangeAgree}>
              <BodyText textType="helperText" fontWeight="R" size="S" color="charcoal70">
                {t('enrollTermsAndConditions.I have read the Website and Mobile Application Terms of Use set forth above and I accept them.')}
              </BodyText>
            </Checkbox>

            <CustomButton size="large" disabled={!isCheckboxAgreed} onClick={handleAcceptTerms} marginTop={24}>
              {t('enrollTermsAndConditions.Accept')}
            </CustomButton>
          </>
        }
      >
        {isEulaPolicyFetching ? <Loader /> : <div dangerouslySetInnerHTML={{ __html: policyText }} />}
      </CustomSheet>
    </SLayout>
  );
};
