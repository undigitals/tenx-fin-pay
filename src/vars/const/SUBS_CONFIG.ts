import { ESubscriptionModalType } from 'vars/types/subscription.types';

export interface ISubscriptionItemConfig {
  id: string;
  title: string;
  modalType?: ESubscriptionModalType;
  localizedAlertName?: string;
  estimatedDate?: string;
  description?: string;
}

export const SUBS_CONFIG: ISubscriptionItemConfig[] = [
  {
    title: 'mySubscriptions.Cash Account',
    id: '16218906-d9f0-482d-b4ac-4d6158f679c1',
    modalType: ESubscriptionModalType.DEPOSIT,
  },
  {
    title: 'mySubscriptions.Tenx Pay',
    id: '6973dc11-570e-4f71-ac01-37c57ac32499',
    modalType: ESubscriptionModalType.PAID,
  },
  {
    title: 'mySubscriptions.International Transfer',
    id: 'e8c24417-1183-4b05-b1cf-4f848f5b80b0',
    modalType: ESubscriptionModalType.INTERNATIONAL,
  },
  {
    title: 'connectShare.Connect & Share',
    id: '349a06fb-cecc-4fdf-98dd-4ac2b2557707',
    modalType: ESubscriptionModalType.CONNECT,
  },
];

export const strA = 'd1b04fb8';
export const strB = '8401';
export const strC = '4637';
export const strD = 'a4b5';
export const strE = '4da567091449';

export const UNSUBSCRIBED_PRODUCTS_FOR_SUBSCRIPTIONS = [
  {
    accountId: null,
    alertId: '6973dc11-570e-4f71-ac01-37c57ac32499',
    alertName: 'PayAsYouGo',
    title: 'Pay As You Go',
    subTitle: 'Pay As You Go',
    value: null,
    isNotifyByEmail: false,
    isNotifyBySms: false,
    isNotifyByPush: false,
    displayIndex: 1,
    parameterType: null,
    parameterValues: null,
  },
  {
    accountId: null,
    alertId: '349a06fb-cecc-4fdf-98dd-4ac2b2557707',
    alertName: 'Connect&Share',
    title: 'Connect & Share',
    subTitle: 'Connect & Share',
    value: null,
    isNotifyByEmail: false,
    isNotifyBySms: false,
    isNotifyByPush: false,
    displayIndex: 5,
    parameterType: null,
    parameterValues: null,
  },
  {
    accountId: null,
    alertId: '16218906-d9f0-482d-b4ac-4d6158f679c1',
    alertName: 'DepositAccounts',
    title: 'Deposit Accounts',
    subTitle: 'Deposit Accounts',
    value: null,
    isNotifyByEmail: false,
    isNotifyBySms: false,
    isNotifyByPush: false,
    displayIndex: 0,
    parameterType: null,
    parameterValues: null,
  },
  {
    accountId: null,
    alertId: 'e8c24417-1183-4b05-b1cf-4f848f5b80b0',
    alertName: 'InternationalTransfer',
    title: 'International Transfer',
    subTitle: 'International Transfer',
    value: null,
    isNotifyByEmail: false,
    isNotifyBySms: false,
    isNotifyByPush: false,
    displayIndex: 2,
    parameterType: null,
    parameterValues: null,
  },
];
