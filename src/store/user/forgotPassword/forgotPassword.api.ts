import {
  IForgotPasswordRequest,
  IForgotPasswordData,
  IForgotPasswordGenerateCodeResponse,
  IForgotPasswordGenerateCodeRequest,
  IForgotPasswordCheckCodeRequest,
  IPasswordChangeRequest,
} from 'vars/types/forgotPassword.types';
import { unprotectedApi } from 'store/unprotectedApi';
import { API_ROUTES } from 'vars/const/API_ROUTES';

export const forgotPasswordApi = unprotectedApi.injectEndpoints({
  endpoints: (builder) => ({
    startPasswordReset: builder.mutation<IForgotPasswordData, IForgotPasswordRequest>({
      query: (data) => ({
        url: API_ROUTES.auth.forgotPassword.init,
        method: 'POST',
        body: data,
      }),
    }),
    generateCode: builder.mutation<IForgotPasswordGenerateCodeResponse, IForgotPasswordGenerateCodeRequest>({
      query: (credentials) => ({
        url: API_ROUTES.auth.forgotPassword.generateCode,
        method: 'POST',
        body: credentials,
      }),
    }),
    checkCode: builder.mutation<IForgotPasswordGenerateCodeResponse, IForgotPasswordCheckCodeRequest>({
      query: (data) => ({
        url: API_ROUTES.auth.forgotPassword.checkCode,
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data: IPasswordChangeRequest) => ({
        url: API_ROUTES.auth.forgotPassword.finish,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useStartPasswordResetMutation, useChangePasswordMutation, useGenerateCodeMutation, useCheckCodeMutation } = forgotPasswordApi;
