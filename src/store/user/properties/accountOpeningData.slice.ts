import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { GetUserInfoResponse, UserInfoData } from 'vars/types/userInfo.types';
import { authenticationApi } from 'store/user/authentication.api';
import { EKycFlowStatusType } from 'utils/hooks/useKYC';
import { userPropertiesApi } from './userProperties.api';

export const accountOpeningDataInitalState: UserInfoData = {
  firstName: '',
  lastName: '',
  middleName: '',
  suffix: '',
  address: '',
  address2: '',
  dateOfBirth: '',
  city: '',
  apt: '',
  stateProvince: '',
  zipCode: '',
  username: '',
  email: '',
  taxId: '',
  taxIdType: '',
  mailingCity: '',
  mailingState: '',
  mailingPostalCode: '',
  mailingAddress1: '',
  mailingAddress2: '',
  myDetailsStatus: EKycFlowStatusType.UNKNOWN,
  isMailingAddressTheSame: true,
  currentUrl: '',
};

export const accountOpeningDataSlice = createSlice({
  name: 'accountOpeningData',
  initialState: accountOpeningDataInitalState,
  reducers: {
    resetAccountOpeningData(state) {
      state.firstName = '';
      state.lastName = '';
      state.middleName = '';
      state.suffix = '';
      state.address = '';
      state.address2 = '';
      state.dateOfBirth = '';
      state.city = '';
      state.apt = '';
      state.stateProvince = '';
      state.zipCode = '';
      state.completed = false;
      state.email = '';
      state.username = '';
      state.mailingCity = '';
      state.mailingState = '';
      state.mailingPostalCode = '';
      state.mailingAddress1 = '';
      state.mailingAddress2 = '';
      state.isMailingAddressTheSame = true;
      state.currentUrl = '';
    },
    setUserDisclosureCompleted: (state, { payload: { completed } }) => {
      state.completed = completed;
    },
    updateAccountOpeningData: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(userPropertiesApi.endpoints.getAccountOpeningProperty.matchFulfilled, (state, { payload }: PayloadAction<GetUserInfoResponse>) => ({
      ...state,
      ...payload,
    }));
    builder.addMatcher(authenticationApi.endpoints.logout.matchFulfilled, (state) => {
      accountOpeningDataSlice.caseReducers.resetAccountOpeningData(state);
    });
  },
});

export const selectAccountOpeningData = (state: RootState) => state.accountOpeningData;

export const { resetAccountOpeningData, updateAccountOpeningData } = accountOpeningDataSlice.actions;
