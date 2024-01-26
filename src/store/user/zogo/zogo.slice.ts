import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IGetZogoTokenResponse } from 'vars/types/zogo.types';
import { zogoApi } from './zogo.api';

export const initialZogoState = {
  primaryPoints: 0,
  accessToken: '',
};

export const zogoSlice = createSlice({
  name: 'zogo',
  initialState: initialZogoState,
  reducers: {
    setPrimaryPoints(state, { payload }: PayloadAction<number>) {
      state.primaryPoints = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(zogoApi.endpoints.getZogoPoints.matchFulfilled, (state, { payload: { primaryPoints } }: PayloadAction<{ primaryPoints: number }>) => {
        state.primaryPoints = primaryPoints;
      })
      .addMatcher(zogoApi.endpoints.getZogoPoints.matchRejected, (state) => {
        state.primaryPoints = 0;
      })
      .addMatcher(zogoApi.endpoints.getZogoToken.matchFulfilled, (state, { payload: { accessToken } }: PayloadAction<IGetZogoTokenResponse>) => {
        state.accessToken = accessToken;
      });
  },
});

export const selectZogoData = (state: RootState) => state.zogo;
export const { setPrimaryPoints } = zogoSlice.actions;
