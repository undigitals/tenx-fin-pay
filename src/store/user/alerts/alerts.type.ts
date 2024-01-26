export interface INotificationSettings {
  isNotifyBySms?: boolean;
  isNotifyByEmail?: boolean;
  isNotifyByPush?: boolean;
}

export interface IInitialAlertsState {
  allAlerts: IAlertGroup[];
  userAlerts: IUserAlertItem[];
  notificationSettings: INotificationSettings;
  balancesTransactionsNotificationsPreferences?: any[];
  securityNotificationsPreferences?: any[];
  waitlistNotificationsPreferences?: any[];
}

export interface IAlertItem {
  accountId: null | string;
  alertId: string;
  alertName: string;
  displayIndex: number;
  isNotifyByEmail: boolean;
  isNotifyByPush: boolean;
  isNotifyBySms: boolean;
  parameterType: null | string;
  parameterValues: null | string;
  subTitle: string;
  title: string;
  value: null | string;
}

export interface IAlertGroup {
  alerts: IAlertItem[];
  category: string;
  isAccountCategory: boolean;
}

export interface IUserAlertItem {
  accountId?: string;
  alertId: string;
  isNotifyByEmail: boolean;
  isNotifyBySms: boolean;
  localizedAlertName?: string;
  parameterValue: string | null;
  isNotifyByPush?: boolean;
}
