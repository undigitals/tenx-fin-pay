import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { useGetNewOtpSeedMutation, useLoginMutation } from 'store/user/authentication.api';
import { LoginRequest } from 'vars/types/authentication.types';
import { setUsername } from 'store/user/forgotPassword/forgotPassword.slice';
import { selectCurrentAuthState } from 'store/user/authentication.slice';
import { SActions, SFaceIdInfoWrapper, SForgotLink, SLink } from 'views/Auth/Login/LoginPage/LoginPage.styles';
import { lsGetItem, lsRemoveItem, lsSetItem } from 'utils/helpers/storage';
import { isErrorWithMessage, isFetchBaseQueryError, isBackendError } from 'utils/helpers/rtqErrorHandling';
import { showNotification } from 'utils/helpers/notification/showNotification';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { Loader } from 'components/general/Loader/Loader';
import { API_RESPONSE_CODES } from 'vars/const/API_CODES';
import { getRequiredRule } from 'utils/helpers/validationRules';
import { getFingerpint } from 'utils/helpers/webID';
import { BodyText } from 'components/general/Typography';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { Icon } from 'components/general/Icon/Icon';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { SFieldInputContainer, SInputGroup, SButtonWrapper } from './LoginForm.styles';

const { Paragraph } = Typography;

interface LocationStateProps {
  from: { pathname: string };
}

type TLoginFormProps = {
  handleForgotUsernameClick?: () => void;
  handleForgotPasswordClick?: () => void;
  handleTenxPolicyClick?: () => void;
};

