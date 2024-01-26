import React, { useEffect } from 'react';
import { useLogin } from 'utils/hooks/useLogin';
import { useForgotUsernameMutation, useLoginMutation } from 'store/user/authentication.api';
import { Spinner } from 'components/general/Spinner/Spinner';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { LoginForm } from 'views/Auth/Login/LoginForm/LoginForm';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { lsGetItem } from 'utils/helpers/storage';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { ForgotPasswordSheet } from 'views/Auth/Login/ForgotPasswordSheet/ForgotPasswordSheet';
import { ForgotPasswordModal } from 'views/Auth/Login/ForgotPasswordModal/ForgotPasswordModal';
import { useToggle } from 'utils/hooks/useToggle';
import { ForgotUsernameSheet } from 'views/Auth/Login/ForgotUsernameSheet/ForgotUsernameSheet';
import { ForgotUsernameModal } from 'views/Auth/Login/ForgotUsernameModal/ForgotUsernameModal';
import { TForgotUsernameConfirm, TFormData } from 'views/Auth/Login/Login.types';
import { getFingerpint } from 'utils/helpers/webID';
import { useStartPasswordResetMutation } from 'store/user/forgotPassword/forgotPassword.api';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { useDisclosures } from 'utils/hooks/useDisclosures';
import { DisclosureSheet } from 'views/Auth/Registration/RegistrationPage/RegistrationForm/DisclosureSheet/DisclosureSheet';
import { getUnmaskedMobileNumber } from 'utils/helpers/phoneNumber';
import { SLayout, STitle } from './LoginPage.styles';

// Testing phone: +18566265400;

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDesktopSize } = useDeviceDimension();
  const [, { isLoading }] = useLoginMutation();
  const loginClick = useLogin();
  const savedName = lsGetItem('savedPreferredName') ?? lsGetItem('savedFirstName');
  const deviceId = lsGetItem('deviceId');
  const [forgotUsername] = useForgotUsernameMutation();
  const [startPasswordReset] = useStartPasswordResetMutation();
  const { getPrivacyPolicyDisclosure } = useDisclosures();
  const { isActive: isPasswordSheetOpen, show: onPasswordSheetShow, hide: onPasswordSheetClose } = useToggle(false);
  const { isActive: isUsernameSheetOpen, show: onUsernameSheetShow, hide: onUsernameSheetClose } = useToggle(false);
  const percPrivPolicySheet = useToggle();

  const motionVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
  };

  const handleForgotUsernameClick = () => {
    onUsernameSheetShow();
  };

  const handleForgotUsernameConfirm = ({ email, phone }: TForgotUsernameConfirm) => {
    const requestData: TForgotUsernameConfirm = {};
    if (email) requestData.email = email;
    if (phone) requestData.phone = getUnmaskedMobileNumber(`1 ${phone}`);

    onUsernameSheetClose();
    forgotUsername(requestData)
      .unwrap()
      .then(() => navigate(ROUTES.forgotUsernameSent.path));
  };

  const handleForgotPasswordClick = () => {
    onPasswordSheetShow();
  };

  const startResetPassword = ({ username }: TFormData) => {
    const fingerprint = getFingerpint(true) as string;
    startPasswordReset({
      username,
      fingerprint,
    })
      .unwrap()
      .then(() => navigate(ROUTES.forgotPassword.path))
      .catch(() => navigate(ROUTES.forgotDataInformationSent.path));
  };

  useEffect(() => {
    if (deviceId === undefined && !location.state?.isFromRegistration && !location.state?.navigateToLogin) {
      navigate(ROUTES.onboardingLanguageSelection.path);
    }
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <SLayout as={motion.div} variants={motionVariants} animate={loginClick.motionVariant()}>
        <STitle fontWeight="M" size="L" marginBottom={34}>
          {deviceId ? t('loginScreen.WelcomeBack', { context: savedName ? 'name' : '', name: savedName }) : t('loginScreen.Welcome')}
        </STitle>

        {isDesktopSize ? (
          <CustomCard width="100%">
            <LoginForm handleForgotUsernameClick={handleForgotUsernameClick} handleForgotPasswordClick={handleForgotPasswordClick} handleTenxPolicyClick={percPrivPolicySheet.show} />
          </CustomCard>
        ) : (
          <LoginForm handleForgotUsernameClick={handleForgotUsernameClick} handleForgotPasswordClick={handleForgotPasswordClick} handleTenxPolicyClick={percPrivPolicySheet.show} />
        )}
      </SLayout>

      {isDesktopSize ? (
        <>
          <ForgotUsernameModal isOpen={isUsernameSheetOpen} onClose={onUsernameSheetClose} onFinish={handleForgotUsernameConfirm} />
          <ForgotPasswordModal isOpen={isPasswordSheetOpen} onClose={onPasswordSheetClose} onFinish={startResetPassword} />
        </>
      ) : (
        <>
          <ForgotUsernameSheet isOpen={isUsernameSheetOpen} onClose={onUsernameSheetClose} onFinish={handleForgotUsernameConfirm} />
          <ForgotPasswordSheet isOpen={isPasswordSheetOpen} onClose={onPasswordSheetClose} onFinish={startResetPassword} />
        </>
      )}

      <DisclosureSheet
        name={getPrivacyPolicyDisclosure?.name}
        isOpen={percPrivPolicySheet.isActive}
        handleCloseSheet={percPrivPolicySheet.hide}
        subTitle={getPrivacyPolicyDisclosure?.subTitle}
        acceptCheckBoxText={getPrivacyPolicyDisclosure?.acceptCheckBoxText}
        acceptButtonText={getPrivacyPolicyDisclosure?.acceptButtonText}
        disclosureText={getPrivacyPolicyDisclosure?.text}
        isReadOnly
      />
    </>
  );
};
