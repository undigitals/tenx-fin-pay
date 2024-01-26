import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IInitialCashAccountState } from './cashAccount.types';

export const initialCashAccountState: IInitialCashAccountState = {
  incomeSource: '',
  annualIncome: '',
};

export const cashAccountSlice = createSlice({
  name: 'cashAccount',
  initialState: initialCashAccountState,
  reducers: {
    setIncomeSource(state, { payload }: PayloadAction<string>) {
      state.incomeSource = payload;
    },
    setAnnualIncome(state, { payload }: PayloadAction<string>) {
      state.annualIncome = payload;
    },
  },
});
export const selectCashAccountState = (state: RootState) => state.cashAccount;

export const { setIncomeSource, setAnnualIncome } = cashAccountSlice.actions;
