import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { ROUTES } from 'vars/const/ROUTES';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText } from 'components/general/Typography';
import { Loader } from 'components/general/Loader/Loader';
import { SContent, SPageContainer } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { IVerifyEmailForm, IMyInfoEditFromVerify } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { selectCurrentUser, selectIsEmailVerifiedOrAbsent } from 'store/user/authentication.slice';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';
import { MyInfoVerifyEmailForm } from './EmailForm/EmailForm';
import { EditEmailPage } from './EditEmailPage/EditEmailPage';

export const EmailPage = () => {
  const navigate = useNavigate();
  const { generateCodeEmail, generateCodeEmailStatus, saveOnboardingData, openingAccountData, getOnboardingDataIsLoading } = useCashAccountOpening();
  const userData = useSelector(selectCurrentUser);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isContinueButton, setIsContinueButton] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const location = useLocation() as IMyInfoEditFromVerify;
  const isEmailVerifiedOrAbsent = useSelector(selectIsEmailVerifiedOrAbsent);
  const isEmailVerified = isEmailVerifiedOrAbsent && userData?.email;
  const isEditing = location?.state?.isEditing;
  const initialEmail = userData?.email || '';
  const initialValues = {
    email: openingAccountData?.email || initialEmail,
  };

  const handleSubmit = ({ email }: IVerifyEmailForm) => {
    if (email && (isEmailChanged || !isEmailVerified)) {
      generateCodeEmail?.(email);
      saveOnboardingData({ email });
      return;
    }

    if (isEditing && !isEmailChanged) {
      navigate(ROUTES.myInfoSummary.path);
      return;
    }

    saveOnboardingData({ currentUrl: ROUTES.myInfoAge.path });
    navigate(ROUTES.myInfoAge.path);
  };

  useEffect(() => {
    if (generateCodeEmailStatus?.isSuccess) {
      navigate(ROUTES.myInfoVerifySms.path, {
        state: {
          isEditing,
          editingModeHeaderTitle: isEditing ? t('header.Back Email Editing') : '',
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateCodeEmailStatus?.isSuccess]);

  useEffect(() => {
    setIsContinueButton(Boolean(!isEmailChanged && isEmailVerified));
  }, [isEmailChanged, isEmailVerified]);

  if (isEditing) {
    return (
      <EditEmailPage
        isDisabled={isSubmitDisabled || generateCodeEmailStatus?.isLoading}
        getOnboardingDataIsLoading={getOnboardingDataIsLoading}
        handleSubmit={handleSubmit}
        setIsSubmitDisabled={setIsSubmitDisabled}
        email={openingAccountData?.email || initialEmail}
        generateCodeEmailStatus={generateCodeEmailStatus}
        setIsEmailChanged={setIsEmailChanged}
      />
    );
  }

  return (
    <SPageContainer>
      <div>
        <Header title={t('stepper.WhatsYourEmail')} stage="Email" />
        <BodyText textType="bodyText" color="charcoal60" size="N" fontWeight="R" marginBottom={32} lineHeight={1.5} paddingTop={18}>
          {t(
            'myInfo.For your security, we will send a verification code to validate this email address. You will need to log in to your email and enter the 5-digit verification code on the next screen to continue.'
          )}
        </BodyText>
        {getOnboardingDataIsLoading ? (
          <Loader />
        ) : (
          <SContent>
            <MyInfoVerifyEmailForm setIsDisabled={setIsSubmitDisabled} form={form} handleSubmit={handleSubmit} initialValues={initialValues} setIsEmailChanged={setIsEmailChanged} />
          </SContent>
        )}
        {generateCodeEmailStatus?.isError && (
          <BodyText textType="bodyText" marginTop={30} color="red" size="N" fontWeight="R">
            {generateCodeEmailStatus?.errorMessage}
          </BodyText>
        )}
      </div>

      <div className="flex-column">
        <CustomButton preset={isSubmitDisabled ? 'primary-red' : 'primary'} onClick={form.submit} disabled={isSubmitDisabled || generateCodeEmailStatus?.isLoading} marginBottom={24}>
          {isContinueButton ? t('tenxPayCode.Continue') : t('tenxPayEmailVerification.Send verification code')}
        </CustomButton>

        <BodyText textType="bodyText" fontWeight="M" size="T" color="charcoal70" textAlign="end" marginBottom={16} className="next-step" extraStyles={{ alignSelf: 'flex-end' }}>
          {isContinueButton ? `${t('accountOpening.NextStep')} ${t('myInfo.Age')}` : `${t('accountOpening.NextStep')} ${t('accountOpening.Verification')}`}
        </BodyText>
      </div>
    </SPageContainer>
  );
};
