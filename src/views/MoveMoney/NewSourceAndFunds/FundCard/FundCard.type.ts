import { IThirdParty } from 'store/user/accounts/accounts.types';

export interface FundCardProps {
  items: IThirdParty[];
  selected?: string;
  modalTitle: string;
  onSelect: (id: string) => void;
}
