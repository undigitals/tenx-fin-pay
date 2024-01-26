import React from 'react';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { Title } from 'components/general/Typography';
import { ForgotUsernameForm } from 'views/Auth/Login/ForgotUsernameForm/ForgotUsernameForm';
import { useTranslation } from 'react-i18next';
import { TForgotUsernameSheetProps } from 'views/Auth/Login/Login.types';

export const ForgotUsernameSheet: React.FC<TForgotUsernameSheetProps> = ({ isOpen, onClose, onFinish }) => {
  const { t } = useTranslation();

  return (
    <CustomSheet isOpen={isOpen} onClose={onClose} header={false} headerStyle={{ minHeight: 0, padding: 0 }}>
      <Title font="Poppins" color="charcoal" marginTop={10} marginBottom={26} fontWeight="SB" size="S">
        {t('loginScreen.ForgotUsername')}
      </Title>

      <ForgotUsernameForm onFinish={onFinish} />
    </CustomSheet>
  );
};
