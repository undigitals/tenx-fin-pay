import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BodyText, Title } from 'components/general/Typography';
import { ForgotPasswordForm } from 'views/Auth/Login/ForgotPasswordForm/ForgotPasswordForm';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { selectForgotPasswordData } from 'store/user/forgotPassword/forgotPassword.slice';
import { TFormData } from 'views/Auth/Login/Login.types';
import { SCloseIcon, SContent, SDiv } from './ForgotPasswordModal.styles';

type TForgotPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onFinish: (values: TFormData) => void;
};

export const ForgotPasswordModal: React.FC<TForgotPasswordModalProps> = ({ isOpen, onClose, onFinish }) => {
  const { t } = useTranslation();
  const { username } = useSelector(selectForgotPasswordData);

  return (
    <CustomModal visible={isOpen} closable={false} topPosition="5%" width="60%">
      <SCloseIcon name="closeCircle" color="charcoal70" size="big" onClick={onClose} cursorPointer />
      <SContent>
        <Title font="Poppins" color="charcoal" marginTop={10} marginBottom={10} fontWeight="SB" size="S">
          {t('registration.ForgotPassword')}
        </Title>

        <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5} marginBottom={28}>
          {t('registration.EnterYourUsernameAndWeWillSend')}
        </BodyText>

        <SDiv>
          <ForgotPasswordForm isOpen={isOpen} onFinish={onFinish} username={username} />
        </SDiv>
      </SContent>
    </CustomModal>
  );
};
