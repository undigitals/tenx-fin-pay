export interface IAlertItem {
  accountId: string | null;
  alertId: string;
  alertName: string;
  title: string;
  subTitle: string;
  value: string;
  isNotifyByEmail?: boolean;
  isNotifyBySms?: boolean;
  isNotifyByPush?: boolean;
  isReadOnly?: boolean;
  displayIndex: number;
  parameterType: string | null;
  parameterValues: string | null;
  parameterValue: string | null;
}
