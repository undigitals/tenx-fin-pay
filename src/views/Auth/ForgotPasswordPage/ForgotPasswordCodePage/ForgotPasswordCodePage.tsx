import { Loader } from 'components/general/Loader/Loader';
import { Title, BodyText } from 'components/general/Typography';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCheckCodeForgotPasswordMutation, useGenerateCodeForgotPasswordMutation } from 'store/user/authentication.api';
import { selectForgotPasswordData } from 'store/user/forgotPassword/forgotPassword.slice';
import { ROUTES } from 'vars/const/ROUTES';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { EnterCodeBlock } from './EnterCodeBlock/EnterCodeBlock';

export const ForgotPasswordCodePage: React.FC = () => {
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();
  const navigate = useNavigate();
  const { transactionId } = useSelector(selectForgotPasswordData);
  const [generateCodeAPI, generateCodeAPIResult] = useGenerateCodeForgotPasswordMutation();
  const [checkCodeAPI, checkCodeAPIResult] = useCheckCodeForgotPasswordMutation();
  const [smsCode, setSmsCode] = useState('');

  const handleCompletion = (code: string) => {
    setSmsCode(code);
  };

  const handleResendCode = async () => {
    await generateCodeAPI({
      codeDelivery: 'Email',
      fingerprint: 'string',
      transactionId,
    });
  };

  const handleSubmitCode = async () => {
    await checkCodeAPI({
      code: smsCode,
      fingerprint: 'string',
      transactionId,
    });
  };

  useEffect(() => {
    if (checkCodeAPIResult.isSuccess) navigate(ROUTES.changePassword.path);
  }, [checkCodeAPIResult]);

  if (generateCodeAPIResult.isLoading || checkCodeAPIResult.isLoading) return <Loader />;

  return (
    <>
      <Title size="M" fontWeight="M" marginBottom={isDesktopSize ? 10 : 48}>
        {t('verification.Title')}
      </Title>

      {isDesktopSize ? (
        <>
          <BodyText color="charcoal70" fontWeight="R" size="N" textType="bodyText" marginBottom={22}>
            {t('verification.VerificationDescription')}
          </BodyText>
          <CustomCard>
            <EnterCodeBlock handleCompletion={handleCompletion} isError={checkCodeAPIResult.isError} handleSubmitCode={handleSubmitCode} handleResendCode={handleResendCode} />
          </CustomCard>
        </>
      ) : (
        <EnterCodeBlock handleCompletion={handleCompletion} isError={checkCodeAPIResult.isError} handleSubmitCode={handleSubmitCode} handleResendCode={handleResendCode} />
      )}
    </>
  );
};
