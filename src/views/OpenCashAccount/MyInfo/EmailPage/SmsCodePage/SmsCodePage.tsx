import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { ROUTES } from 'vars/const/ROUTES';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Title, BodyText } from 'components/general/Typography';
import { Loader } from 'components/general/Loader/Loader';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';
import { IVerifySmsCodeForm, IMyInfoEditFromVerify } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { SContent, SCustomRow, SPageContainer, SButtonWrapper, SCustomButton } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { SmsForm } from './SmsForm';
import { ResendCodeText } from './ResendCodeText/ResendCodeText';

export const SmsCodePage: React.FC = () => {
  const navigate = useNavigate();
  const { checkCodeEmail, generateCodeEmail, generateCodeEmailStatus, checkCodeEmailStatus, openingAccountData, saveOnboardingData } = useCashAccountOpening();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [form] = Form.useForm();
  const { t } = useTranslation(undefined, { keyPrefix: 'myInfo' });
  const location = useLocation() as IMyInfoEditFromVerify;
  const isEditing = location?.state?.isEditing;

  const handleFormSubmit = (values: IVerifySmsCodeForm) => {
    checkCodeEmail?.(values?.emailCode);
  };

  const errorMessage = (generateCodeEmailStatus?.isError || checkCodeEmailStatus?.isError) && (generateCodeEmailStatus?.errorMessage || checkCodeEmailStatus?.errorMessage);
  const isLoading = generateCodeEmailStatus?.isLoading || checkCodeEmailStatus?.isLoading;

  const resendCode = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    if (openingAccountData.email) {
      generateCodeEmail?.(openingAccountData.email);
    }
  };

  useEffect(() => {
    if (checkCodeEmailStatus?.isSuccess) {
      saveOnboardingData({ currentUrl: ROUTES.myInfoAge.path });
      navigate(ROUTES.myInfoAge.path);
    }
    // eslint-disable-next-line
  }, [checkCodeEmailStatus?.isSuccess]);

  return (
    <SPageContainer>
      {isLoading && <Loader />}
      <div>
        <Header title={t(isEditing ? 'We’ve sent a verification code' : 'Email')} stage={!isEditing ? 'Email' : ''} />
        {!isEditing && (
          <Title textAlign="start" color="charcoal" fontWeight="M" size="S">
            {t('We’ve sent a verification code')}
          </Title>
        )}
        <BodyText textType="bodyText" textAlign="start" color="charcoal60" fontWeight="R" size="N" marginTop={10} marginBottom={32}>
          {t(isEditing ? 'Check your mobile phone or email.' : 'CheckYourEmail')}
        </BodyText>
        <SContent>
          <SmsForm handleSubmit={handleFormSubmit} onCompletion={setIsSubmitDisabled} form={form} />
        </SContent>
        {errorMessage && (
          <BodyText textType="errorText" marginTop={30} color="red" size="N" fontWeight="R">
            {errorMessage}
          </BodyText>
        )}
        {isEditing && <ResendCodeText resendCode={resendCode} />}
      </div>

      <SButtonWrapper>
        {!isEditing && (
          <CustomRow justifyContent="flex-end" marginBottom={16}>
            <BodyText textType="bodyText" fontWeight="M" size="T" color="charcoal70" textAlign="end">
              {`${t('NextStep')} ${t('AgeTaxID')}`}
            </BodyText>
          </CustomRow>
        )}
        <SCustomButton disabled={isSubmitDisabled} onClick={form.submit} preset="primary">
          <SCustomRow>
            {isEditing ? (
              t('Continue')
            ) : (
              <>
                <BodyText textType="bodyText" textAlign="start" color="white" size="L" fontWeight="M">
                  {t('Continue')}
                </BodyText>
                <Icon color="white" name="chevronRight" size="smaller" />
              </>
            )}
          </SCustomRow>
        </SCustomButton>
        {!isEditing && <ResendCodeText resendCode={resendCode} />}
      </SButtonWrapper>
    </SPageContainer>
  );
};
