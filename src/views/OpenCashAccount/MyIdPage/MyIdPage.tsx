import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { event as TruliooEvent } from '@trulioo/docv';
import assert from 'assert';
import { ROUTES } from 'vars/const/ROUTES';
import { mobileApiCall } from 'services/mobileService';
import { lsGetItem } from 'utils/helpers/storage';
import { urlString } from 'utils/helpers/urlString/urlString';
import { EMBEDED_ID_URL } from 'vars/const/externalUrls';
import { US_PUBLIC_KEY } from 'vars/const/taxIdTypes';
import { selectTruliooToken } from 'store/user/authentication.slice';
import { useGetTruliooTokenMutation } from 'store/user/authentication.api';
import { truliooApi, useInjectAccessTokenMutation } from 'store/trulioo/trulioo.api';
import { useLanguage } from 'utils/hooks/useLanguage';
import { useAnalytics } from 'utils/hooks/useAnalytics';
import { useKYC } from 'utils/hooks/useKYC';
import { Loader } from 'components/general/Loader/Loader';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { TruliooOverlay } from 'views/OpenCashAccount/TruliooOverlay';
import { SLayout } from './MyIdPage.styles';

export const MyIdPage = () => {
  const { language, locale } = useLanguage();
  const navigate = useNavigate();
  const { saveOnboardingData } = useCashAccountOpening();
  const { invalidateKycData } = useKYC();
  const truliooAccessToken = useSelector(selectTruliooToken) || '';
  const { track } = useAnalytics();

  const [getTruliooToken, getTruliooTokenResult] = useGetTruliooTokenMutation();
  const [injectAccessToken, injectAccessTokenResult] = useInjectAccessTokenMutation();
  const [getDocv2ShortCode, getDocv2ShortCodeResult] = truliooApi.useLazyGetDocv2ShortCodeQuery();
  const [saveDocv2Transaction, saveDocv2TransactionResult] = truliooApi.useSaveDocv2TransactionMutation();

  const [truliooActive, setTruliooActive] = useState(false);
  const [truliooShortCode, setTruliooShortCode] = useState<string | null>(null);

  const getTrulioIframeUrl = (accessToken: string, publicKey: string) => {
    const url = `${EMBEDED_ID_URL}/${publicKey}/at/${accessToken}`;
    const params = { locale: language };
    return urlString({ url, params });
  };

  const getUrlForMobile = (iframeUrl: string) => {
    const params = { iframeUrl, truliooAccessToken };
    return urlString({ url: `${process.env.REACT_APP_BASE_URL}${ROUTES.truliooTransaction.path}`, params });
  };

  const handleStartVerification = async (publicKey: string) => {
    const isMobileApp = lsGetItem('isMobileApp');
    const injectResult = await injectAccessToken({ truliooAccessToken, id: publicKey }).unwrap();
    const iframeUrl = getTrulioIframeUrl(injectResult.accessToken, publicKey);
    track('click', `Start verifications with ${publicKey === US_PUBLIC_KEY ? 'US ID' : 'non-US ID'}`);
    invalidateKycData();

    if (isMobileApp) {
      const browserData = {
        url: getUrlForMobile(iframeUrl),
        inApp: 'false',
      };
      mobileApiCall('startTrulioo', JSON.stringify(browserData));
    } else {
      const shortCode = await getDocv2ShortCode().unwrap();
      setTruliooActive(true);
      setTruliooShortCode(shortCode);
    }
  };

  const handleVerificationCompleted = async (result: Parameters<TruliooEvent.adapters.ListenerCallback['onComplete']>[0]) => {
    const { transactionId } = result;
    console.log(transactionId);
    assert(transactionId != null);
    setTruliooActive(false);
    setTruliooShortCode(null);
    await saveDocv2Transaction(transactionId);
    navigate({
      pathname: ROUTES.myIdPending.path,
      search: new URLSearchParams({
        experienceTransactionId: transactionId,
      }).toString(),
    });
  };

  const handleVerificationError = (err: Parameters<TruliooEvent.adapters.ListenerCallback['onError']>[0]) => {
    console.error('Trulioo verification failed with error');
    console.error(err);
    setTruliooActive(false);
    setTruliooShortCode(null);
  };

  const handleVerificationException = (ex: Parameters<TruliooEvent.adapters.ListenerCallback['onException']>[0]) => {
    console.error('Trulioo verification failed with exception');
    console.error(ex);
    setTruliooActive(false);
    setTruliooShortCode(null);
  };

  useEffect(() => {
    getTruliooToken({});
  }, [getTruliooToken]);

  useEffect(() => {
    saveOnboardingData({ currentUrl: ROUTES.myId.path });
  }, []);

  useEffect(() => {
    if (getTruliooTokenResult.isSuccess) handleStartVerification(US_PUBLIC_KEY);
  }, [getTruliooTokenResult.isSuccess]);

  return (
    <SLayout>
      {(injectAccessTokenResult.isLoading || getDocv2ShortCodeResult.isLoading || saveDocv2TransactionResult.isLoading) && <Loader />}
      <TruliooOverlay
        active={truliooActive}
        shortCode={truliooShortCode}
        language={locale}
        redirectURL={ROUTES.truliooUpload.path}
        onComplete={handleVerificationCompleted}
        onError={handleVerificationError}
        onException={handleVerificationException}
      />
    </SLayout>
  );
};
