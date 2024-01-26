import { API_ROUTES } from 'vars/const/API_ROUTES';
import { getDeviceInfo } from 'utils/helpers/deviceInfo';
import { CheckCodeRequest, CheckCodeResponse, FinishRegistrationRequest, GenerateCodeRequest, GenerateCodeResponse } from 'vars/types/registration.types';
import { ILoginResponse } from 'vars/types/authentication.types';
import { unprotectedApi } from 'store/unprotectedApi';

export const registrationApi = unprotectedApi.injectEndpoints({
  endpoints: (builder) => ({
    generateCode: builder.mutation<GenerateCodeResponse, GenerateCodeRequest>({
      query: (credentials) => ({
        url: API_ROUTES.auth.register.generateCode,
        method: 'POST',
        body: credentials,
      }),
    }),
    checkCode: builder.mutation<CheckCodeResponse, CheckCodeRequest>({
      query: (credentials) => ({
        url: API_ROUTES.auth.register.checkCode,
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    finishRegestration: builder.mutation<ILoginResponse, FinishRegistrationRequest>({
      query: (credentials) => ({
        url: API_ROUTES.auth.register.finish,
        method: 'POST',
        body: { appVersion: 'web', ...credentials, ...getDeviceInfo() },
        credentials: 'include',
        type: 4,
      }),
    }),
  }),
});

export const { useGenerateCodeMutation, useCheckCodeMutation, useFinishRegestrationMutation } = registrationApi;
