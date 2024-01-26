import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
// import { MobileLocationInjection } from 'vars/types/mobile.types';

interface LocationState {
  currentLocation: {
    x: number;
    y: number;
  } | null;
  prevWaitlistLocation: string;
  isHelpAndSupportTab: boolean;
}

interface IsHelpAndSupportTabPayload {
  isHelpAndSupportTab: boolean;
}

export const initialLocationState: LocationState = {
  currentLocation: null,
  prevWaitlistLocation: '',
  isHelpAndSupportTab: false,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState: initialLocationState,
  reducers: {
    setMobileLocation: (state, { payload }: PayloadAction<{ x: string; y: string }>) => {
      state.currentLocation = {
        x: Number(payload.x),
        y: Number(payload.y),
      };
    },
    setWaitlistLocation: (state, { payload: prevWaitlistLocation }: PayloadAction<string>) => {
      state.prevWaitlistLocation = prevWaitlistLocation;
    },
    setIsHelpAndSupportTab: (state, { payload: { isHelpAndSupportTab } }: PayloadAction<IsHelpAndSupportTabPayload>) => {
      state.isHelpAndSupportTab = isHelpAndSupportTab;
    },
  },
});

export const selectWaitlistLocation = (state: RootState) => state.location.prevWaitlistLocation;
export const selectLocation = (state: RootState) => state.location;
export const { setMobileLocation, setWaitlistLocation, setIsHelpAndSupportTab } = locationSlice.actions;
