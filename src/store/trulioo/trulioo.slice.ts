import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IInjectAccessToken } from 'vars/types/trulioo.types';
import { truliooApi } from './trulioo.api';

interface TruliooState {
  accessToken: string;
}

export const initialTruliooState: TruliooState = {
  accessToken: '',
};

export const truliooSlice = createSlice({
  name: 'trulioo',
  initialState: initialTruliooState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(truliooApi.endpoints.injectAccessToken.matchFulfilled, (state, { payload }: PayloadAction<IInjectAccessToken>) => {
      state.accessToken = payload.accessToken;
    });
  },
});

export const selectTruliooData = (state: RootState) => state.trulioo;
export const selectAccessToken = createSelector(selectTruliooData, (state) => state.accessToken);
