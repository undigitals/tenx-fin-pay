import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNotificationSettings, balancesTransactionsNotificationSettings, waitlistNotificationSettings } from 'store/user/alerts/alerts.slice';
import { IAlertItem } from 'views/NotificationsAndAlerts/NotificationsAndAlertsPage.types';
import { useSubscriptions } from 'utils/hooks/useSubscriptions';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { IBaseSelectOption } from 'components/general/BaseSelect/BaseSelect.types';

interface IInitValues {
  [key: string]: {
    alertTitle: string;
    alertSubTitle: string;
    alertId: string;
    parameterValues: string | null;
    isActiveAlert?: boolean;
    amountValue: string;
  };
}

export const defineInitValues = (settings: IAlertItem[]) => {
  const initValues: IInitValues = {};

  settings?.forEach((alert) => {
    const { alertId, title, subTitle, parameterValues, isNotifyByEmail, isNotifyByPush, isNotifyBySms, value } = alert;
    initValues[alertId] = {
      alertTitle: title,
      alertSubTitle: subTitle,
      alertId,
      parameterValues: parameterValues || alert.parameterValues,
      isActiveAlert: isNotifyByEmail || isNotifyByPush || isNotifyBySms,
      amountValue: value || alert.value,
    };
  });

  return initValues;
};

export const useAlertInput = () => {
  const alertChannels = useSelector(selectNotificationSettings);
  const notificationSettings = useSelector(balancesTransactionsNotificationSettings);
  const waitListSettings = useSelector(waitlistNotificationSettings);
  const { isNotifyBySms, isNotifyByEmail, isNotifyByPush } = useSelector(selectCurrentUser) || {};

  const { updateUserAllAlerts } = useSubscriptions();

  const [hasAccount, setHasAccount] = useState(false);
  const [inputValues, setValues] = useState<Record<string, any>>({});

  const onInputChange = ({ target: { value, name } }: { target: HTMLInputElement }) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        amountValue: value,
      },
    }));
  };

  const updateMultipleAlerts = (alerts: IAlertItem[]) => {
    updateUserAllAlerts(alerts);
  };

  const setIsAlertActive = ({ checked, name, accountId }: { name: string; checked: boolean; accountId: string }) => {
    if (!isNotifyBySms && !isNotifyByEmail && !isNotifyByPush) return;
    const channels = checked
      ? { isNotifyBySms, isNotifyByEmail, isNotifyByPush }
      : {
          isNotifyBySms: false,
          isNotifyByEmail: false,
          isNotifyByPush: false,
        };

    setValues((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        isActiveAlert: checked,
      },
    }));

    updateUserAllAlerts([
      {
        accountId,
        alertId: name,
        parameterValue: inputValues[name].amountValue,
        ...channels,
      },
    ] as IAlertItem[]);
  };

  const onSelectChange = (alertId: string, newValue: unknown, accountId: string) => {
    const parameterValue = (newValue as IBaseSelectOption).value;
    setValues((prevValues) => ({
      ...prevValues,
      [alertId]: {
        ...prevValues[alertId],
        amountValue: parameterValue,
      },
    }));

    updateUserAllAlerts([
      {
        accountId,
        alertId,
        parameterValue,
        isNotifyBySms: false,
        isNotifyByEmail: false,
        isNotifyByPush: false,
        ...alertChannels,
      },
    ] as IAlertItem[]);
  };

  useEffect(() => {
    setValues(defineInitValues([...(notificationSettings as IAlertItem[]), ...(waitListSettings as IAlertItem[])]));
    setHasAccount(true);
  }, [notificationSettings, waitListSettings]);

  return { inputValues, onInputChange, setIsAlertActive, onSelectChange, hasAccount, updateMultipleAlerts };
};
