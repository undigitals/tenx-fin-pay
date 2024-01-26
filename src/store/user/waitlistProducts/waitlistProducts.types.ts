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

export interface IInitialWaitlistProductsState {
  waitlistProductsPreferences: IAlertItem[];
  isDefaultProductsStateChanged: boolean;
}
