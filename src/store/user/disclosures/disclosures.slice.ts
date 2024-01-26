import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { api } from 'store/api';
import { IDisclosuresData, IGetDisclosureResponse } from './disclosures.types';

export const initialDisclosuresState: IDisclosuresData = {
  privacyPolicy: false,
  cardholderAgreement: false,
  suttonBankPrivacyPolicy: false,
  tenxPrivacyPolicy: false,
  tenxTermsOfUse: false,
  disclosureId: '',
  disclosureText: '',
  disclosureName: '',
  disclosureSubTitle: '',
  disclosureAcceptCheckBoxText: '',
  disclosureAcceptButtonText: '',

  termsOfUseText: '',
  termsOfUseName: '',
  termsOfUseSubTitle: '',
  termsOfUseAcceptCheckBoxText: '',
  termsOfUseAcceptButtonText: '',
  termsOfUseDisclosureId: '',
};

export const disclosuresSlice = createSlice({
  name: 'disclosures',
  initialState: initialDisclosuresState,
  reducers: {
    setPrivacyPolicy(state, { payload }: PayloadAction<boolean>) {
      state.privacyPolicy = payload;
    },
    setTermsOfUse(state, { payload }: PayloadAction<boolean>) {
      state.tenxTermsOfUse = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getPrivacyPolicyDisclosure.matchFulfilled, (state, { payload }: PayloadAction<IGetDisclosureResponse>) => {
      state.disclosureId = payload.disclaimerId;
      state.disclosureText = payload.text;
      state.disclosureName = payload.name;
      state.disclosureSubTitle = payload.subTitle;
      state.disclosureAcceptCheckBoxText = payload.acceptCheckBoxText;
      state.disclosureAcceptButtonText = payload.acceptButtonText;
    });
    builder.addMatcher(api.endpoints.getTermsOfUseDisclosure.matchFulfilled, (state, { payload }: PayloadAction<IGetDisclosureResponse>) => {
      state.termsOfUseDisclosureId = payload.disclaimerId;
      state.termsOfUseText = payload.text;
      state.termsOfUseName = payload.name;
      state.termsOfUseSubTitle = payload.subTitle;
      state.termsOfUseAcceptCheckBoxText = payload.acceptCheckBoxText;
      state.termsOfUseAcceptButtonText = payload.acceptButtonText;
    });
  },
});

export const selectDisclosuresData = (state: RootState) => state.disclosures;
export const { setPrivacyPolicy, setTermsOfUse } = disclosuresSlice.actions;
