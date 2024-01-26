import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { RegistrationFormData } from 'vars/types/registration.types';
import { useGenerateCodeMutation } from 'store/user/registration/registration.api';
import { setRegistrationState } from 'store/user/registration/registration.slice';
import { getBackendErrorData } from 'utils/helpers/rtqErrorHandling';
import { getUnmaskedMobileNumber } from 'utils/helpers/phoneNumber';
import { ROUTES } from 'vars/const/ROUTES';
import { API_ROUTES } from 'vars/const/API_ROUTES';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { useFormHelpers } from 'utils/hooks/useFormHelpers';
import { getRequiredRule, passwordRules, getPhoneValidator } from 'utils/helpers/validationRules';
import { useFormValidationHelper } from 'views/Auth/ChangePasswordPage/ChangePasswordForm/useFormValidationHelper';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { MaskedInput } from 'components/general/MaskedInput/MaskedInput';
import { useDisclosures } from 'utils/hooks/useDisclosures';
import { lsGetItem, lsSetItem, lsRemoveItem } from 'utils/helpers/storage';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { BodyText } from 'components/general/Typography';
import { Loader } from 'components/general/Loader/Loader';
import { ConsentCheckbox } from './ConsentCheckbox/ConsentCheckbox';
import { DisclosureSheet } from './DisclosureSheet/DisclosureSheet';
import { SAction, SFields, SSubmitError, SButtonWrapper, SInputGroupRegForm } from './RegistrationForm.styles';

const PHONE_MASK = '(000) 000 0000';

