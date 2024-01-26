/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { usersApi } from 'store/user/users.api';
import { IAlertItem, IAlertGroup, IInitialWaitlistProductsState } from './waitlistProducts.types';

export const initialWaitlistProductsState: IInitialWaitlistProductsState = {
  waitlistProductsPreferences: [],
  isDefaultProductsStateChanged: false,
};

export const waitlistProductsSlice = createSlice({
  name: 'waitlistProducts',
  initialState: initialWaitlistProductsState,
  reducers: {
    changeWaitlistProduct(state, { payload }: PayloadAction<{ alertId: string; isSubscribed: boolean }>) {
      const alertIndex = state.waitlistProductsPreferences.findIndex((alert: IAlertItem) => alert.alertId === payload.alertId);

      state.waitlistProductsPreferences[alertIndex].isNotifyByEmail = payload.isSubscribed;
      state.waitlistProductsPreferences[alertIndex].isNotifyBySms = payload.isSubscribed;
      state.waitlistProductsPreferences[alertIndex].isNotifyByPush = payload.isSubscribed;

      state.isDefaultProductsStateChanged = true;
    },
    changeAllWaitlistProducts(state, { payload }: PayloadAction<boolean>) {
      state.waitlistProductsPreferences.forEach((alert: IAlertItem) => {
        alert.isNotifyByEmail = payload;
        alert.isNotifyBySms = payload;
        alert.isNotifyByPush = payload;
      });

      state.isDefaultProductsStateChanged = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(usersApi.endpoints.getUserAllAlerts.matchFulfilled, (state, { payload }: PayloadAction<IAlertGroup[]>) => {
      state.waitlistProductsPreferences = payload.find((item: IAlertGroup) => item.category === 'Waitlist Product Preferences')?.alerts || [];
      state.isDefaultProductsStateChanged = false;
    });
    builder.addMatcher(usersApi.endpoints.putAllAlerts.matchFulfilled, (state) => {
      state.isDefaultProductsStateChanged = false;
    });
  },
});

export const selectWaitlistProductsData = (state: RootState) => state.waitlistProducts;

export const { changeWaitlistProduct, changeAllWaitlistProducts } = waitlistProductsSlice.actions;
