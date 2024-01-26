import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'utils/hooks/store';
import { useToggle } from 'utils/hooks/useToggle';
import { ROUTES } from 'vars/const/ROUTES';
import { setMyAccountCollapsed, selectCurrentUser, selectCurrentAuthState } from 'store/user/authentication.slice';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { areEqualUsers, canHaveAccountOrEnroll, USER_PROFILE_IDS } from 'vars/const/USER_PROFILE_IDS';
import { Box, SCardTitle } from 'views/Main/MainPage/MainPage.styles';
import { useGetAccountOpeningPropertyQuery } from 'store/user/properties/userProperties.api';
import { useLazyGetAccountsQuery } from 'store/user/accounts/accounts.api';
import { Loader } from 'components/general/Loader/Loader';
import { mobileApiCall } from 'services/mobileService';
import { useLazyGetThirdPartyIdsQuery } from 'store/user/users.api';
import { IPartyAcctRelRecItem } from 'store/user/accounts/accounts.types';
import { BaseSlider } from 'components/general/Slider/Slider';
import { Settings } from 'react-slick';
import { useKYC } from 'utils/hooks/useKYC';
import { SystemIsNotAvailable } from 'views/NotificationsAndAlerts/SystemIsNotAvailable/SystemIsNotAvailable';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { NeedSupportModal } from 'components/general/Modals/NeedSupportModal/NeedSupportModal';
import { lsGetItem } from 'utils/helpers/storage';
import { AccountCardItem } from './AccountCardItem/AccountCardItem';
import { AccountsBox } from './Accounts.styles';
import { OpenCashAccountCard } from './OpenCashAccountCard/OpenCashAccountCard';
import { AccountDisabled } from './OpenCashAccountCard/AccountDisabled/AccountDisabled';

const SLIDER_SETTINGS: Settings = {
  dots: true,
  infinite: false,
  speed: 350,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  accessibility: true,
};

type IPreparedAccount = {
  type?: string;
  id?: string;
  ownerId?: string;
  balance?: number;
  owner?: boolean;
  debitCardNumber?: string | null;
};

const prepareAccounts = (rawAccounts: IPartyAcctRelRecItem[]) =>
  rawAccounts
    ?.map((accData) => ({
      type: accData.partyAcctRelKeys?.acctKeys?.tenxAccountType,
      id: accData.partyAcctRelKeys?.acctKeys?.tenxAccountId,
      ownerId: accData.partyAcctRelKeys?.acctKeys?.ownerId,
      balance: accData.partyAcctRelInfo.acctRef.acctSummInfo.acctBal.find(({ balType }) => balType === 'Avail')?.curAmt.amt,
      owner: accData.partyAcctRelKeys?.acctKeys?.owner,
      debitCardNumber: accData.partyAcctRelKeys?.acctKeys?.debitCardNumber,
    }))
    .reduce((acc: Record<string, Record<string, IPreparedAccount>>, val) => {
      const ownerAccounts = acc[val.ownerId] || {};
      ownerAccounts[val.type] = val;
      acc[val.ownerId] = ownerAccounts;
      return acc;
    }, {}) ?? [];

