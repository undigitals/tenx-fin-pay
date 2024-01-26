import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IForgotPasswordData, IForgotPasswordGenerateCodeResponse } from 'vars/types/forgotPassword.types';
import { forgotPasswordApi } from './forgotPassword.api';

export const initialForgotPasswordState: IForgotPasswordData = {
  username: '',
  transactionId: '',
  email: '',
  phone: '',
};

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: initialForgotPasswordState,
  reducers: {
    setUsername(state, { payload }: PayloadAction<string>) {
      state.username = payload;
    },
    setTransactionId(state, { payload }: PayloadAction<string>) {
      state.transactionId = payload;
    },
    abortPasswordReset(state) {
      state.transactionId = '';
      state.email = '';
      state.phone = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(forgotPasswordApi.endpoints.startPasswordReset.matchFulfilled, (state, { payload: { transactionId, email, phone } }: PayloadAction<IForgotPasswordData>) => {
        state.transactionId = transactionId;
        state.email = email;
        state.phone = phone;
      })
      .addMatcher(forgotPasswordApi.endpoints.generateCode.matchFulfilled, (state, { payload }: PayloadAction<IForgotPasswordGenerateCodeResponse>) => {
        state.transactionId = payload.transactionId;
      });
  },
});

export const selectForgotPasswordData = (state: RootState) => state.forgotPassword;
export const { abortPasswordReset, setUsername } = forgotPasswordSlice.actions;
