import { IDestinationAccount } from 'store/historyFilter/historyFilter.types';

export interface TAccountItemProps {
  id: number;
  alias: string;
  details: string;
  accountType: string;
  name: string;
  accountTypeDetails: string;
  primaryAccount: boolean;
}

export interface IDestinationItem extends TAccountItemProps {
  onChange: (id: number, title: string, alias: string, iconName: string) => void;
  unAppliedDestinationAccount: IDestinationAccount;
}
