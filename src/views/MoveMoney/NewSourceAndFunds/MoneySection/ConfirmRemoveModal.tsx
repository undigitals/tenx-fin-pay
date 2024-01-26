import React from 'react';
import { Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { useTranslation } from 'react-i18next';
import exclamation from 'assets/images/exclamation.svg';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  remove: () => void;
}

export const ConfirmRemoveModal: React.FC<IModalProps> = ({ isOpen, onClose, remove }) => {
  const { t } = useTranslation();

  return (
    <CustomModal open={isOpen} onCancel={onClose} destroyOnClose centered footer={null} closeIconColor="charcoal70" topPosition="10%">
      <CustomRow justifyContent="center" marginBottom={35}>
        <img src={exclamation} alt="exclamation" />
      </CustomRow>
      <Title fontWeight="M" color="charcoal" font="Poppins" size="M" marginBottom={15} paddingLeft={10}>
        {t('moveMoney.WantToRemove')}
      </Title>

      <CustomButton preset="primary" size="xl" onClick={onClose} marginBottom={12}>
        {t('moveMoney.KeepAccount')}
      </CustomButton>
      <CustomButton onClick={remove} size="xl">
        {t('moveMoney.RemoveAccount')}
      </CustomButton>
    </CustomModal>
  );
};
