import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { usersApi } from 'store/user/users.api';
import { userPropertiesApi } from 'store/user/properties/userProperties.api';
import { CategoryName, SpanishCategoryName } from 'views/NotificationsAndAlerts/NotificationsTab/constants';
import { IAlertItem } from 'views/NotificationsAndAlerts/NotificationsAndAlertsPage.types';
import { IInitialAlertsState, IUserAlertItem, IAlertGroup } from './alerts.type';

export const initialAlertsState: IInitialAlertsState = {
  allAlerts: [],
  userAlerts: [],
  notificationSettings: {},
  balancesTransactionsNotificationsPreferences: [],
  securityNotificationsPreferences: [],
  waitlistNotificationsPreferences: [],
};

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: initialAlertsState,
  reducers: {
    clearUserAlerts(state) {
      state.userAlerts = [];
    },
    setUserAlerts(state, { payload }: PayloadAction<IUserAlertItem[]>) {
      state.userAlerts = payload;
    },
    addUserAlert(state, { payload }: PayloadAction<IUserAlertItem>) {
      state.userAlerts.push(payload);
    },
    removeUserAlert(state, { payload }: PayloadAction<string>) {
      state.userAlerts = state.userAlerts.filter((alert) => alert.alertId !== payload);
    },
    changeUserAlert(state, { payload }: PayloadAction<IUserAlertItem>) {
      const alertIndex = state.userAlerts.findIndex((alert) => alert.alertId === payload.alertId);
      if (alertIndex < 0) {
        state.userAlerts = [...state.userAlerts, payload];
      } else {
        state.userAlerts[alertIndex].isNotifyByEmail = payload.isNotifyByEmail;
        state.userAlerts[alertIndex].isNotifyBySms = payload.isNotifyBySms;
        state.userAlerts[alertIndex].isNotifyByPush = payload.isNotifyByPush;
      }
    },
    setNotificationSettings(state, { payload }) {
      state.notificationSettings = payload;
    },
    setBalanceNotificationsSettings(state, { payload }: PayloadAction<IAlertItem[]>) {
      state.balancesTransactionsNotificationsPreferences = payload;
    },
    setWaitlistNotificationsSettings(state, { payload }: PayloadAction<IAlertItem[]>) {
      state.waitlistNotificationsPreferences = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersApi.endpoints.getUserAlerts.matchFulfilled, (state, { payload }: PayloadAction<IUserAlertItem[]>) => {
        state.userAlerts = payload;
      })
      .addMatcher(userPropertiesApi.endpoints.getUserProperties.matchFulfilled, (state, { payload }: PayloadAction<IInitialAlertsState>) => {
        if (payload?.notificationSettings) {
          state.notificationSettings = JSON.parse(payload.notificationSettings as string);
        }
      })
      .addMatcher(usersApi.endpoints.getUserAllAlerts.matchPending, (state) => {
        state.balancesTransactionsNotificationsPreferences = [];
      })
      .addMatcher(usersApi.endpoints.getUserAllAlerts.matchFulfilled, (state, { payload }: PayloadAction<IAlertGroup[]>) => {
        state.allAlerts = payload;
        state.balancesTransactionsNotificationsPreferences =
          payload.find((item: IAlertGroup) => item.category === CategoryName.BALANCE_AND_TRANSACTIONS || item.category === SpanishCategoryName.BALANCE_AND_TRANSACTIONS)?.alerts || [];
        state.securityNotificationsPreferences =
          payload.find((item: IAlertGroup) => item.category === CategoryName.SECURITY_ALERTS || item.category === SpanishCategoryName.SECURITY_ALERTS)?.alerts || [];
        state.waitlistNotificationsPreferences =
          payload.find((item: IAlertGroup) => item.category === CategoryName.WAITLIST_PREFERENCES || item.category === SpanishCategoryName.WAITLIST_PREFERENCES)?.alerts || [];
      });
  },
});

export const selectAlertsData = (state: RootState) => state.alerts;
export const selectNotificationSettings = createSelector(selectAlertsData, (state) => state?.notificationSettings);
export const balancesTransactionsNotificationSettings = createSelector(selectAlertsData, (state) => state?.balancesTransactionsNotificationsPreferences);
export const securityNotificationSettings = createSelector(selectAlertsData, (state) => state?.securityNotificationsPreferences);
export const waitlistNotificationSettings = createSelector(selectAlertsData, (state) => state?.waitlistNotificationsPreferences);

export const { setUserAlerts, clearUserAlerts, addUserAlert, removeUserAlert, setNotificationSettings, setBalanceNotificationsSettings, setWaitlistNotificationsSettings } = alertsSlice.actions;