export const Accounts = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobileApp = lsGetItem('isMobileApp');
  const accountOpeningPropertyQuery = useGetAccountOpeningPropertyQuery();
  const [getAccount, getAccountResult] = useLazyGetAccountsQuery();
  const [getThirdPartyIds, getThirdPartyIdsResult] = useLazyGetThirdPartyIdsQuery();

  const authData = useSelector(selectCurrentAuthState);
  const currentUser = useSelector(selectCurrentUser);
  const { pii, document, KYCStatus, isFetching: isKycFetching, refetchKYC } = useKYC();
  const { openingAccountData } = useCashAccountOpening();
  const { fiservAccountsData } = useSelector(selectAccountsData);
  const needSupportModal = useToggle(false);
  const preparedAccounts = useMemo(() => prepareAccounts(fiservAccountsData?.partyAcctRelRec), [fiservAccountsData]);
  const hasMultipleCashAccounts = Object.keys(preparedAccounts).length > 1;
  const hasMyAccountOrEnroll = !!currentUser?.systemProfileId && canHaveAccountOrEnroll(currentUser.systemProfileId);
  const isMyAccountVisible = hasMyAccountOrEnroll && authData?.thirdPartyIds?.Fiserv;
  const isClient = areEqualUsers(currentUser?.systemProfileId ?? '', USER_PROFILE_IDS.CLIENT_ccc);
  const isLoading = getThirdPartyIdsResult?.isLoading || getAccountResult.isLoading || getAccountResult.isFetching || accountOpeningPropertyQuery.isLoading || isKycFetching;
  const isFiservAvailable = currentUser?.fiservStatus === 'Available';

  let pendingInterval: NodeJS.Timer | undefined;

  const memoizedPreparedAccounts = useMemo(
    () =>
      Object.keys(preparedAccounts).map((ownerId) => (
        <AccountCardItem accounts={preparedAccounts[ownerId]} ownerId={ownerId} isAccCollapsed={authData.UIPreferences?.isMyAccountCollapsed} key={ownerId} />
      )),
    [preparedAccounts, authData.UIPreferences?.isMyAccountCollapsed]
  );

  /* Conditions for status messages DEV-4775 */

  /* 1. If user have not started CAO */
  const canStartOpeningCashAccount = !openingAccountData.currentUrl && pii.attemptsCount === 0;

  /* 2. If user started CAO but didn’t start PII verification */
  const isAccountOpeningIncomplete = openingAccountData.currentUrl && pii.attemptsCount === 0;

  /* 3. If user passed PII but didn’t start Document verification */
  const isDocumentNotStarted = openingAccountData.currentUrl && pii.status && document.attemptsCount === 0;

  /* 4.1 If user fails PII before 3 attempts in the task DEV-4775 it is the 3. case */
  const failedPiiBeforeThreeAttempts = !pii.status && pii.attemptsCount < 3 && pii.attemptsCount > 0;

  /* 4.2 If user fails DocV before 3 attempts in the task DEV-4775 it is the 3. case */
  const failedDocVBeforeThreeAttempts = !document.status && document.attemptsCount < 3 && document.attemptsCount > 0 && !document.isPending;

  /* 4. If user fails PII or DocV before 3 attempts */
  // const failedPiiOrDocV = (!pii.status && pii.attemptsCount < 3 && pii.attemptsCount > 0) || (!document.status && document.attemptsCount < 3 && document.attemptsCount > 0 && !document.isPending);

  /* 5. If user fails PII after 3 attempts, but hasn't received email to upload docs yet */
  const failedPiiAfterThreeAttempts = !pii.status && pii.attemptsCount >= 3 && !document.isRequestForDocumentsPending;

  /* 6. If user fails PII after 3 attempts and has not uploaded documents yet */
  const failedPiiAndNotUploaded = !pii.status && pii.attemptsCount >= 3 && document.isRequestForDocumentsPending && !document.requestedUploaded;

  /* 7. If user fails DocV after 3 attempts and has not uploaded documents yet */
  const failedDocVAndNotUploaded = pii.status && document.attemptsCount >= 3 && !document.status && document.isRequestForDocumentsPending && !document.requestedUploaded;

  /* 8 .If user fails DocV after 3 attempts and has uploaded documents */
  const failedDocVAndUploaded = pii.status && !document.status && document.attemptsCount >= 3 && document.requestedUploaded && !document.isPending;

  /* 9. If user fails DocV after 3 attempts and their application has expired without uploading any documents */
  const failedDocVAndExpired = pii.status && !document.status && !document.requestedUploaded && !document.isRequestForDocumentsPending && document.attemptsCount >= 3 && !document.isPending;

  /* 10. If user submitted DocV and status is Pending */
  const submittedAndPending = pii.status && !document.status && document.isPending;

  /* 11. KYC status is true and doesn't have fiserv */
  const hasNoFiserv = KYCStatus && !authData?.thirdPartyIds?.Fiserv;

  /* 12. KYC status is true, have fiserv, but doesn't have any accounts on login */
  const kycAndNoAccounts = KYCStatus && authData?.thirdPartyIds?.Fiserv && authData?.user?.accounts?.length === 0;

  const handleUploadDocument = () => {
    if (isMobileApp) {
      mobileApiCall('documentUploadRequest');
    } else {
      navigate(ROUTES.uploadDocument.path);
    }
  };

  const handleTitleClick = () => {
    navigate(ROUTES.balancesTransactions.path);
  };

  const handleCollapseChange = (collapsed: boolean | null) => {
    dispatch(setMyAccountCollapsed(collapsed));
  };

  const checkPendingStatus = () => {
    pendingInterval = setInterval(() => refetchKYC(), 10000);
  };

  useEffect(() => {
    getThirdPartyIds();
  }, []);

  useEffect(() => {
    if (isClient) {
      getAccount();
    } else {
      refetchKYC();
    }
  }, [isClient]);

  useEffect(() => {
    if (document.isPending) {
      checkPendingStatus();
    }

    return () => clearInterval(pendingInterval);
  }, [document.isPending]);

  if (!isFiservAvailable && isClient) {
    return <SystemIsNotAvailable />;
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isClient && (
        <>
          {/* 1. If user have not started CAO */}
          {canStartOpeningCashAccount && (
            <Box changeDirection width="100%">
              <SCardTitle marginBottom={16}>{t('homeScreen.My Accounts')}</SCardTitle>
              <AccountsBox>
                <OpenCashAccountCard />
              </AccountsBox>
            </Box>
          )}

          {/* 2. If user started CAO but didn’t start PII verification */}
          {isAccountOpeningIncomplete && (
            <AccountDisabled
              title={t('homeScreen.YourCashAccountOpeningIsNotCompleted')}
              description={t('homeScreen.NeedMoreTimeToOpen?')}
              iconName="circleInfo"
              color="blue"
              bgColor="blue5"
              redirectPath={openingAccountData.currentUrl}
              btnText={t('homeScreen.CompleteAccountOpening')}
            />
          )}

          {/* 3. If user passed PII but didn’t start Document verification */}
          {isDocumentNotStarted && (
            <AccountDisabled
              title={t('homeScreen.YourCashAccountOpeningIsNotCompleted')}
              description={t('homeScreen.NeedMoreTimeToOpen?')}
              iconName="circleInfo"
              color="blue"
              bgColor="blue5"
              redirectPath={ROUTES.myId.path}
              btnText={t('homeScreen.CompleteAccountOpening')}
            />
          )}

          {/* 4.1 If user fails PII before 3 attempts, in the task DEV-4775 it is the 3. case */}
          {failedPiiBeforeThreeAttempts && (
            <AccountDisabled
              title={t('homeScreen.accountDocumentStatuses.failedPiiBeforeThreeAttempts.header')}
              description={t('homeScreen.accountDocumentStatuses.failedPiiBeforeThreeAttempts.subtext')}
              iconName="triangleWarning"
              color="goldOrange"
              bgColor="orange10"
              redirectPath={ROUTES.myInfoSummary.path}
              btnText={t('homeScreen.accountDocumentStatuses.failedPiiBeforeThreeAttempts.button')}
            />
          )}

          {/* 4.2 If user fails DocV before 3 attempts,  in the task DEV-4775 it is the 3. case */}
          {failedDocVBeforeThreeAttempts && (
            <AccountDisabled
              title={t('homeScreen.accountDocumentStatuses.failedDocVBeforeThreeAttempts.header')}
              description={t('homeScreen.accountDocumentStatuses.failedDocVBeforeThreeAttempts.subtext')}
              iconName="triangleWarning"
              color="goldOrange"
              bgColor="orange10"
              redirectPath={ROUTES.myId.path}
              btnText={t('homeScreen.accountDocumentStatuses.failedDocVBeforeThreeAttempts.button')}
            />
          )}

          {/* 5. If user fails PII after 3 attempts, but hasn't received email to upload docs yet */}
          {failedPiiAfterThreeAttempts && (
            <AccountDisabled
              title={t('homeScreen.accountDocumentStatuses.failedPiiAfterThreeAttempts.header')}
              description={t('homeScreen.accountDocumentStatuses.failedPiiAfterThreeAttempts.subtext')}
              iconName="triangleWarning"
              color="goldOrange"
              bgColor="orange10"
            />
          )}

          {/* 6. If user fails PII after 3 attempts and has not uploaded documents yet */}
          {failedPiiAndNotUploaded && (
            <AccountDisabled
              title={t('homeScreen.accountDocumentStatuses.failedPiiAndNotUploaded.header')}
              description={t('homeScreen.accountDocumentStatuses.failedPiiAndNotUploaded.subtext')}
              iconName="triangleWarning"
              color="goldOrange"
              bgColor="orange10"
              onClick={handleUploadDocument}
              btnText={t('homeScreen.accountDocumentStatuses.failedPiiAndNotUploaded.button')}
            />
          )}

          {/* 7. If user fails DocV after 3 attempts and has not uploaded documents yet */}
          {failedDocVAndNotUploaded && (
            <AccountDisabled
              title={t('homeScreen.accountDocumentStatuses.failedDocVAndNotUploaded.header')}
              description={t('homeScreen.accountDocumentStatuses.failedDocVAndNotUploaded.subtext')}
              iconName="triangleWarning"
              color="goldOrange"
              bgColor="orange10"
              onClick={handleUploadDocument}
              btnText={t('homeScreen.accountDocumentStatuses.failedDocVAndNotUploaded.button')}
            />
          )}

          {/* 8 .If user fails DocV after 3 attempts and has uploaded documents */}
          {failedDocVAndUploaded && (
            <AccountDisabled
              title={t('homeScreen.accountDocumentStatuses.failedDocVAndUploaded.header')}
              description={t('homeScreen.accountDocumentStatuses.failedDocVAndUploaded.subtext')}
              iconName="triangleWarning"
              color="goldOrange"
              bgColor="orange10"
            />
          )}

          {/* 9. If user fails DocV after 3 attempts and their application has expired without uploading any documents */}
          {failedDocVAndExpired && (
            <AccountDisabled
              title={t('homeScreen.accountDocumentStatuses.failedDocVAndExpired.header')}
              description={t('homeScreen.accountDocumentStatuses.failedDocVAndExpired.subtext')}
              iconName="triangleWarning"
              color="goldOrange"
              bgColor="orange10"
            />
          )}

          {/* 10. If user submitted DocV and status is Pending */}
          {submittedAndPending && (
            <AccountDisabled
              title={t('homeScreen.accountDocumentStatuses.submittedAndPending.header')}
              description={t('homeScreen.accountDocumentStatuses.submittedAndPending.subtext')}
              iconName="triangleWarning"
              color="goldOrange"
              bgColor="orange10"
            />
          )}

          {/* 11. KYC status is true and doesn't have fiserv */}
          {hasNoFiserv && (
            <AccountDisabled
              title={t('homeScreen.YourCashAccountOpeningIsNotCompleted')}
              description={t('homeScreen.NeedMoreTimeToOpen?')}
              iconName="circleInfo"
              color="blue"
              bgColor="blue5"
              redirectPath={ROUTES.myIdMatch.path}
              btnText={t('homeScreen.CompleteAccountOpening')}
            />
          )}
        </>
      )}

      {/* 12. KYC status is true, have fiserv, but doesn't have any accounts */}
      {kycAndNoAccounts && (
        <AccountDisabled
          title={t('homeScreen.YourCashAccountOpeningIsNotCompleted')}
          description={t('homeScreen.NeedMoreTimeToOpen?')}
          iconName="circleInfo"
          color="blue"
          bgColor="blue5"
          redirectPath={ROUTES.myIdMatch.path}
          btnText={t('homeScreen.CompleteAccountOpening')}
        />
      )}

      {isMyAccountVisible && fiservAccountsData?.partyAcctRelRec?.length > 0 && (
        <BaseSlider
          title={t('homeScreen.My Accounts')}
          subtitle={t('homeScreen.Swipe right or left to move')}
          isSubtitle={hasMultipleCashAccounts}
          handleTitleClick={handleTitleClick}
          displayCollapseBtn
          collapseChange={handleCollapseChange}
          settings={SLIDER_SETTINGS}
        >
          {memoizedPreparedAccounts}
        </BaseSlider>
      )}

      <NeedSupportModal open={needSupportModal.isActive} onClose={needSupportModal.hide} />
    </>
  );
};
