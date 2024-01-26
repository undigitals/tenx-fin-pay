import { API_ROUTES } from 'vars/const/API_ROUTES';
import { IRiskSessionResponse, ITransferExternalAccountRequest } from 'vars/types/ingo.types';
import { api } from 'store/api';

export const ingoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getIframeUrl: builder.query({
      query: () => ({
        url: API_ROUTES.ingo.iframeUrl,
        method: 'GET',
        responseHandler: (response) => response.text(),
      }),
    }),
    transferToExternalAccount: builder.mutation({
      query: (data: ITransferExternalAccountRequest) => ({
        url: API_ROUTES.ingo.transferToExternalAccount,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Accounts'],
    }),
    transferFromExternalAccount: builder.mutation({
      query: (data: ITransferExternalAccountRequest) => ({
        url: API_ROUTES.ingo.transferFromExternalAccount,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Accounts'],
    }),
    getRiskSession: builder.query<IRiskSessionResponse, void>({
      query: () => ({
        url: API_ROUTES.ingo.riskSession,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetIframeUrlQuery, useTransferToExternalAccountMutation, useTransferFromExternalAccountMutation, useLazyGetRiskSessionQuery } = ingoApi;
