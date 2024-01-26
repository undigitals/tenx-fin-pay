import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserEmail, selectUserId, setNotificationsPreferences } from 'store/user/authentication.slice';
import { useLazyGetUserAlertsQuery, useUpdateUserAlertsMutation, useLazyGetUserAllAlertsQuery, useUpdateUserAllAlertsMutation, useEditUserNotificationPreferencesMutation } from 'store/user/users.api';
import {
  addUserAlert,
  clearUserAlerts,
  removeUserAlert,
  selectAlertsData,
  setUserAlerts,
  setWaitlistNotificationsSettings,
  setBalanceNotificationsSettings,
  setNotificationSettings,
  balancesTransactionsNotificationSettings,
  waitlistNotificationSettings,
} from 'store/user/alerts/alerts.slice';
import { ISubscriptionItemConfig } from 'views/Subscriptions/Subscriptions.types';
import { INotificationSettings, IUserAlertItem } from 'store/user/alerts/alerts.type';
import { IAlertItem } from 'views/NotificationsAndAlerts/NotificationsAndAlertsPage.types';
import { SUBS_CONFIG } from 'vars/const/SUBS_CONFIG';
import { useLazyGetUserPropertyQuery } from 'store/user/properties/userProperties.api';
import { useProperties } from './useProperties';

export const useSubscriptions = () => {
  const userId = useSelector(selectUserId) || '';
  const userEmail = useSelector(selectUserEmail);
  const { userAlerts, notificationSettings } = useSelector(selectAlertsData);
  const [fetchUserAlerts, fetchUserAlertsResult] = useLazyGetUserAlertsQuery();
  const { getAllProperties, getAllPropertiesResult, setProperty } = useProperties();
  const [updateUserAlerts] = useUpdateUserAlertsMutation();
  const [editUserNotificationPreferences] = useEditUserNotificationPreferencesMutation();

  const [getUserAllAlerts, getUserAllAlertsResult] = useLazyGetUserAllAlertsQuery();
  const [getUserProperty, getUserPropertyResult] = useLazyGetUserPropertyQuery();
  const [updateUserAllAlertsAPI] = useUpdateUserAllAlertsMutation();

  const balanceSettings = useSelector(balancesTransactionsNotificationSettings);
  const waitlistSettings = useSelector(waitlistNotificationSettings);

  const dispatch = useDispatch();

  // @ts-ignore
  const isAlertActive = (id: string) => Boolean(userAlerts.find((alert) => id === alert.alertId));

  const mergedAlerts = (allAlerts: IAlertItem[], updatedAlerts: IAlertItem[]) => {
    return allAlerts.map((currentItem) => {
      const updatedItem = updatedAlerts.find((alertItem) => alertItem.alertId === currentItem.alertId);
      return updatedItem ? { ...currentItem, ...updatedItem } : currentItem;
    });
  };

  const createAlertItem = (itemConfig: ISubscriptionItemConfig, notifications: INotificationSettings = {}): IUserAlertItem => {
    const localizedAlertName = itemConfig?.localizedAlertName || itemConfig?.title || '';
    return {
      alertId: itemConfig.id,
      localizedAlertName,
      parameterValue: null,
      isNotifyBySms: true,
      isNotifyByEmail: Boolean(userEmail),
      isNotifyByPush: false,
      ...notifications,
    };
  };

  // Handle alert item changing
  const changeAlert = (isSubscribed: boolean, id?: string) => {
    const itemConfig = SUBS_CONFIG.find((item) => id === item.id);

    if (!id || !itemConfig) return;

    if (isSubscribed) {
      dispatch(addUserAlert(createAlertItem(itemConfig)));
    } else {
      dispatch(removeUserAlert(id));
    }
  };

  const changeAllAlerts = (isSubscribed: boolean) => {
    if (isSubscribed) {
      const allAlerts = SUBS_CONFIG.map((item) => createAlertItem(item));
      dispatch(setUserAlerts(allAlerts));
    } else {
      dispatch(clearUserAlerts());
    }
  };

  const updateUserAllAlerts = async (updatedAlerts: IAlertItem[]) => {
    if (updatedAlerts.length) {
      const allAlerts = updatedAlerts.map((alert: IAlertItem) => ({
        ...alert,
        parameterValue: alert.parameterValue || alert.value,
        value: alert.value || alert.parameterValue,
      }));

      updateUserAllAlertsAPI(allAlerts);
      dispatch(setBalanceNotificationsSettings(mergedAlerts(balanceSettings as IAlertItem[], allAlerts as IAlertItem[])));
      dispatch(setWaitlistNotificationsSettings(mergedAlerts(waitlistSettings as IAlertItem[], allAlerts as IAlertItem[])));
    }
  };

  const saveAlerts = async () => {
    const activeCount = userAlerts.filter(
      // @ts-ignore
      (alert) => alert.isNotifyBySms || alert.isNotifyByEmail || alert.isNotifyByPush
    ).length;
    const isAnyNotificationActive = notificationSettings.isNotifyBySms || notificationSettings.isNotifyByEmail || notificationSettings.isNotifyByPush;
    const hasActiveSubs = activeCount > 0;
    const updatedNotificationSettings: INotificationSettings =
      hasActiveSubs && isAnyNotificationActive
        ? notificationSettings
        : {
            isNotifyByEmail: Boolean(userEmail) && hasActiveSubs,
            isNotifyBySms: hasActiveSubs,
            isNotifyByPush: false,
          };

    await setProperty({
      propertyName: 'notificationSettings',
      value: updatedNotificationSettings,
    });

    await updateUserAlerts({ userAlerts, userId });
  };

  const editAlerts = async (notifications: INotificationSettings) => {
    dispatch(setNotificationsPreferences(notifications));
    await editUserNotificationPreferences(notifications);
  };

  const updateNotificationSettings = async (updatedSettings: INotificationSettings) => {
    await setProperty({
      propertyName: 'notificationSettings',
      value: updatedSettings,
    });
    dispatch(setNotificationSettings(updatedSettings));
  };

  useEffect(() => {
    fetchUserAlerts();
    getAllProperties();
  }, [userId]);

  return {
    SUBS_CONFIG,
    isAlertActive,
    fetchUserAlerts,
    fetchUserAlertsResult,
    getUserPropertiesResult: getAllPropertiesResult,
    userAlerts,
    getUserProperty,
    getUserPropertyResult,
    getUserAllAlerts,
    getUserAllAlertsResult,
    changeAlert,
    changeAllAlerts,
    saveAlerts,
    editAlerts,
    notificationSettings,
    updateNotificationSettings,
    updateUserAllAlerts,
    balanceSettings,
    waitlistSettings,
  };
};
