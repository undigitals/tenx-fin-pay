import React from 'react';
import { BodyText } from 'components/general/Typography';
import { IAlertItem } from 'views/NotificationsAndAlerts/NotificationsAndAlertsPage.types';
import { SSwitch } from 'views/NotificationsAndAlerts/NotificationsAndAlertsPage.styles';

interface IWaitlistSetting {
  alert: IAlertItem;
  alertsEditable: boolean;
  hasAccount: boolean;
  onCheck: (checked: boolean, alert: IAlertItem) => void;
}

export const WaitlistSetting = ({ alert, alertsEditable, hasAccount, onCheck }: IWaitlistSetting) => {
  const isActiveAlert = (alert.isNotifyBySms || alert.isNotifyByEmail) && alertsEditable;

  const handleCheck = (checked: boolean) => {
    onCheck(checked, alert);
  };

  return (
    <div className="settings-outer" key={alert.alertId}>
      <div className="settings-inner" style={{ marginBottom: '6px' }}>
        <BodyText textType="bodyText" display="flex" textAlign="center" size="M" fontWeight="M" color="charcoal" font="Poppins">
          {alert.title}
        </BodyText>
        <SSwitch checked={isActiveAlert || false} onChange={handleCheck} disabled={!hasAccount || !alertsEditable} />
      </div>
      <BodyText textType="helperText" display="flex" size="T" fontWeight="R" color="charcoal60" extraStyles={{ maxWidth: '70%' }} marginBottom={4}>
        {alert.subTitle}
      </BodyText>
    </div>
  );
};
