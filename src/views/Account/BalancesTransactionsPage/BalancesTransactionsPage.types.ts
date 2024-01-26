import { IAcctTrnRecItem } from 'store/user/accounts/accounts.types';

export type TFilterBy = {
  incoming: boolean;
  outgoing: boolean;
  minAmount: string;
  maxAmount: string;
  fromDate: Date | null;
  toDate: Date | null;
};

interface TTagBarFilterBy {
  incoming?: boolean;
  outgoing?: boolean;
  read?: boolean;
  unread?: boolean;
  deleted?: boolean;
  minAmount?: string;
  maxAmount?: string;
  fromDate: Date | null;
  toDate: Date | null;
}

export type TSortBy = {
  title: string;
  id: string;
};

export type TFilterParamsInit = {
  filterBy: TFilterBy;
  sortBy: TSortBy;
  search?: string;
};

export type TTagNameList = {
  filterBy: Record<string, string>;
};

export type TTagBarProps = {
  filterBy: TTagBarFilterBy;
  tagNameList: TTagNameList;
  onClose: (tagName: string) => void;
  locale: string;
  marginBottom?: number;
  paddingTop?: number;
};

export type TTagProps = {
  title?: string;
  onClose?: () => void;
  isClosable?: boolean;
};

export type IFilterDrawerProps = {
  isOpen: boolean;
  onOpen: (screen?: string) => void;
  onClose: () => void;
  onFilter: (formValues: TFilterParamsInit) => void;
  amountUpperLimit: number;
  filterParamsInit: TFilterParamsInit;
  filterParams: TFilterParamsInit;
  prevScreen?: string;
};

export type ITransactionDetailsSheet = {
  isOpen?: boolean;
  transaction?: IAcctTrnRecItem;
  onClose: () => void;
};
