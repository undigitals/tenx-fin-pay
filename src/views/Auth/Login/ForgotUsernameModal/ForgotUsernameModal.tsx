import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { ForgotUsernameForm } from 'views/Auth/Login/ForgotUsernameForm/ForgotUsernameForm';
import { TForgotUsernameSheetProps } from 'views/Auth/Login/Login.types';
import { Title } from 'components/general/Typography';
import { SCloseIcon, SContent } from './ForgotUsernameModal.styles';

export const ForgotUsernameModal: React.FC<TForgotUsernameSheetProps> = ({ isOpen, onClose, onFinish }) => {
  const { t } = useTranslation();

  return (
    <CustomModal visible={isOpen} open={isOpen} closable={false} topPosition="5%" width="60%">
      <SCloseIcon name="closeCircle" color="charcoal70" size="big" onClick={onClose} cursorPointer />
      <SContent>
        <Title font="Poppins" color="charcoal" marginTop={10} marginBottom={26} fontWeight="M" size="M">
          {t('loginScreen.ForgotUsername')}
        </Title>
        <div className="forgot-username-form">
          <ForgotUsernameForm onFinish={onFinish} />
        </div>
      </SContent>
    </CustomModal>
  );
};