export const LoginForm: React.FC<TLoginFormProps> = ({ handleForgotUsernameClick, handleForgotPasswordClick, handleTenxPolicyClick }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isDesktopSize } = useDeviceDimension();
  const locationState = location?.state as LocationStateProps;
  const [form] = Form.useForm();
  const currentUser = useSelector(selectCurrentAuthState);
  const savedUserName = lsGetItem('savedUserName');
  const shouldRemember = lsGetItem('shouldRemember');
  const deviceId = lsGetItem('deviceId');
  const [hasLoginErrors, setHasLoginErrors] = useState<boolean>(false);
  const navigate = useNavigate();
  const [login, loginResult] = useLoginMutation();
  const [getNewOtpSeed, { isLoading: isGetNewOtpSeedLoading }] = useGetNewOtpSeedMutation();
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const usernameVal = Form.useWatch('username', form);
  const isLoading = loginResult.isLoading || isGetNewOtpSeedLoading;

  const onFinish = async (values: LoginRequest & { rememberMe: boolean }) => {
    const fingerprint = getFingerpint(true) as string;

    if (values.rememberMe) {
      lsSetItem('shouldRemember', 1);
    } else {
      lsRemoveItem('shouldRemember');
    }

    try {
      await login({ ...values, fingerprint, deviceId }).unwrap();
    } catch (err) {
      // @ts-ignore
      if (isBackendError(err) && err.data.Code === API_RESPONSE_CODES.NO_DEVICE_ID) {
        getNewOtpSeed({
          ...values,
          fingerprint,
          deviceType: 'Browser',
        })
          .unwrap()
          .then((otpSeedRes) => {
            lsSetItem('loginOtpFlow', otpSeedRes);
            navigate(ROUTES.verifyDeviceWarning.path);
          });

        return;
      }

      if (isFetchBaseQueryError(err)) {
        // @ts-ignore
        const errorMessage = 'error' in err ? err.error : JSON.stringify(err.data);
        showNotification({
          type: 'error',
          message: JSON.parse(errorMessage).Error,
        });
      } else if (isErrorWithMessage(err)) {
        showNotification({
          type: 'error',
          // @ts-ignore
          message: err.message,
        });
      }
    }
  };

  const onFieldsChange = () => {
    const isUsernameEmpty = form.getFieldValue('username') === '';
    const isPasswordEmpty = form.getFieldValue('password') === '';
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const isFormTouched = form.isFieldsTouched(true);
    setSubmitDisabled((isUsernameEmpty ? !isFormTouched : isPasswordEmpty) || hasErrors);
    setHasLoginErrors(form.getFieldError('username')?.length > 0);
  };

  const onForgotPasswordClick = () => {
    dispatch(setUsername(usernameVal));
    if (handleForgotPasswordClick) handleForgotPasswordClick();
  };

  const getUsernameFieldLabel = () => (
    <SFieldInputContainer>
      <div>{t('loginScreen.Username')}:</div>

      <SForgotLink onClick={handleForgotUsernameClick}>{t('loginScreen.Forgot username')}</SForgotLink>
    </SFieldInputContainer>
  );

  const getPasswordFieldLabel = () => (
    <SFieldInputContainer>
      <div>{t('loginScreen.Password')}</div>

      <SForgotLink onClick={onForgotPasswordClick}>{t('loginScreen.Forgot password')}</SForgotLink>
    </SFieldInputContainer>
  );

  useEffect(() => {
    if (loginResult.isSuccess) {
      if (loginResult.data.client?.isDocumentRequestPending) {
        navigate(ROUTES.uploadDocument.path);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        locationState && locationState.from && locationState.from.pathname !== ROUTES.mainMenu.path
          ? navigate(locationState.from.pathname)
          : navigate(loginResult?.data?.systemProperties?.postLoginURL ?? ROUTES.home.path);
      }
    }
  }, [loginResult]);

  useEffect(() => {
    lsRemoveItem('loginOtpFlow');
  }, [loginResult?.isSuccess]);

  return (
    <Form
      onFinish={onFinish}
      name="loginForm"
      onFieldsChange={onFieldsChange}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      form={form}
      initialValues={{
        username: savedUserName ?? '',
        rememberMe: !!shouldRemember,
      }}
    >
      {isLoading && <Loader />}
      <SInputGroup>
        <Form.Item
          className="username-field"
          label={getUsernameFieldLabel()}
          name="username"
          validateTrigger={['onBlur', 'onChange']}
          validateFirst
          rules={[getRequiredRule('loginScreen.Please input phone or username')]}
        >
          <BaseInput onBeige={!isDesktopSize} disabled={Boolean(currentUser.userMobileNumber)} data-testid="mobileInput" isError={hasLoginErrors} tabIndex={1} />
        </Form.Item>

        <Form.Item name="rememberMe" valuePropName="checked" className="remember-me">
          <Checkbox color="charcoal" bgColor="white">
            {t('loginScreen.RememberMe')}
          </Checkbox>
        </Form.Item>

        <Form.Item label={getPasswordFieldLabel()} name="password" rules={[getRequiredRule('loginScreen.Please input password')]}>
          <BaseInput
            onBeige={!isDesktopSize}
            type="password"
            placeholder="*************"
            autoComplete="new-password"
            data-testid="passwordInput"
            passwordIcon
            suffixColor="blue"
            suffixSize="big"
            tabIndex={2}
          />
        </Form.Item>
      </SInputGroup>

      <SButtonWrapper>
        <Form.Item>
          <CustomButton preset="primary" type="submit" disabled={isSubmitDisabled}>
            {t('loginScreen.Log in')}
          </CustomButton>
        </Form.Item>
      </SButtonWrapper>

      {!isDesktopSize && (
        <SFaceIdInfoWrapper>
          <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" marginBottom={10}>
            {t('loginScreen.LogInWithFaceId')}
          </BodyText>

          <Icon name="faceIdBig" color="blue" cursorPointer size="biggest" />
        </SFaceIdInfoWrapper>
      )}

      <SActions>
        <Paragraph style={{ textAlign: 'center' }}>
          <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70">
            {t("loginScreen.Don't have an account?")}
          </BodyText>

          <SLink to={ROUTES.registration.path}>{t('loginScreen.Sign up')}</SLink>
        </Paragraph>

        <SLink onClick={handleTenxPolicyClick} to="">
          <span>{t('loginScreen.TenxPrivacyPolicy')}</span>
        </SLink>
      </SActions>
    </Form>
  );
};
