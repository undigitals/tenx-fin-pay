import React from 'react';
import { BodyText, Title } from 'components/general/Typography';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { useTranslation } from 'react-i18next';

interface IProps {
  open: boolean;
  onClose: () => void;
  openDeleteModal: () => void;
  status?: string;
}

export const SettingsModal: React.FC<IProps> = ({ open, onClose, openDeleteModal, status }) => {
  const { t } = useTranslation();
  const handleOpenModal = () => {
    onClose();
    openDeleteModal();
  };
  return (
    <CustomSheet isOpen={open} onClose={onClose} header={false} className="settings-sheet">
      <Title font="Poppins" fontWeight="SB" size="S" color="charcoal">
        {t('notificationsCenter.Settings')}
      </Title>

      <CustomRow marginTop={32} justifyContent="flex-start" cursorPointer onClick={handleOpenModal}>
        <Icon name="trash" marginRight={14} cursorPointer />
        <CustomRow flexDirection="column" alignItems="flex-start">
          <BodyText textType="bodyText" size="N" fontWeight="M" color="charcoal" lineHeight={1.5} cursorPointer>
            {t('notificationsCenter.Delete')}
          </BodyText>
          <BodyText textType="bodyText" size="T" fontWeight="R" color="charcoal70">
            {t('notificationsCenter.DeleteNotification')}
          </BodyText>
        </CustomRow>
      </CustomRow>
      <CustomRow marginTop={16} justifyContent="flex-start" marginBottom={status === 'Read' ? 0 : 32} cursorPointer>
        <Icon name="bellSlash" marginRight={14} cursorPointer />
        <CustomRow flexDirection="column" alignItems="flex-start">
          <BodyText textType="bodyText" size="N" fontWeight="M" color="charcoal" lineHeight={1.5} cursorPointer>
            {t('notificationsCenter.TurnOff')}
          </BodyText>
          <BodyText textType="bodyText" size="T" fontWeight="R" color="charcoal70">
            {t('notificationsCenter.StopReceiving')}
          </BodyText>
        </CustomRow>
      </CustomRow>
      {status === 'Read' && (
        <CustomRow marginTop={16} justifyContent="flex-start" marginBottom={32} cursorPointer>
          <Icon name="book" marginRight={14} cursorPointer />
          <CustomRow flexDirection="column" alignItems="flex-start">
            <BodyText textType="bodyText" size="N" fontWeight="M" color="charcoal" lineHeight={1.5} cursorPointer>
              {t('notificationsCenter.MarkUnread')}
            </BodyText>
            <BodyText textType="bodyText" size="T" fontWeight="R" color="charcoal70">
              {t('notificationsCenter.MarkNotificationUnread')}
            </BodyText>
          </CustomRow>
        </CustomRow>
      )}
    </CustomSheet>
  );
};
