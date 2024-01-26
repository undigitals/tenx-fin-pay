import { ESubscriptionModalType } from 'vars/types/subscription.types';

export interface ISubscriptionItemConfig {
  id: string;
  title: string;
  modalType?: ESubscriptionModalType;
  localizedAlertName?: string;
  estimatedDate?: string;
  description?: string;
}
