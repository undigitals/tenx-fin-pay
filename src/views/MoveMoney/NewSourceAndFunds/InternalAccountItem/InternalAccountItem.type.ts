import { IAccountItem } from 'store/user/accounts/accounts.types';

export interface CustomCardProps {
  bgColor?: 'blue' | 'charcoal5';
}

export interface IInternalAccountItem {
  item: IAccountItem;
  onChange: (account: IAccountItem) => void;
  isSelected?: boolean;
}

export interface IAccountIcon {
  type?: string;
  iconName?: string;
}
