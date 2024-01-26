import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IConsentsState } from './consents.types';
import { consentsApi } from './consents.api';

export const initialConsentsState: IConsentsState = {
  flows: {},
  isTenxPlayConsentsAccepted: false,
};

export const consentsSlice = createSlice({
  name: 'consents',
  initialState: initialConsentsState,
  reducers: {
    setIsConsentAccepted(state, { payload }: PayloadAction<{ flowName: string; id: string; isAccepted: boolean }>) {
      const consent = state.flows[payload.flowName]?.find((item) => item.id === payload.id);
      if (consent) {
        consent.accepted = payload.isAccepted;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(consentsApi.endpoints.getConsentsByFlowName.matchFulfilled, (state, { payload }) => {
      state.flows = {
        ...state.flows,
        ...payload,
      };
    });
    builder.addMatcher(consentsApi.endpoints.getPeracpitaPlayConsentStatus.matchFulfilled, (state, { payload }) => {
      state.isTenxPlayConsentsAccepted = payload.accepted;
    });
  },
});

export const selectConsentsData = (state: RootState) => state.consents.flows;
export const selectIsTenxPayConsentAccepted = (state: RootState) => state.consents.isTenxPlayConsentsAccepted;
export const { setIsConsentAccepted } = consentsSlice.actions;
