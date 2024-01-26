import { RootState } from 'store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIntentGroupItem, IQuestionItem, IIntentItem } from 'store/chat/chat.types';
import { chatApi } from 'store/chat/chat.api';
import { IFAQQuestion, TFAQCategory } from 'views/Wellness/HelpAndSupport/FAQ.types';

export type IVisibleContent = 'groups' | 'questions' | 'answer';
export type ISearchContent = 'search' | 'answer';
export type TPreviousTab = 'goals-and-tools' | 'learn-and-play' | 'connect-and-share' | 'help-and-support';

export interface IlHelpState {
  questions: IFAQQuestion[];
  FAQGroups: TFAQCategory[];
  intentGroups: IIntentGroupItem[];
  selectedGroup: string;
  areAllQuestionsLoaded: boolean;
  intentQuestions: IQuestionItem[];
  activeIntents?: IIntentItem[];
  selectedIntent: IIntentItem;
  selectedIntentAnswer: IQuestionItem;
  questionText?: string;
  visibleContent: IVisibleContent;
  previousTab: string;
  searchContent: ISearchContent;
}

export const initialHelpState: IlHelpState = {
  intentGroups: [],
  questions: [],
  areAllQuestionsLoaded: false,
  FAQGroups: [],
  selectedGroup: '',
  intentQuestions: [],
  selectedIntent: {} as IIntentItem,
  selectedIntentAnswer: {} as IQuestionItem,
  questionText: '',
  visibleContent: 'groups',
  previousTab: 'goals-and-tools',
  searchContent: 'search',
};

export const helpSlice = createSlice({
  name: 'help',
  initialState: initialHelpState,
  reducers: {
    setFAQGroups(state, { payload }: PayloadAction<TFAQCategory[]>) {
      state.FAQGroups = payload;
    },
    setAllQuestions(state, { payload }: PayloadAction<IFAQQuestion[]>) {
      state.questions = payload;
      state.areAllQuestionsLoaded = true;
    },
    addQuestions(state, { payload }: PayloadAction<IFAQQuestion[]>) {
      state.questions = [...state.questions, ...payload];
    },
    resetFAQ(state) {
      state.FAQGroups = [];
      state.questions = [];
      state.areAllQuestionsLoaded = false;
    },
    setPreviousTab(state, { payload }: PayloadAction<TPreviousTab>) {
      state.previousTab = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(chatApi.endpoints.getIntentGroups.matchFulfilled, (state, { payload }: PayloadAction<IIntentGroupItem[]>) => {
      state.intentGroups = payload;
      state.visibleContent = 'groups';
    });
    builder.addMatcher(chatApi.endpoints.getIntentQuestions.matchFulfilled, (state, { payload }: PayloadAction<IQuestionItem[]>) => {
      state.intentQuestions = payload;
    });
  },
});

export const selectHelpData = (state: RootState) => state.help;
export const { setPreviousTab, setFAQGroups, setAllQuestions, addQuestions, resetFAQ } = helpSlice.actions;
