import { API_ROUTES } from 'vars/const/API_ROUTES';
import { api } from 'store/api';
import {
  IAddAccountRequest,
  IAddAccountResponse,
  IGetAccountTransactionsRequest,
  IGetAccountTransactionsResponse,
  IGetAccountsResponse,
  IWalletAccount,
  IValidateRequest,
  IInviteHolderRequest,
  IInviteRequest,
} from './accounts.types';

export const accountsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<IGetAccountsResponse, void>({
      query: () => ({
        url: API_ROUTES.user.accounts.accounts,
        method: 'GET',
      }),
      transformResponse: (response: IGetAccountsResponse | null) => {
        if (response === null) {
          throw new Error('Request failed to return data.');
        }
        return response;
      },
      providesTags: ['Accounts'],
    }),
    addAccount: builder.mutation<IAddAccountResponse, IAddAccountRequest>({
      query: (credentials) => ({
        url: API_ROUTES.user.accounts.accounts,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Accounts', 'Menu', 'User-data'],
    }),
    getAccountsById: builder.mutation({
      query: (accountId) => ({
        url: API_ROUTES.user.accounts.accountById(accountId),
        method: 'GET',
      }),
    }),
    getAccountTransactions: builder.mutation<IGetAccountTransactionsResponse, IGetAccountTransactionsRequest>({
      query: ({ accountId, accountType, dateFrom, dateTo }) => ({
        url: API_ROUTES.user.accounts.accountTransactions(accountId, accountType, dateFrom, dateTo),
        method: 'GET',
      }),
    }),
    getImmediatePayFrameUrl: builder.query<{ frameUrl: string }, void>({
      query: () => ({
        url: API_ROUTES.immediate.login,
        method: 'POST',
      }),
    }),
    getWalletAccounts: builder.query<IWalletAccount[], void>({
      query: () => ({
        url: API_ROUTES.user.accounts.accounts,
        method: 'GET',
      }),
      transformResponse: (response: { accounts: IWalletAccount[] }) => response.accounts,
    }),
    transferMoney: builder.mutation({
      query: (transferInfo) => ({
        url: API_ROUTES.user.accounts.transfer,
        method: 'POST',
        body: transferInfo,
      }),
      invalidatesTags: ['Accounts'],
    }),
    validateThirdParty: builder.mutation({
      query: (data: IValidateRequest) => ({
        url: API_ROUTES.user.accounts.thirdPartyValidate,
        method: 'POST',
        body: data,
      }),
    }),
    acceptJointAccountHolder: builder.mutation({
      query: (data: IInviteRequest) => ({
        url: API_ROUTES.user.accounts.acceptJointAccountHolder,
        method: 'POST',
        body: data,
      }),
    }),
    addJointAccountHolder: builder.mutation({
      query: (data: IInviteRequest) => ({
        url: API_ROUTES.user.accounts.addJointAccountHolder,
        method: 'POST',
        body: data,
      }),
    }),
    inviteJointAccountHolder: builder.mutation({
      query: (data: IInviteHolderRequest) => ({
        url: API_ROUTES.user.accounts.inviteJointAccountHolder,
        method: 'POST',
        body: data,
      }),
    }),
    declineJointAccountHolder: builder.mutation({
      query: (id: string) => ({
        url: `${API_ROUTES.user.accounts.inviteJointAccountHolder}/${id}`,
        method: 'DELETE',
      }),
    }),
    getThirdPartyData: builder.query({
      query: () => ({
        url: API_ROUTES.user.accounts.thirdParty,
        method: 'GET',
      }),
    }),
    jointAccountHolderInvites: builder.query<IInviteHolderRequest, string>({
      query: (id: string) => ({
        url: `${API_ROUTES.user.accounts.jointAccountHolderInvites}/${id}`,
        method: 'GET',
      }),
    }),
    getAccountFeatures: builder.query({
      query: (id: string) => ({
        url: API_ROUTES.user.accounts.features(id),
        method: 'GET',
      }),
      providesTags: ['Features'],
    }),
    changeAccountFeature: builder.mutation({
      query: ({ data, cashAccountId }) => ({
        url: API_ROUTES.user.accounts.features(cashAccountId),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Features'],
    }),
    deleteThirdPartyAccount: builder.mutation({
      query: (accountId: string) => ({
        url: `${API_ROUTES.user.accounts.thirdParty}/${accountId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useLazyGetAccountsQuery,
  useGetAccountTransactionsMutation,
  useValidateThirdPartyMutation,
  useInviteJointAccountHolderMutation,
  useDeclineJointAccountHolderMutation,
  useTransferMoneyMutation,
  useLazyGetWalletAccountsQuery,
  useLazyGetImmediatePayFrameUrlQuery,
  useAddAccountMutation,
  useLazyGetThirdPartyDataQuery,
  useChangeAccountFeatureMutation,
  useLazyGetAccountFeaturesQuery,
  useJointAccountHolderInvitesQuery,
  useDeleteThirdPartyAccountMutation,
  useAcceptJointAccountHolderMutation,
  useAddJointAccountHolderMutation,
} = accountsApi;
