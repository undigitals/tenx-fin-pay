import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { createCustomBaseQuery } from 'utils/helpers/baseQuery';
import { IPostUserInvitesRequest, IPostUserInvitesResponse } from 'vars/types/invite.types';
import { ISaveHistoryRequest } from 'vars/types/location.types';
import { IMenuData } from 'vars/types/menu.types';
import { API_ROUTES } from 'vars/const/API_ROUTES';
import { IUSPSValidateAddressRequest, IUSPSValidateAddressResponse } from 'vars/types/api.types';
import { IGetDisclosureResponse } from './user/disclosures/disclosures.types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: createCustomBaseQuery(process.env.REACT_APP_API_URL),
  tagTypes: ['Kyc', 'Accounts', 'Payments-info', 'Email-verify', 'User-data', 'Menu', 'Language', 'FAQ', 'Video', 'Tenx-pay-consent', 'Features', 'Account-opening-data'],
  endpoints: (builder) => ({
    postUserInvites: builder.mutation<IPostUserInvitesResponse, IPostUserInvitesRequest>({
      query: (credentials) => ({
        url: API_ROUTES.userInvites,
        method: 'POST',
        body: credentials,
      }),
    }),
    getMenuData: builder.query<IMenuData, void>({
      query: () => ({
        url: API_ROUTES.menu,
        method: 'GET',
      }),
      providesTags: ['Menu'],
    }),
    saveHistory: builder.mutation({
      query: (data: ISaveHistoryRequest) => ({
        url: API_ROUTES.history,
        method: 'POST',
        body: data,
      }),
      extraOptions: {
        ignoreTokenCheck: true,
      },
    }),
    getPrivacyPolicyDisclosure: builder.query<IGetDisclosureResponse, void>({
      query: () => ({
        url: API_ROUTES.disclaimers.privacyPolicyDisclosure,
        method: 'GET',
      }),
    }),
    getTermsOfUseDisclosure: builder.query<IGetDisclosureResponse, void>({
      query: () => ({
        url: API_ROUTES.disclaimers.termsOfUseDisclosure,
        method: 'GET',
      }),
    }),
    USPSValidateAddress: builder.mutation<IUSPSValidateAddressResponse, IUSPSValidateAddressRequest>({
      query: (credentials) => ({
        url: API_ROUTES.USPSValidateAddress,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { usePostUserInvitesMutation, useSaveHistoryMutation, useGetMenuDataQuery, useGetPrivacyPolicyDisclosureQuery, useGetTermsOfUseDisclosureQuery, useUSPSValidateAddressMutation } = api;
