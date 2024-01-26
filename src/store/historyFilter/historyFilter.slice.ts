import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IHistoryFilterState, ISortBy, IDestinationAccount } from './historyFilter.types';

export const initialHistoryFilterState: IHistoryFilterState = {
  filterBy: {
    minAmount: '0',
    maxAmount: '250',
    dateFrom: null,
    dateTo: null,
    destinationAccount: {
      id: 0,
      title: 'tenxPayHome.Select Account',
      alias: '',
      iconName: '',
    },
  },
  sortBy: {
    id: '0',
    title: 'tenxPayHome.Newest to Oldest',
  },
  activatedFilter: {
    filterBy: {},
    sortBy: {},
  },
};

export const historyFilterSlice = createSlice({
  name: 'historyFilter',
  initialState: initialHistoryFilterState,
  reducers: {
    activateFilter: (state) => {
      state.activatedFilter.filterBy = state.filterBy;
      state.activatedFilter.sortBy = state.sortBy;
    },
    onResetFilter: (state) => {
      state.filterBy = initialHistoryFilterState.filterBy;
      state.sortBy = initialHistoryFilterState.sortBy;
    },
    setPrevFilter: (state) => {
      state.filterBy = Object.keys(state.activatedFilter.filterBy).length ? state.activatedFilter.filterBy : initialHistoryFilterState.filterBy;
      state.sortBy = Object.keys(state.activatedFilter.sortBy).length ? state.activatedFilter.sortBy : initialHistoryFilterState.sortBy;
    },
    setMinAmount: (state, { payload: minAmount }: PayloadAction<string>) => {
      state.filterBy.minAmount = minAmount;
    },
    setMaxAmount: (state, { payload: maxAmount }: PayloadAction<string>) => {
      state.filterBy.maxAmount = maxAmount;
    },
    setDestinationAccount: (state, { payload: destinationAccount }: PayloadAction<IDestinationAccount>) => {
      state.filterBy.destinationAccount = destinationAccount;
    },
    setDateFrom: (state, { payload: dateFrom }: PayloadAction<string | null>) => {
      state.filterBy.dateFrom = dateFrom;
    },
    setDateTo: (state, { payload: dateTo }: PayloadAction<string | null>) => {
      state.filterBy.dateTo = dateTo;
    },
    setSortBy: (state, { payload: sortBy }: PayloadAction<ISortBy>) => {
      state.sortBy = sortBy;
    },
  },
});
export const selectHistoryFilterData = (state: RootState) => state.historyFilter;
export const selectHistoryFilterParameters = createSelector(selectHistoryFilterData, (state) => state.filterBy);
export const selectHistorySortParameters = createSelector(selectHistoryFilterData, (state) => state.sortBy);
export const { activateFilter, onResetFilter, setPrevFilter, setMinAmount, setMaxAmount, setDateFrom, setDateTo, setSortBy, setDestinationAccount } = historyFilterSlice.actions;
