import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { ingoApi } from './ingo.api';

interface IngoState {
  iframeUrl: string;
}

export const initialIngoState: IngoState = {
  iframeUrl: '',
};

export const ingoSlice = createSlice({
  name: 'ingo',
  initialState: initialIngoState,
  reducers: {
    setIframeUrl(state, { payload }) {
      state.iframeUrl = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(ingoApi.endpoints.getIframeUrl.matchFulfilled, (state, { payload }) => {
      state.iframeUrl = payload;
    });
  },
});

export const selectIngoData = (state: RootState) => state.ingo;
export const { setIframeUrl } = ingoSlice.actions;
