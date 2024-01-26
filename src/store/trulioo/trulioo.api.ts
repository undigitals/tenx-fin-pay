import { API_ROUTES } from 'vars/const/API_ROUTES';
import { api } from 'store/api';
import { ITruliooValidateUserRequest } from './trulioo.types';

export const truliooApi = api.injectEndpoints({
  endpoints: (builder) => ({
    injectAccessToken: builder.mutation({
      query: ({ truliooAccessToken, id }) => ({
        url: API_ROUTES.trulioo.embedIds(truliooAccessToken, id),
        method: 'POST',
      }),
    }),
    saveTransaction: builder.mutation({
      query: ({ truliooAccessToken, experienceTransactionId }) => ({
        url: API_ROUTES.trulioo.saveTransaction(truliooAccessToken, experienceTransactionId),
        method: 'POST',
      }),
    }),
    getTransactionsLatest: builder.mutation({
      query: () => ({
        url: API_ROUTES.trulioo.transactionsLatest,
        method: 'GET',
      }),
    }),
    transactionsCheck: builder.query({
      query: (experienceTransactionId: string) => ({
        url: API_ROUTES.trulioo.transactionsCheck(experienceTransactionId),
        method: 'GET',
      }),
    }),
    validateUserInfo: builder.mutation<{ status: string }, ITruliooValidateUserRequest>({
      query: (credentials) => ({
        url: API_ROUTES.trulioo.validateUserInfo,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Kyc'],
    }),
    getDocv2ShortCode: builder.query<string, void>({
      query: () => ({
        url: API_ROUTES.trulioo.docv2.getShortCode,
        method: 'GET',
        responseHandler: 'text',
      }),
    }),
    saveDocv2Transaction: builder.mutation<void, string>({
      query: (transactionId) => ({
        url: API_ROUTES.trulioo.docv2.saveTransaction(transactionId),
        method: 'POST',
      }),
    }),
  }),
});

export const { useInjectAccessTokenMutation, useSaveTransactionMutation, useTransactionsCheckQuery } = truliooApi;
