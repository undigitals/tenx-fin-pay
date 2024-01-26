import React from 'react';
import { Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { NotificationsTab } from './NotificationsTab/NotificationsTab';
import { NotificationsTabLayout } from './NotificationsTab/NotificationsTab.styles';

export const NotificationsAndAlertsPage = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'notificationsAlerts' });
  return (
    <NotificationsTabLayout>
      <Title textAlign="start" size="S" marginBottom="spacing-x-large" fontWeight="SB">
        {t('Notifications&Alerts')}
      </Title>

      <NotificationsTab />
    </NotificationsTabLayout>
  );
};
