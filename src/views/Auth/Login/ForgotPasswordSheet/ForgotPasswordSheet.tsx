import React from 'react';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { ForgotPasswordForm } from 'views/Auth/Login/ForgotPasswordForm/ForgotPasswordForm';
import { useSelector } from 'react-redux';
import { selectForgotPasswordData } from 'store/user/forgotPassword/forgotPassword.slice';
import { TFormData } from 'views/Auth/Login/Login.types';

type TSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onFinish: (values: TFormData) => void;
};

export const ForgotPasswordSheet: React.FC<TSheetProps> = ({ isOpen, onClose, onFinish }) => {
  const { t } = useTranslation();
  const { username } = useSelector(selectForgotPasswordData);

  return (
    <CustomSheet isOpen={isOpen} onClose={onClose} header={false} headerStyle={{ minHeight: 0, padding: 0 }}>
      <Title font="Poppins" color="charcoal" marginTop={10} marginBottom={10} fontWeight="SB" size="S">
        {t('registration.ForgotPassword')}
      </Title>

      <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5} marginBottom={28}>
        {t('registration.EnterYourUsernameAndWeWillSend')}
      </BodyText>

      <ForgotPasswordForm isOpen={isOpen} onFinish={onFinish} username={username} />
    </CustomSheet>
  );
};
