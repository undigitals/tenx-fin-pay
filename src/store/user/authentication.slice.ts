import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { AuthenticationState, GenerateCodeResposnse, IOtpSeedResponse, IUserInfo, ILoginResponse, IThirdPartyIds, IKYCData } from 'vars/types/authentication.types';
import { lsGetItem, lsRemoveItem, lsSetItem } from 'utils/helpers/storage';
import { mobileApiCall } from 'services/mobileService';
import { IMobileAuthInjection, MobileRefrethTokenInjection } from 'vars/types/mobile.types';
import { iframeCall } from 'services/iframeService';
import { isProspectOnly } from 'vars/const/USER_PROFILE_IDS';
import { usersApi } from './users.api';
import { authenticationApi } from './authentication.api';
import { registrationApi } from './registration/registration.api';
import { userPropertiesApi } from './properties/userProperties.api';

export const initialAuthState: AuthenticationState = {
  user: {},
  token: null,
  userMobileNumber: null,
  zogoUserId: '',
  attuneUserId: '',
  attuneQuizId: '',
  immediateId: '',
  thirdPartyIds: null,
  systemProperties: {},
  otpSeed: null,
  refreshToken: null,
  transactionId: null,
  consents: null,
  isEmailVerifiedOrAbsent: null,
  language: 'en',
  cardHubSsoPayload: '',
  UIPreferences: {},
  truliooToken: '',
  deviceVerifyTransactionId: '',
  estatementIframeUrl: '',
  biometryType: 'FaceID',
  biometryState: false,
  policies: null,
  changePhoneTransactionId: '',
  redirectUrl: '',
  isProspectOnly: false,
  shouldRemember: false,
  KYCData: {
    status: false,
    piiStatus: false,
    documentStatus: false,
    piiAttempts: 0,
    documentAttempts: 0,
  },
  cardHubSsoData: {},
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    // This call made from mobile app
    mobileAuthentication: (
      state,
      {
        payload: {
          client,
          policies,
          token,
          accessToken,
          AuthRefresh,
          language,
          otpSeed,
          otp,
          isEmailVerifiedOrAbsent,
          thirdPartyIds,
          systemProperties,
          biometryType,
          biometryState,
          redirectUrl,
          cardHubSsoData,
        },
      }: PayloadAction<IMobileAuthInjection>
    ) => {
      state.user = client;
      state.token = token || accessToken || '';
      state.refreshToken = AuthRefresh || '';
      state.otpSeed = otpSeed || otp || '';
      state.isEmailVerifiedOrAbsent = isEmailVerifiedOrAbsent;
      state.language = language;
      state.thirdPartyIds = thirdPartyIds;
      state.zogoUserId = thirdPartyIds.Zogo;
      state.attuneUserId = thirdPartyIds.Attune;
      state.immediateId = thirdPartyIds.Immediate;
      state.attuneQuizId = systemProperties.attuneQuizId;
      state.systemProperties = systemProperties;
      state.biometryType = biometryType;
      state.biometryState = biometryState;
      state.policies = policies;
      state.redirectUrl = redirectUrl;
      state.isProspectOnly = !!(client?.systemProfileId && isProspectOnly(client.systemProfileId));
      state.cardHubSsoData = cardHubSsoData;
      lsSetItem('isLoggedIn', true);
      lsSetItem('isMobileApp', true);
      lsSetItem('savedName', client.preferredName || client.firstName);
    },
    login: (
      state,
      {
        payload: { client, token, otpSeed, refreshToken, isEmailVerifiedOrAbsent, thirdPartyIds, policies, systemProperties, cardHubSsoPayload, deviceId, cardHubSsoData },
      }: PayloadAction<ILoginResponse>
    ) => {
      state.user = client;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isEmailVerifiedOrAbsent = isEmailVerifiedOrAbsent;
      state.otpSeed = otpSeed;
      state.policies = policies;
      state.thirdPartyIds = thirdPartyIds;
      state.zogoUserId = thirdPartyIds.Zogo;
      state.attuneUserId = thirdPartyIds.Attune;
      state.immediateId = thirdPartyIds.Immediate;
      state.isProspectOnly = !!(client?.systemProfileId && isProspectOnly(client.systemProfileId));
      state.cardHubSsoData = cardHubSsoData;

      state.attuneQuizId = systemProperties.attuneQuizId;
      state.systemProperties = systemProperties;
      state.cardHubSsoPayload = cardHubSsoPayload;
      const shouldRemember = lsGetItem('shouldRemember');
      lsSetItem('isLoggedIn', true);

      if (shouldRemember) {
        lsSetItem('savedUserName', client.username);
        lsSetItem('deviceId', deviceId);
        lsSetItem('savedName', client.preferredName || client.firstName);
      } else {
        lsRemoveItem('savedUserName');
        lsRemoveItem('deviceId');
        lsRemoveItem('savedName');
      }
    },
    // This call made from mobile app
    mobileAuthRefreshToken: (state, { payload: { token } }: PayloadAction<MobileRefrethTokenInjection>) => {
      state.token = token;
    },
    // This call made from mobile app
    setToken: (state, { payload: { token } }: PayloadAction<MobileRefrethTokenInjection>) => {
      state.token = token;
    },
    cleanUserData: () => {
      lsRemoveItem('isLoggedIn');
      lsSetItem('wasLoggedOut', true);
      return initialAuthState;
    },
    deleteUserData: () => {
      lsRemoveItem('deviceId');
      lsRemoveItem('savedUserName');
      lsRemoveItem('savedName');
      lsRemoveItem('otpSeed');
      lsRemoveItem('isLoggedIn');
      lsRemoveItem('wasLoggedOut');
      return initialAuthState;
    },
    setUserMobileNumber: (state, { payload }) => {
      state.userMobileNumber = payload;
      lsSetItem('userMobileNumber', payload);
    },
    iframeAuthentication: (state) => {
      const chatFrameElement = document.getElementById('chat-frame') as HTMLIFrameElement;

      if (chatFrameElement) {
        iframeCall(chatFrameElement, { actionName: 'SendToken', data: state.token });
      }
    },
    setUserLanguage: (state, { payload }) => {
      state.language = payload;
      mobileApiCall('changeLanguageRequest', payload);
    },
    setTenxPayCollapsed: (state, { payload }) => {
      state.UIPreferences.isTenxPayCollapsed = payload;
    },
    setMyAccountCollapsed: (state, { payload }) => {
      state.UIPreferences.isMyAccountCollapsed = payload;
    },
    setBiometryState: (state, { payload }: PayloadAction<boolean>) => {
      state.biometryState = payload;
    },
    setNotificationsPreferences: (state, { payload }) => {
      state.user = { ...state.user, ...payload };
    },
    setShouldRemember: (state, { payload }) => {
      state.shouldRemember = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authenticationApi.endpoints.login.matchFulfilled, (state, { payload }: PayloadAction<ILoginResponse>) => {
      authenticationSlice.caseReducers.login(state, { type: 'login', payload });
    });
    builder.addMatcher(authenticationApi.endpoints.login.matchRejected, (state) => {
      state.userMobileNumber = null;
    });
    builder.addMatcher(authenticationApi.endpoints.login.matchPending, () => {
      lsRemoveItem('savedName');
    });
    builder.addMatcher(authenticationApi.endpoints.logout.matchFulfilled, () => {
      authenticationSlice.caseReducers.cleanUserData();
    });
    builder.addMatcher(authenticationApi.endpoints.getTruliooToken.matchFulfilled, (state, { payload }) => {
      state.truliooToken = payload;
    });
    builder.addMatcher(authenticationApi.endpoints.getEstatementIframeUrl.matchFulfilled, (state, { payload }: PayloadAction<string>) => {
      state.estatementIframeUrl = payload;
    });
    builder.addMatcher(authenticationApi.endpoints.refresh.matchFulfilled, (state, payload: PayloadAction<{ token: string }>) => {
      const isMobileApp = lsGetItem('isMobileApp');
      if (!isMobileApp) authenticationSlice.caseReducers.setToken(state, payload);
    });
    builder.addMatcher(usersApi.endpoints.getCurrentUser.matchFulfilled, (state, { payload }: PayloadAction<any>) => {
      state.user = payload;
    });
    builder.addMatcher(authenticationApi.endpoints.generateCodeEmail.matchFulfilled, (state, { payload }: PayloadAction<GenerateCodeResposnse>) => {
      state.transactionId = payload.transactionId;
    });
    builder.addMatcher(usersApi.endpoints.getUserProfileData.matchFulfilled, (state, { payload }: PayloadAction<IUserInfo>) => {
      state.user = payload;
    });
    builder.addMatcher(userPropertiesApi.endpoints.getUIPreference.matchFulfilled, (state, { payload }) => {
      state.UIPreferences = payload;
    });
    builder.addMatcher(usersApi.endpoints.getIsEmailVerified.matchFulfilled, (state, { payload }) => {
      state.isEmailVerifiedOrAbsent = payload;
    });
    builder.addMatcher(authenticationApi.endpoints.getNewOtpSeed.matchFulfilled, (state, { payload }: PayloadAction<IOtpSeedResponse>) => {
      state.deviceVerifyTransactionId = payload.transactionId;
    });
    builder.addMatcher(authenticationApi.endpoints.finishOtpSeed.matchFulfilled, (state, { payload }: PayloadAction<ILoginResponse>) => {
      authenticationSlice.caseReducers.login(state, { type: 'otpFlowLogin', payload });
      lsSetItem('otpSeed', payload.otpSeed);
    });
    builder.addMatcher(registrationApi.endpoints.finishRegestration.matchFulfilled, (state, { payload }: PayloadAction<ILoginResponse>) => {
      authenticationSlice.caseReducers.login(state, { type: 'otpFlowLogin', payload });
      lsSetItem('otpSeed', payload.otpSeed);
    });
    builder.addMatcher(usersApi.endpoints.getThirdPartyIds.matchFulfilled, (state, { payload }: PayloadAction<IThirdPartyIds>) => {
      state.thirdPartyIds = payload;
      state.zogoUserId = payload?.Zogo;
      state.attuneUserId = payload?.Attune;
      state.immediateId = payload?.Immediate;
    });
    builder.addMatcher(usersApi.endpoints.changePhoneGenerateCode.matchFulfilled, (state, { payload }) => {
      state.changePhoneTransactionId = payload.transactionId;
    });
    builder.addMatcher(usersApi.endpoints.getKycStatus.matchFulfilled, (state, { payload }: PayloadAction<IKYCData>) => {
      state.KYCData = payload;
    });
    builder.addMatcher(userPropertiesApi.endpoints.getUserLanguage.matchFulfilled, (state, { payload }: PayloadAction<'en' | 'es'>) => {
      state.language = payload;
    });
  },
});

