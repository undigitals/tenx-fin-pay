import { API_ROUTES } from 'vars/const/API_ROUTES';
import { IPaymentsInfoResponse, ITenxPayHistoryItem } from 'vars/types/userInfo.types';
import { api } from 'store/api';
import { IAccount } from './payments.types';

export const paymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentsInfo: builder.query<IPaymentsInfoResponse, void>({
      query: () => API_ROUTES.immediate.paymentInfo,
      providesTags: ['Payments-info'],
    }),
    getPaymentAccounts: builder.query<{ accounts: IAccount[] }, void>({
      query: () => ({
        url: API_ROUTES.immediate.accounts,
        method: 'GET',
      }),
    }),
    preparePayment: builder.mutation({
      query: ({ accountId, amount }) => ({
        url: `${API_ROUTES.immediate.preparePayment}?accountId=${accountId}&amount=${amount}`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    requestPayment: builder.mutation({
      query: (data) => ({
        url: API_ROUTES.immediate.requestPayment,
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['Payments-info'],
    }),
    getTenxPayHistory: builder.mutation<ITenxPayHistoryItem[], string>({
      query: (rangeType) => API_ROUTES.immediate.payHistory(rangeType),
    }),
    getTimeEntries: builder.mutation({
      query: () => API_ROUTES.immediate.timeEntries,
    }),
  }),
});

export const { useLazyGetPaymentsInfoQuery, useGetTimeEntriesMutation, useGetTenxPayHistoryMutation } = paymentsApi;
