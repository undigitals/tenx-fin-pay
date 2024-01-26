import React from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { BodyText } from 'components/general/Typography';
import { useToggle } from 'utils/hooks/useToggle';
import { IAlertItem } from 'views/NotificationsAndAlerts/NotificationsAndAlertsPage.types';
import { CurrentAvailableBalanceSheet } from 'views/NotificationsAndAlerts/CurrentAvailableBalanceSheet/CurrentAvailableBalanceSheet';

interface IBalanceSetting {
  alert: IAlertItem;
  alertsEditable: boolean;
  hasAccount: boolean;
  onCheck: (checked: boolean, alert: IAlertItem) => void;
  onEditClick: (alert: IAlertItem) => void;
  onApply: (alert: IAlertItem, newValue: unknown) => void;
  selectOptions: { value: string; label: string }[];
}

export const BalanceSetting = ({ alert, selectOptions, alertsEditable, hasAccount, onCheck, onEditClick, onApply }: IBalanceSetting) => {
  const availableBalanceSheet = useToggle();
  const isActiveAlert = (alert.isNotifyBySms || alert.isNotifyByEmail) && alertsEditable;
  const isEditable = alert.alertName !== 'InternalTransfer' && alert.alertName !== 'AvailableBalanceDelivered' && alert.parameterValue;

  const handleApply = (newValue: unknown) => {
    onApply(alert, newValue);
    availableBalanceSheet.hide();
  };

  return (
    <div className="settings-outer" key={alert.alertId}>
      <div className="settings-inner">
        <div className="settings-checkbox" style={{ alignItems: 'flex-start' }}>
          <Checkbox checked={isActiveAlert} onChange={(e) => onCheck(e.target.checked, alert)} disabled={!hasAccount || !alertsEditable} />
          <BodyText textType="bodyText" display="flex" size="N" fontWeight="M" color="charcoal" font="DM Sans" paddingTop={2}>
            {alert.title}
          </BodyText>
        </div>
        {isEditable && <Icon name="edit" color={isActiveAlert ? 'blue' : 'charcoal40'} size="smaller" onClick={() => isActiveAlert && onEditClick(alert)} data-alertId={alert.alertId} />}
        {alert.alertName === 'AvailableBalanceDelivered' && (
          <>
            <div className="settings-available-balance" onClick={availableBalanceSheet.show}>
              <BodyText textType="bodyText" fontWeight="B" size="T" color={isActiveAlert ? 'charcoal' : 'charcoal40'} marginRight={16} cursorPointer>
                {alert.value || 'Weekly'}
              </BodyText>
              <Icon name="chevronDown" color={isActiveAlert ? 'blue' : 'charcoal40'} size="smaller" cursorPointer />
            </div>
            {isActiveAlert && (
              <CurrentAvailableBalanceSheet
                open={availableBalanceSheet.isActive}
                options={selectOptions}
                defaultValue={alert.value || 'Weekly'}
                onChange={handleApply}
                onClose={availableBalanceSheet.hide}
              />
            )}
          </>
        )}
      </div>
      <div className="settings-inner" style={{ paddingLeft: '32px' }}>
        <BodyText textType="helperText" display="flex" size="N" fontWeight="R" color="charcoal60" extraStyles={{ maxWidth: '70%' }}>
          {alert.subTitle}
        </BodyText>
        {alert.alertName !== 'InternalTransfer' && alert.alertName !== 'AvailableBalanceDelivered' && (
          <BodyText textType="helperText" size="N" fontWeight="B" color={isActiveAlert ? 'charcoal' : 'charcoal40'}>
            {Number(alert.value) > 0 && `$${alert.value}`}
          </BodyText>
        )}
      </div>
    </div>
  );
};
