import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDayDifference } from 'utils/helpers/dateHelpers';
import { RootState } from 'store/store';
import { attuneApi } from './attune.api';
import { IResultItem } from './attune.types';

type TQuizStateTypes = 'new' | 'finished' | 'reminder';
interface IAttuneState {
  results: IResultItem[];
  quizState: TQuizStateTypes;
}

export const initialAttuneState: IAttuneState = {
  results: [],
  quizState: 'new',
};

export const attuneSlice = createSlice({
  name: 'attune',
  initialState: initialAttuneState,
  reducers: {
    setResults(state, { payload }: PayloadAction<IResultItem[]>) {
      state.results = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(attuneApi.endpoints.getAttuneResults.matchFulfilled, (state, { payload }: PayloadAction<IResultItem[]>) => {
      state.results = payload;

      if (payload.length === 0) {
        state.quizState = 'new';
      }

      if (payload.length > 0 && getDayDifference(payload[0]?.lastActivityDate) > 90) {
        state.quizState = 'reminder';
      }

      if (payload.length > 0 && getDayDifference(payload[0]?.lastActivityDate) <= 90) {
        state.quizState = 'finished';
      }
    });
  },
});

export const selectAttuneData = (state: RootState) => state.attune;
