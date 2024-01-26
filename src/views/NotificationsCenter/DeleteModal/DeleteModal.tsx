import React from 'react';
import { useTranslation } from 'react-i18next';
import { images } from 'assets';
import { Title } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useDeleteNotificationByIdMutation, useLazyGetNotificationsQuery } from 'store/user/users.api';

interface IDeleteModal {
  open: boolean;
  onClose: () => void;
  alertHistoryId: string;
}

export const DeleteModal: React.FC<IDeleteModal> = ({ open, onClose, alertHistoryId }) => {
  const { t } = useTranslation();
  const [deleteNotificationById] = useDeleteNotificationByIdMutation();
  const [getNotifications] = useLazyGetNotificationsQuery();

  const deleteNotification = () => {
    deleteNotificationById(alertHistoryId)
      .unwrap()
      .then(() => getNotifications(false));
    onClose();
  };
  return (
    <CustomModal open={open} onCancel={onClose} topPosition="8%" padding="15px" className="deleteModal">
      <CustomRow justifyContent="center" marginBottom={35}>
        <img src={images.errorExclamationMarkImage} alt={t('notificationsCenter.DeleteNotification')} />
      </CustomRow>
      <Title fontWeight="SM" color="charcoal" font="Poppins" size="M" marginBottom={15} paddingLeft={10}>
        {t('notificationsCenter.WantToDelete')}
      </Title>

      <CustomRow justifyContent="flex-end" gap={10} marginTop={35} marginBottom={15} marginRight={7}>
        <CustomButton preset="red" size="middle" onClick={onClose}>
          {t('notificationsCenter.No')}
        </CustomButton>

        <CustomButton preset="primary-red" size="middle" onClick={deleteNotification}>
          {t('notificationsCenter.Yes')}
        </CustomButton>
      </CustomRow>
    </CustomModal>
  );
};
