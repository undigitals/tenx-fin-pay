import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFinishRegestrationMutation, useCheckCodeMutation, useGenerateCodeMutation } from 'store/user/registration/registration.api';
import { cleanRegistrationData, selectRegistrationData } from 'store/user/registration/registration.slice';
import { ROUTES } from 'vars/const/ROUTES';
import { lsSetItem } from 'utils/helpers/storage';
import { getFingerpint } from 'utils/helpers/webID';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Loader } from 'components/general/Loader/Loader';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { EnterCodeBlock } from 'views/Auth/ForgotPasswordPage/ForgotPasswordCodePage/EnterCodeBlock/EnterCodeBlock';
import { handleError } from 'utils/helpers/errorHelper';

export const RegistrationCodePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDesktopSize } = useDeviceDimension();
  const { phoneLastFourDigits } = useLocation().state ?? {};

  const [generateCodeAPI, generateCodeAPIResult] = useGenerateCodeMutation();
  const [checkCodeAPI, checkCodeAPIResult] = useCheckCodeMutation();
  const [finishRegistrationAPI, finishRegistrationAPIResult] = useFinishRegestrationMutation();
  const registrationData = useSelector(selectRegistrationData);
  const { phone, email, transactionId } = registrationData;

  const [smsCode, setSmsCode] = useState('');

  const handleCompletion = (code: string) => {
    setSmsCode(code);
  };

  const handleSubmitCode = async () => {
    await checkCodeAPI({
      transactionId,
      code: smsCode,
    });
  };

  const handleCheckSuccess = useCallback(() => {
    if (registrationData) {
      finishRegistrationAPI({ ...registrationData, fingerprint: getFingerpint(true) });
    }
  }, [registrationData, finishRegistrationAPI]);

  const handleResendCode = async () => {
    generateCodeAPI({
      phone,
      email,
    });
  };

  useEffect(() => {
    if (checkCodeAPIResult.isSuccess) {
      handleCheckSuccess();
    }
  }, [checkCodeAPIResult]);

  useEffect(() => {
    if (finishRegistrationAPIResult.isSuccess) {
      dispatch(cleanRegistrationData());
      lsSetItem('otpSeed', finishRegistrationAPIResult?.data?.otpSeed);
      navigate(ROUTES.setupBiometric.path);
    }
  }, [dispatch, finishRegistrationAPIResult, navigate]);

  useEffect(() => {
    if (checkCodeAPIResult.isError) handleError(checkCodeAPIResult.error);
    if (generateCodeAPIResult.isError) handleError(generateCodeAPIResult.error);
    if (finishRegistrationAPIResult.isError) handleError(finishRegistrationAPIResult.error);
  }, [checkCodeAPIResult, generateCodeAPIResult, finishRegistrationAPIResult]);

  if (generateCodeAPIResult.isLoading || checkCodeAPIResult.isLoading || finishRegistrationAPIResult.isLoading) return <Loader />;

  return (
    <>
      <Title size="M" fontWeight="M" marginBottom={48}>
        {t('registration.DidYouGetOurText')}
      </Title>

      <BodyText color="charcoal70" fontWeight="R" size="N" textType="bodyText" marginBottom={22} lineHeight={1.6}>
        {t('registration.CodeWasSentToYourMobile')} {phoneLastFourDigits}.
      </BodyText>
      {isDesktopSize ? (
        <CustomCard>
          <EnterCodeBlock handleCompletion={handleCompletion} isError={checkCodeAPIResult.isError} handleSubmitCode={handleSubmitCode} handleResendCode={handleResendCode} />
        </CustomCard>
      ) : (
        <EnterCodeBlock handleCompletion={handleCompletion} isError={checkCodeAPIResult.isError} handleSubmitCode={handleSubmitCode} handleResendCode={handleResendCode} />
      )}
    </>
  );
};