const PHONE_MASK_OPTIONS = {
  lazy: true,
};

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDesktopSize } = useDeviceDimension();
  const { t } = useTranslation();

  const [generateCode, generateCodeResult] = useGenerateCodeMutation();
  const { getPrivacyPolicyDisclosureResult, getTermsOfUseDisclosureResult, disclosuresData, getPrivacyPolicyDisclosure, getTermsOfUseDisclosure } = useDisclosures();
  const [form] = Form.useForm();
  const { hasErrors, checkErrors } = useFormHelpers(form);
  const { passwordErrors, handleFormChange, formValidationHelpStates } = useFormValidationHelper(form, 'password');
  const [isDisclosureSheetOpen, setIsDisclosureSheetOpen] = useState<boolean>(false);

  const [isPrivacyChecked, setIsPrivacyChecked] = useState<boolean>(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState<boolean>(false);

  const [isTermsOfUseChecked, setIsTermsOfUseChecked] = useState<boolean>(false);
  const [isTermsOfUseAccepted, setIsTermsOfUseAccepted] = useState<boolean>(false);

  const [isSelectedPrivacy, setIsSelectedPrivacy] = useState<boolean>(false);
  const [shouldRemember, setShouldRemember] = useState(!!lsGetItem('shouldRemember'));
  const [errorMsg, setErrorMsg] = useState('');

  const isDisabled: boolean =
    hasErrors ||
    passwordErrors?.length > 0 ||
    form.getFieldValue('password')?.length === 0 ||
    form.getFieldValue('password')?.length === undefined ||
    !isPrivacyChecked ||
    !isTermsOfUseChecked ||
    !isPrivacyAccepted ||
    !isTermsOfUseAccepted;

  const mobileLabel = <CustomText font="DM Sans">{t('registration.MobileNumber')}</CustomText>;
  const passwordLabel = <CustomText font="DM Sans">{t('registration.Password')}</CustomText>;
  const usernameLabel = <CustomText font="DM Sans">{t('registration.Username')}</CustomText>;

  const onFinish = async ({ phone, username, password }: RegistrationFormData) => {
    const rawMobileNumber = getUnmaskedMobileNumber(`1${phone}`);

    dispatch(
      setRegistrationState({
        phone: rawMobileNumber,
        username,
        password,
      })
    );

    try {
      const generateCodeRes = await generateCode({ phone: rawMobileNumber, username }).unwrap();
      if (generateCodeRes) {
        console.log(`${API_ROUTES.auth.register.generateCode} response: ${generateCodeRes}`);
        const phoneLastFourDigits = phone.slice(-4);
        navigate(ROUTES.registrationCode.path, { state: { phoneLastFourDigits } });
      }
    } catch (errorRes) {
      const errorData = getBackendErrorData(errorRes);

      if (errorData?.Error) {
        setErrorMsg(errorData.Error);
      }
    }
  };

  const handleCloseSheet = () => {
    setIsDisclosureSheetOpen(false);
  };

  const handleChangePrivacyCheckbox = () => {
    setIsPrivacyChecked((preVal) => !preVal);
  };

  const handleChangeTermsOfUseCheckbox = () => {
    setIsTermsOfUseChecked((preVal) => !preVal);
  };

  const handleChangeRememberMe = () => {
    const newVal = !shouldRemember;
    if (newVal) {
      lsSetItem('shouldRemember', 1);
    } else {
      lsRemoveItem('shouldRemember');
    }
    setShouldRemember((preVal) => !preVal);
  };

  const handleOpenSheet = () => {
    setIsDisclosureSheetOpen(true);
  };

  const handleOpenTerms = () => {
    setIsSelectedPrivacy(false);
    handleOpenSheet();
  };

  const handleOpenPrivacy = () => {
    setIsSelectedPrivacy(true);
    handleOpenSheet();
  };

  const handlePrivacyButtonClick = () => {
    setIsPrivacyChecked(true);
    setIsPrivacyAccepted(true);
    setIsDisclosureSheetOpen(false);
  };

  const handleTermsOfUseButtonClick = () => {
    setIsTermsOfUseChecked(true);
    setIsTermsOfUseAccepted(true);
    setIsDisclosureSheetOpen(false);
  };

  const handleAlreadyHaveAccount = () => {
    navigate(ROUTES.login.path, { state: { isFromRegistration: true } });
  };

  if (getTermsOfUseDisclosureResult?.isFetching || getPrivacyPolicyDisclosureResult?.isFetching) return <Loader />;

  return (
    <>
      <Form onFinish={onFinish} autoComplete="off" layout="vertical" form={form} requiredMark={false} onFieldsChange={checkErrors}>
        <SFields>
          <Form.Item
            label={mobileLabel}
            name="phone"
            validateTrigger={['onBlur', 'onChange']}
            rules={[getRequiredRule(t('registration.InputMobile')), getPhoneValidator(t('registration.InputCompleteMobile'))]}
          >
            <MaskedInput onBeige={!isDesktopSize} mask={PHONE_MASK} maskOptions={PHONE_MASK_OPTIONS} placeholder={t('registration.EnterMobileNumber')} inputMode="tel" />
          </Form.Item>

          <Form.Item label={usernameLabel} name="username" validateTrigger={['onBlur', 'onChange']} rules={[getRequiredRule('profile.Please input your username')]}>
            <MaskedInput onBeige={!isDesktopSize} mask={/\S+/} placeholder={t('registration.EnterUsername')} inputMode="text" autoCapitalize="off" />
          </Form.Item>

          {!isDesktopSize && (
            <div className="remember-me">
              <SInputGroupRegForm>
                <Checkbox checked={shouldRemember} onChange={handleChangeRememberMe} bgColor="white">
                  <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginTop={5}>
                    {t('registration.RememberMe')}
                  </BodyText>
                </Checkbox>
              </SInputGroupRegForm>
            </div>
          )}

          <Form.Item
            label={passwordLabel}
            name="password"
            validateTrigger={['onBlur', 'onChange']}
            rules={[...passwordRules, getRequiredRule(t('registration.PasswordNotSpaces'), true)]}
            help={formValidationHelpStates}
          >
            <BaseInput
              type="password"
              onBeige={!isDesktopSize}
              placeholder={t('registration.EnterPassword')}
              autoComplete="new-password"
              data-testid="passwordInput"
              onKeyUp={handleFormChange}
              isError={generateCodeResult.isError && passwordErrors.length > 0 && form.getFieldValue('password')?.length > 0}
              isSuccess={passwordErrors.length === 0 && form.getFieldValue('password')?.length > 0}
              passwordIcon
            />
          </Form.Item>

          {errorMsg && (
            <SSubmitError textColor="red" size="big" textAlign="center" marginBottom={14}>
              {errorMsg}
            </SSubmitError>
          )}
        </SFields>

        <ConsentCheckbox isChecked={isPrivacyChecked} handleChangeCheckbox={handleChangePrivacyCheckbox} disclosureName={getPrivacyPolicyDisclosure?.name} handleOpen={handleOpenPrivacy} />
        <ConsentCheckbox isChecked={isTermsOfUseChecked} handleChangeCheckbox={handleChangeTermsOfUseCheckbox} disclosureName={getTermsOfUseDisclosure?.name} handleOpen={handleOpenTerms} />

        <SButtonWrapper>
          <Form.Item>
            <CustomButton preset="primary" type="submit" disabled={isDisabled}>
              {t('registration.Register')}
            </CustomButton>
          </Form.Item>
        </SButtonWrapper>

        <SAction>
          <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" marginRight={3}>
            {t('registration.AlreadyRegistered')}
          </BodyText>
          <BodyText textType="bodyText" size="N" fontWeight="M" cursorPointer color="blue" onClick={handleAlreadyHaveAccount}>
            {t('registration.Login')}
          </BodyText>
        </SAction>
      </Form>

      {isSelectedPrivacy ? (
        <DisclosureSheet
          name={disclosuresData?.disclosureName}
          isOpen={isDisclosureSheetOpen}
          handleCloseSheet={handleCloseSheet}
          handleButtonClick={handlePrivacyButtonClick}
          handleCheckboxClick={handleChangePrivacyCheckbox}
          subTitle={disclosuresData?.disclosureSubTitle}
          acceptCheckBoxText={disclosuresData?.disclosureAcceptCheckBoxText}
          isChecked={isPrivacyChecked}
          acceptButtonText={disclosuresData?.disclosureAcceptButtonText}
          errorMessage={getPrivacyPolicyDisclosureResult?.errorMessage}
          disclosureText={disclosuresData?.disclosureText}
          isError={getPrivacyPolicyDisclosureResult?.isError}
        />
      ) : (
        <DisclosureSheet
          name={disclosuresData?.termsOfUseName}
          isOpen={isDisclosureSheetOpen}
          handleCloseSheet={handleCloseSheet}
          handleButtonClick={handleTermsOfUseButtonClick}
          handleCheckboxClick={handleChangeTermsOfUseCheckbox}
          subTitle={disclosuresData?.termsOfUseSubTitle}
          acceptCheckBoxText={disclosuresData?.termsOfUseAcceptCheckBoxText}
          isChecked={isTermsOfUseChecked}
          acceptButtonText={disclosuresData?.termsOfUseAcceptButtonText}
          errorMessage={getTermsOfUseDisclosureResult?.errorMessage}
          disclosureText={disclosuresData?.termsOfUseText}
          isError={getTermsOfUseDisclosureResult?.isError}
        />
      )}
    </>
  );
};
