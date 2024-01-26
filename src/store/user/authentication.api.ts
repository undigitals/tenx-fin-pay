import {
  IEmailCheckCodeRequest,
  IEmailGenerateCodeRequest,
  IForgotPasswordCheckCodeRequest,
  IForgotPasswordGenerateCodeRequest,
  IForgotPasswordRequest,
  IOtpSeedFinishRequest,
  IOtpSeedGenerateCodeRequest,
  IOtpSeedRequest,
  IOtpSeedResponse,
  IUpdateUserDataRequest,
  LoginRequest,
  ILoginResponse,
  ValidateToken,
  IForgotUsernameRequest,
} from 'vars/types/authentication.types';
import { API_ROUTES } from 'vars/const/API_ROUTES';
import { getDeviceInfo } from 'utils/helpers/deviceInfo';
import { api } from 'store/api';

export const authenticationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_ROUTES.auth.login,
        credentials: 'include',
        method: 'POST',
        body: { appVersion: 'web', ...credentials },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_ROUTES.auth.logout,
        credentials: 'include',
        method: 'POST',
      }),
    }),
    refresh: builder.mutation({
      query: (credentials) => ({
        url: API_ROUTES.auth.refreshToken,
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials: IForgotPasswordRequest) => ({
        url: API_ROUTES.auth.forgotPassword.init,
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotUsername: builder.mutation({
      query: (credentials: IForgotUsernameRequest) => ({
        url: API_ROUTES.auth.forgotUsername.init,
        method: 'POST',
        body: credentials,
      }),
    }),
    generateCodeForgotPassword: builder.mutation({
      query: (credentials: IForgotPasswordGenerateCodeRequest) => ({
        url: API_ROUTES.auth.forgotPassword.generateCode,
        method: 'POST',
        body: credentials,
      }),
    }),
    checkCodeForgotPassword: builder.mutation({
      query: (credentials: IForgotPasswordCheckCodeRequest) => ({
        url: API_ROUTES.auth.forgotPassword.checkCode,
        method: 'POST',
        body: credentials,
      }),
    }),
    getTruliooToken: builder.mutation({
      query: () => ({
        url: API_ROUTES.auth.truliooToken,
        method: 'POST',
        responseHandler: (response) => response.text(),
      }),
    }),
    protected: builder.mutation({
      query: () => 'protected',
    }),
    validateToken: builder.query<ValidateToken, string>({
      query: (token) => `validate-token?token=${token}`,
    }),
    generateCodeEmail: builder.mutation({
      query: (credentials: IEmailGenerateCodeRequest) => ({
        url: API_ROUTES.auth.validateEmail.generateCode,
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    checkCodeEmail: builder.mutation({
      query: (credentials: IEmailCheckCodeRequest) => ({
        url: API_ROUTES.auth.validateEmail.checkCode,
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      invalidatesTags: ['Email-verify'],
    }),
    updateUserData: builder.mutation<void, IUpdateUserDataRequest>({
      query: (credentials: IUpdateUserDataRequest) => ({
        url: API_ROUTES.updateUserData(credentials.id),
        method: 'PATCH',
        body: credentials.data,
      }),
    }),
    getNewOtpSeed: builder.mutation<IOtpSeedResponse, IOtpSeedRequest>({
      query: (data: IOtpSeedRequest) => ({
        url: API_ROUTES.auth.otpSeed.requestNew,
        method: 'POST',
        body: { appVersion: 'web', ...data },
        credentials: 'include',
      }),
    }),
    generateCodeOtpSeed: builder.mutation<any, IOtpSeedGenerateCodeRequest>({
      query: (data: IOtpSeedGenerateCodeRequest) => ({
        url: API_ROUTES.auth.otpSeed.generateCode,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    finishOtpSeed: builder.mutation<ILoginResponse, IOtpSeedFinishRequest>({
      query: (data: IOtpSeedFinishRequest) => ({
        url: API_ROUTES.auth.otpSeed.finish,
        method: 'POST',
        body: { ...data, ...getDeviceInfo() },
        credentials: 'include',
      }),
    }),
    getEstatementIframeUrl: builder.query<string, void>({
      query: () => ({
        url: API_ROUTES.auth.estatementIframeUrl,
        method: 'GET',
        credentials: 'include',
        responseHandler: 'text',
      }),
    }),
    getZendeskToken: builder.mutation<string, void>({
      query: () => ({
        url: API_ROUTES.auth.zendeskToken,
        method: 'GET',
        responseHandler: 'text',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetTruliooTokenMutation,
  useGenerateCodeEmailMutation,
  useForgotUsernameMutation,
  useCheckCodeEmailMutation,
  useGetNewOtpSeedMutation,
  useGenerateCodeOtpSeedMutation,
  useFinishOtpSeedMutation,
  useLazyGetEstatementIframeUrlQuery,
  useGenerateCodeForgotPasswordMutation,
  useCheckCodeForgotPasswordMutation,
  useGetZendeskTokenMutation,
} = authenticationApi;
