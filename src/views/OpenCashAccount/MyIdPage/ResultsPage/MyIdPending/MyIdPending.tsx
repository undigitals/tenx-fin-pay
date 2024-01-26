import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'vars/const/ROUTES';
import { Spin } from 'antd';
import { useTransactionsCheckQuery } from 'store/trulioo/trulioo.api';
import { MyIdNomatchModal } from 'components/general/Modals/MyIdNomatchModal/MyIdNomatchModal';
import { ResultsPage } from 'views/OpenCashAccount/MyIdPage/ResultsPage/ResultsPage';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { useToggle } from 'utils/hooks/useToggle';
import { filterAlphaNumeric } from 'utils/helpers/stringFormatter';
import { useKYC } from 'utils/hooks/useKYC';
import { SBodyText } from './MyIdPending.styles';

interface IMyIdPending {
  state?: {
    experienceTransactionId: '';
  };
  search: string;
}

const PENDING_TIME_LIMIT = 30000;
const POLLING_INTERVAL = 1000;
const ATTEMPTS_LIMIT = 3;

export const MyIdPending: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { document } = useKYC();
  const [isPendingOverlimited, setIsPendingOverlimited] = useState(false);
  const { saveOnboardingData } = useCashAccountOpening();
  const location = useLocation() as IMyIdPending;
  const searchParams = new URLSearchParams(location.search);
  const experienceTransactionId = filterAlphaNumeric(location?.state?.experienceTransactionId || searchParams.get('experienceTransactionId') || '');
  const myIdNoMatchModal = useToggle(false);
  const isDocument3Attempts = document.attemptsCount >= ATTEMPTS_LIMIT;

  const { data: transactionStatus, isError } = useTransactionsCheckQuery(experienceTransactionId, { pollingInterval: POLLING_INTERVAL });

  const handleClick = () => navigate(ROUTES.home.path);

  const handleMatch = useCallback(() => {
    saveOnboardingData?.({ myIdStatus: 'done' });
    navigate(ROUTES.myIdMatch.path);
  }, [navigate, saveOnboardingData]);

  const handleRetry = useCallback(() => navigate(ROUTES.myId.path), [navigate]);

  useEffect(() => {
    if (transactionStatus === 'Nomatch') {
      navigate(ROUTES.myInfoVeriticationResult.path, { state: { verificationStatus: isDocument3Attempts ? 'documentFailure' : 'tryAgain' } });
    } else if (transactionStatus === 'Match') {
      handleMatch();
    }
  }, [transactionStatus, isError]);

  useEffect(() => {
    const timer = setInterval(() => setIsPendingOverlimited(true), PENDING_TIME_LIMIT);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <ResultsPage
        image="sandClock"
        title={t(!isPendingOverlimited ? `loader.Processing` : `myInfo.ThisIsTakingLongerThanExpected`)}
        btnTitle={!isPendingOverlimited ? '' : t(`myInfo.GoHome`)}
        onClick={handleClick}
      >
        <SBodyText textType="bodyText" color="charcoal70" fontWeight="R" size="M" textAlign="center" lineHeight="24px">
          {t(!isPendingOverlimited ? `myInfo.HopeToHaveVerificationResultsShortly` : `myInfo.ThankYouForYourPatience`)}
        </SBodyText>
        <Spin tip={undefined} />
      </ResultsPage>

      <MyIdNomatchModal open={myIdNoMatchModal.isActive} onClose={myIdNoMatchModal.hide} onRetry={handleRetry} onContinue={handleClick} />
    </>
  );
};
