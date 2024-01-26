import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { useLogout } from 'utils/hooks/useLogout';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { useTranslation } from 'react-i18next';
import { errorExclamationMarkImage } from 'assets/images';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Title } from 'components/general/Typography';
import { SLogoutModalContent } from './LogoutModal.styles';

interface ILogoutModal {
  open: boolean;
  onClose: () => void;
}

export const LogoutModal: React.FC<ILogoutModal> = ({ open, onClose }) => {
  const { logout } = useLogout();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <CustomModal open={open} onCancel={onClose} closable={false} width={388} padding="24px">
      <SLogoutModalContent>
        <div className="image-container">
          <img src={errorExclamationMarkImage} alt="enroll" />
        </div>
        <Title size="M" fontWeight="M" marginTop={32} marginBottom={32} textAlign="start" justifyContent="start">
          {t('Logout.Are you sure you want to log out?')}
        </Title>

        <CustomRow width="100%" justifyContent="flex-end" gap={15}>
          <CustomButton preset="red" size="middle" onClick={onClose}>
            {t('Logout.Cancel')}
          </CustomButton>
          <CustomButton preset="primary-red" size="middle" onClick={handleLogout}>
            {t('Logout.Confirm')}
          </CustomButton>
        </CustomRow>
      </SLogoutModalContent>
    </CustomModal>
  );
};
