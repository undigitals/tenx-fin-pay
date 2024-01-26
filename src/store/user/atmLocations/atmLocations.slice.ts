import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { usersApi } from 'store/user/users.api';
import { IATMLocationsResponse } from './atmLocations.types';

export const initialState: IATMLocationsResponse = {
  foundAtmLocations: [],
};

export const atmLocationsSlice = createSlice({
  name: 'atmLocations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(usersApi.endpoints.getATMLocations.matchFulfilled, (state, { payload }: PayloadAction<IATMLocationsResponse>) => {
      state.foundAtmLocations = payload.foundAtmLocations;
    });
    builder.addMatcher(usersApi.endpoints.getATMByAddress.matchFulfilled, (state, { payload }: PayloadAction<IATMLocationsResponse>) => {
      state.foundAtmLocations = payload.foundAtmLocations;
    });
  },
});

export const selectAtmLocationsData = (state: RootState) => state.atmLocations;
