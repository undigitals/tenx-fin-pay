import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useFinishOtpSeedMutation, useGenerateCodeOtpSeedMutation } from 'store/user/authentication.api';
import { lsGetItem, lsRemoveItem } from 'utils/helpers/storage';
import { isBackendError } from 'utils/helpers/rtqErrorHandling';
import { Loader } from 'components/general/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { API_ROUTES } from 'vars/const/API_ROUTES';
import { SCaption, SResend, SResendWrapper, SSmsCodeForm, SSubmit, STitle } from './DeviceVerifyPage.styles';

export const DeviceVerifyPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [generateOtpCode, generateOtpCodeResult] = useGenerateCodeOtpSeedMutation();
  const [finishGetOtpSeed, finishGetOtpSeedResult] = useFinishOtpSeedMutation();
  const { transactionId } = lsGetItem('loginOtpFlow');

  const isLoading = generateOtpCodeResult.isLoading || finishGetOtpSeedResult.isLoading;

  const handleResError = (resError: unknown) => {
    if (isBackendError(resError)) {
      setErrorMsg(resError?.data?.Error || 'Unknown error');
    }
  };

  const handleSubmitCode = () => {
    setErrorMsg('');
    if (transactionId && code) {
      finishGetOtpSeed({
        transactionId,
        code,
      })
        .unwrap()
        .then((finishOtpRes) => {
          console.log(`${API_ROUTES.auth.otpSeed.finish} response: ${finishOtpRes}`);
          lsRemoveItem('loginOtpFlow');
          navigate(finishOtpRes?.systemProperties?.postLoginURL ?? ROUTES.home.path);
        })
        .catch((finishOtpErr) => handleResError(finishOtpErr));
    }
  };

  const generateCode = () => {
    if (transactionId) {
      generateOtpCode({
        transactionId,
        codeDelivery: 'Phone',
      }).unwrap();
    }
  };

  const handleCompletion = (codeVal: string) => {
    setCode(codeVal);
  };

  const handleResendCode = useCallback(() => {
    generateCode?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(transactionId);
    generateCode();
  }, [transactionId]);

  return (
    <>
      {isLoading && <Loader />}
      <STitle size="bigger" fontWeight="lighter">
        {t('verification.Title')}
      </STitle>
      <SCaption type="secondary">{t('verification.EnterCode')}</SCaption>
      <SSmsCodeForm handleCompletion={handleCompletion} onCompletion={setIsSubmitDisabled} checkError={errorMsg} />
      <SSubmit>
        <CustomButton preset="primary" type="submit" onClick={handleSubmitCode} disabled={isSubmitDisabled}>
          {isSubmitDisabled ? t('verification.Continue') : t('verification.Verify')}
        </CustomButton>
      </SSubmit>
      <SResendWrapper>
        <CustomText textColor="charcoal50">{t('verification.DidntReceive')}</CustomText>
        <SResend onClick={handleResendCode}>{t('verification.Resend')}</SResend>
      </SResendWrapper>
    </>
  );
};
