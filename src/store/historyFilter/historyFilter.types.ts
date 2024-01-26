export interface ISortBy {
  id: string;
  title: string;
}

export interface IDestinationAccount {
  id: number;
  title: string;
  iconName?: string;
  alias?: string;
}

export interface IFilterFields {
  minAmount: number | string;
  maxAmount: number | string;
  dateFrom: string | null;
  dateTo: string | null;
  destinationAccount: IDestinationAccount;
}

interface IHistoryActivatedFilter {
  filterBy?: any;
  sortBy?: any;
}

export interface IHistoryFilterState {
  filterBy: IFilterFields;
  sortBy: ISortBy;
  activatedFilter: IHistoryActivatedFilter;
}
