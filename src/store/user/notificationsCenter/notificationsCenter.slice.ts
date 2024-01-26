import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { usersApi } from 'store/user/users.api';
import { RootState } from 'store/store';
import { INotificationItem } from './notificationsCenter.types';

interface INotificationsCenterState {
  userNotifications: INotificationItem[];
}

export const initialNotificationsState: INotificationsCenterState = {
  userNotifications: [],
};

export const notificationsCenterSlice = createSlice({
  name: 'notificationsCenter',
  initialState: initialNotificationsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(usersApi.endpoints.getNotifications.matchFulfilled, (state, { payload }: PayloadAction<INotificationItem[]>) => {
      state.userNotifications = payload;
    });
  },
});

export const selectUserNotifications = (state: RootState) => state.notificationsCenter;
