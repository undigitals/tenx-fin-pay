import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { selectForgotPasswordData } from 'store/user/forgotPassword/forgotPassword.slice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { useGenerateCodeForgotPasswordMutation } from 'store/user/authentication.api';
import { Loader } from 'components/general/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { handleError } from 'utils/helpers/errorHelper';
import { PhoneNumberBlock } from './PhoneNumberBlock/PhoneNumberBlock';

export const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();
  const { phone } = useSelector(selectForgotPasswordData);
  const { transactionId } = useSelector(selectForgotPasswordData);
  const [generateCodeAPI, generateCodeAPIResult] = useGenerateCodeForgotPasswordMutation();
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const navigate = useNavigate();

  const generateCode = async () => {
    await generateCodeAPI({
      codeDelivery: 'Email',
      fingerprint: 'string',
      transactionId,
    });
  };

  const handleContinue = () => {
    navigate(ROUTES.forgotPasswordCode.path);
  };

  const formatPhoneNumber = (phoneNumber: string): string => {
    const trimmedPhoneNumber = phoneNumber.replace(/\+/g, '');
    const cleanedPhoneNumber = trimmedPhoneNumber.match(/(\W{1})(\W{3})(\W{3})(\d{4})$/);
    if (cleanedPhoneNumber) return `${cleanedPhoneNumber[1]} ${cleanedPhoneNumber[2]} ${cleanedPhoneNumber[3]} ${cleanedPhoneNumber[4]}`;
    return '';
  };

  useEffect(() => {
    if (!transactionId) return;

    generateCode();
  }, [transactionId]);

  useEffect(() => {
    if (generateCodeAPIResult.isSuccess) setIsContinueDisabled(false);
    if (generateCodeAPIResult.isError) handleError(generateCodeAPIResult.error);
  }, [generateCodeAPIResult, navigate]);

  if (generateCodeAPIResult.isLoading) return <Loader />;

  return (
    <>
      <Title size="M" fontWeight="M" marginBottom={isDesktopSize ? 18 : 48}>
        {t('verification.Title')}
      </Title>

      <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal70" marginBottom={32} lineHeight={1.6}>
        {t('verification.ForYourSecurity')}
      </BodyText>
      {isDesktopSize ? (
        <CustomCard width="100%">
          <PhoneNumberBlock phone={formatPhoneNumber(phone)} handleContinue={handleContinue} isContinueDisabled={isContinueDisabled} />
        </CustomCard>
      ) : (
        <>
          <PhoneNumberBlock phone={formatPhoneNumber(phone)} handleContinue={handleContinue} isContinueDisabled={isContinueDisabled} />
          <CustomRow justifyContent="center" gap={5} flexWrap="wrap" marginTop={32}>
            <BodyText textType="bodyText" color="charcoal60" size="N" fontWeight="R">
              {t('verification.DidntReceive')}
            </BodyText>
            <BodyText textType="bodyText" color="blue" size="N" fontWeight="M" onClick={generateCode} cursorPointer>
              {t('verification.Resend')}
            </BodyText>
          </CustomRow>
        </>
      )}
    </>
  );
};
