import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IAccountItem } from 'store/user/accounts/accounts.types';
import { accountsApi } from './accounts.api';
import { IAcctTrnRecItem, IFiservAccounts, IGetAccountsResponse, IInitialAccountsState, IPartyAcctRelRecItem, ISetLastTransactionData, TAddAccountType } from './accounts.types';

export const initialAccountsState: IInitialAccountsState = {
  fiservAccountsData: {} as IFiservAccounts,
  recentTransactions: [],
  lastTransactionFromAccount: '',
  lastTransactionToAccount: '',
  lastTransactionAmount: '',
  lastTransactionDate: '',
  lastTransactionNote: '',
  immediatePayFrameUrl: '',
  walletAccounts: [],
  thirdPartyData: [],
  cashAccountId: '',
  addAccountType: 'needs',
  selectedAccountInformation: {} as IAccountItem,
  pennyJarDestinationAccount: {} as IAccountItem,
  pennyJarDestinationAccounts: [],
  summaryTopAccount: null,
};

// TODO: Fix page / sheet / switch logic when backend service work
export const accountsSlice = createSlice({
  name: 'accounts',
  initialState: initialAccountsState,
  reducers: {
    setAccounts(state, { payload }: PayloadAction<IFiservAccounts>) {
      state.fiservAccountsData = payload;
    },
    setMainTransactions(state, { payload }: PayloadAction<IAcctTrnRecItem[]>) {
      state.recentTransactions = payload;
    },
    setLastTransaction(state, { payload }: PayloadAction<ISetLastTransactionData>) {
      state.lastTransactionFromAccount = payload.lastTransactionFromAccount;
      state.lastTransactionToAccount = payload.lastTransactionToAccount;
      state.lastTransactionAmount = payload.lastTransactionAmount;
      state.lastTransactionDate = payload.lastTransactionDate;
      state.lastTransactionNote = payload.lastTransactionNote;
    },
    setAddAccountType(state, { payload }: PayloadAction<TAddAccountType>) {
      state.addAccountType = payload;
    },
    setSelectedAccountInformation(state, { payload }: PayloadAction<IAccountItem>) {
      state.selectedAccountInformation = payload;
    },
    setPennyJarDestinationAccount(state, { payload }: PayloadAction<IAccountItem>) {
      state.pennyJarDestinationAccount = payload;
    },
    setPennyJarDestinationAccounts(state, { payload }: PayloadAction<IAccountItem>) {
      state.pennyJarDestinationAccounts = [payload, ...state.pennyJarDestinationAccounts];
    },
    resetPennyJarDestinationAccounts(state) {
      state.pennyJarDestinationAccounts = [];
    },
    setSummaryTopAccount(state, { payload }: PayloadAction<IAccountItem>) {
      state.summaryTopAccount = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(accountsApi.endpoints.getAccounts.matchFulfilled, (state, { payload }: PayloadAction<IGetAccountsResponse>) => {
      state.fiservAccountsData = payload.fiservAccounts;

      state.cashAccountId =
        payload.fiservAccounts.partyAcctRelRec.find(
          (item: IPartyAcctRelRecItem) => item?.partyAcctRelKeys?.acctKeys?.tenxAccountType === 'Cash' && item?.partyAcctRelInfo?.primaryOwnerInd && item?.partyAcctRelInfo?.ownerInd
        )?.partyAcctRelKeys.acctKeys.tenxAccountId || '';
    });
    builder.addMatcher(accountsApi.endpoints.getImmediatePayFrameUrl.matchFulfilled, (state, { payload }) => {
      state.immediatePayFrameUrl = payload.frameUrl;
    });
    builder.addMatcher(accountsApi.endpoints.getThirdPartyData.matchFulfilled, (state, { payload }) => {
      state.thirdPartyData = payload;
    });
  },
});

export const selectAccountsData = (state: RootState) => state.accounts;
export const { setAddAccountType, setSelectedAccountInformation, setPennyJarDestinationAccount, setPennyJarDestinationAccounts, resetPennyJarDestinationAccounts } = accountsSlice.actions;