export const selectCurrentAuthState = (state: RootState) => state.authentication;
export const selectCurrentUser = createSelector(selectCurrentAuthState, (state) => state.user);
export const selectTruliooToken = createSelector(selectCurrentAuthState, (state) => state.truliooToken);
export const selectPolicies = createSelector(selectCurrentUser, (state) => state?.policies);
export const selectUserId = createSelector(selectCurrentUser, (state) => state?.userId);
export const selectUserEmail = createSelector(selectCurrentUser, (state) => state?.email);
export const selectUserLanguage = (state: RootState) => state.authentication?.language;
export const selectTransactionId = createSelector(selectCurrentAuthState, (state) => state?.transactionId);
export const selectBiometryData = createSelector(selectCurrentAuthState, (state) => ({
  type: state.biometryType,
  state: state.biometryState,
}));
export const selectIsEmailVerifiedOrAbsent = createSelector(selectCurrentAuthState, (state) => state.isEmailVerifiedOrAbsent);
export const selectImmediateId = createSelector(selectCurrentAuthState, (state) => state.immediateId);
export const selectKycStatus = createSelector(selectCurrentAuthState, (state) => state.KYCData);
export const selectRedirectUrl = createSelector(selectCurrentAuthState, (state) => state?.redirectUrl);
export const selectSystemProperties = (state: RootState) => state.authentication.systemProperties;

export const {
  mobileAuthentication,
  mobileAuthRefreshToken,
  setTenxPayCollapsed,
  setMyAccountCollapsed,
  setToken,
  cleanUserData,
  deleteUserData,
  setBiometryState,
  setNotificationsPreferences,
  setUserLanguage,
} = authenticationSlice.actions;
