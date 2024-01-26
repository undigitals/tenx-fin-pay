import { API_ROUTES } from 'vars/const/API_ROUTES';
import { api } from 'store/api';
import { PERCAPITA_PLAY_CONSENT_ID } from 'vars/const/consents';
import { IAllConsentsResponse } from './consents.types';

export const consentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllConsents: builder.query<IAllConsentsResponse, any>({
      query: () => ({
        url: API_ROUTES.user.consents.consents,
        method: 'GET',
      }),
    }),
    getConsentsByFlowName: builder.query<IAllConsentsResponse, string>({
      query: (flowName = '') => ({
        url: API_ROUTES.user.consents.consentByFlowName(flowName),
        method: 'GET',
      }),
      providesTags: ['Language'],
    }),
    getPeracpitaPlayConsentStatus: builder.query<{ accepted: boolean }, void>({
      query: () => ({
        url: API_ROUTES.user.consents.consentStatusById(PERCAPITA_PLAY_CONSENT_ID),
        method: 'GET',
      }),
      providesTags: ['Tenx-pay-consent'],
    }),
    acceptConsent: builder.mutation<any, string>({
      query: (consentId) => ({
        url: API_ROUTES.user.consents.consentById(consentId),
        method: 'PUT',
      }),
      invalidatesTags: ['Tenx-pay-consent'],
    }),
    sendToEmail: builder.mutation<any, { consentId: string; email: string }>({
      query: ({ consentId, email }) => ({
        url: API_ROUTES.user.consents.sendByEmail(consentId),
        method: 'POST',
        params: {
          email,
        },
      }),
    }),
  }),
});

export const { useSendToEmailMutation, useLazyGetConsentsByFlowNameQuery, useAcceptConsentMutation, useGetPeracpitaPlayConsentStatusQuery } = consentsApi;
