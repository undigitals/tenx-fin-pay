import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { FinishRegistrationRequest, GenerateCodeResponse } from 'vars/types/registration.types';
import { registrationApi } from './registration.api';

export const initialRegistrationState: FinishRegistrationRequest = {
  transactionId: '',
  phone: '',
  password: '',
  fingerprint: '',
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  username: '',
  question1: '6F0F4CC4-6FBD-4FB4-B4EA-9F2739C5E499',
  question2: '6F0F4CC4-6FBD-4FB4-B4EA-9F2739C5E499',
  question3: '6F0F4CC4-6FBD-4FB4-B4EA-9F2739C5E499',
  answer1: '',
  answer2: '',
  answer3: '',
  type: 'Browser',
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState: initialRegistrationState,
  reducers: {
    cleanRegistrationData(state) {
      state.transactionId = '';
      state.password = '';
      state.fingerprint = '';
      state.firstName = '';
      state.lastName = '';
      state.middleName = '';
      state.username = '';
      state.question1 = '6F0F4CC4-6FBD-4FB4-B4EA-9F2739C5E499';
      state.question2 = '6F0F4CC4-6FBD-4FB4-B4EA-9F2739C5E499';
      state.question3 = '6F0F4CC4-6FBD-4FB4-B4EA-9F2739C5E499';
      state.answer1 = 'string';
      state.answer2 = 'string';
      state.answer3 = 'string';
    },
    setRegistrationState: (state, { payload: { phone, username, password, email } }) => {
      state.phone = phone;
      state.username = username;
      state.password = password;
      state.email = email;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(registrationApi.endpoints.generateCode.matchFulfilled, (state, { payload }: PayloadAction<GenerateCodeResponse>) => {
      state.transactionId = payload.transactionId;
    });
  },
});

export const selectRegistrationData = (state: RootState) => state.registration;

export const { cleanRegistrationData, setRegistrationState } = registrationSlice.actions;
