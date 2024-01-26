import { API_ROUTES } from 'vars/const/API_ROUTES';
import { IEnrollRequest } from 'vars/types/users.types';
import { urlString } from 'utils/helpers/urlString/urlString';
import { IKYCData } from 'vars/types/authentication.types';
import { api } from 'store/api';
import { IProfileChangePasswordRequest, IProfileChangePasswordResponse } from 'vars/types/profileChangePassword.types';
import { IATMLocationsByAddressRequest, IATMLocationsRequest, IATMLocationsResponse } from 'store/user/atmLocations/atmLocations.types';
import { INotificationItem } from './notificationsCenter/notificationsCenter.types';

type TSetUserConsentData = {
  disclaimerId: string;
};

interface IEULAPolicyResponse {
  currentLanguage: string;
  id: string;
  languageList: string[];
  text: string;
}

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<any, void>({
      query: () => ({
        url: API_ROUTES.user.getCurrent,
        method: 'GET',
      }),
      providesTags: ['User-data', 'Accounts'],
    }),
    getIsEmailVerified: builder.query<any, void>({
      query: () => ({
        url: API_ROUTES.user.getIsEmailVerified,
        method: 'GET',
      }),
      providesTags: ['Email-verify'],
    }),
    directDeposit: builder.mutation({
      query: (data) => ({
        url: API_ROUTES.user.directDeposit,
        method: 'POST',
        body: data,
      }),
    }),
    setUserConsent: builder.mutation<any, TSetUserConsentData>({
      query: ({ disclaimerId }: TSetUserConsentData) => ({
        url: `${API_ROUTES.user.consents.consents}/${disclaimerId}`,
        credentials: 'include',
        method: 'PUT',
      }),
      extraOptions: {
        ignoreTokenCheck: true,
      },
    }),
    getUserProfileData: builder.mutation({
      query: () => ({
        url: API_ROUTES.user.getCurrent,
        method: 'GET',
      }),
    }),
    editUserProfileData: builder.mutation({
      query: (data) => ({
        url: API_ROUTES.user.user,
        method: 'PATCH',
        body: { ...data.profileData },
      }),
      invalidatesTags: ['User-data'],
    }),
    updateUserAlerts: builder.mutation({
      query: (data) => ({
        url: API_ROUTES.users.alerts(data.userId),
        method: 'PUT',
        body: { userAlerts: data.userAlerts },
      }),
    }),
    putAllAlerts: builder.mutation({
      query: (data) => ({
        url: API_ROUTES.user.allAlerts,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: API_ROUTES.user.delete,
        method: 'DELETE',
      }),
    }),
    changePassword: builder.mutation<IProfileChangePasswordResponse, IProfileChangePasswordRequest>({
      query: (credentials) => ({
        url: API_ROUTES.user.changePassword,
        method: 'POST',
        body: credentials,
      }),
    }),
    enroll: builder.mutation({
      query: ({ email }: IEnrollRequest) => ({
        url: email ? urlString({ url: API_ROUTES.immediate.enroll, params: { email } }) : API_ROUTES.immediate.enroll,
        credentials: 'include',
        method: 'POST',
      }),
    }),
    getImmediateConsents: builder.query<{ hasActiveConsents?: boolean }, void>({
      query: () => ({
        url: API_ROUTES.immediate.consents,
        method: 'GET',
      }),
    }),
    getEulaPolicy: builder.query<IEULAPolicyResponse, void>({
      query: () => ({
        url: API_ROUTES.immediate.eulaPolicies,
        method: 'GET',
      }),
    }),
    updateConsentByPolicy: builder.mutation({
      query: (policyId: string) => ({
        url: API_ROUTES.immediate.updateConsentByPolicy(policyId),
        credentials: 'include',
        method: 'POST',
      }),
    }),
    getUserAlerts: builder.query<any, void>({
      query: () => ({
        url: API_ROUTES.user.allAlerts,
        method: 'GET',
      }),
    }),
    getUserAllAlerts: builder.query<any, any>({
      query: () => ({
        url: API_ROUTES.user.allAlerts,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    updateUserAllAlerts: builder.mutation<any, any>({
      query: (data) => ({
        url: API_ROUTES.user.allAlerts,
        method: 'PUT',
        credentials: 'include',
        body: data,
      }),
    }),
    editUserNotificationPreferences: builder.mutation<any, any>({
      query: (data) => ({
        url: 'user',
        method: 'PATCH',
        credentials: 'include',
        body: data,
      }),
    }),
    getThirdPartyIds: builder.query<any, void>({
      query: () => ({
        url: API_ROUTES.user.thirdPartyIds,
        method: 'GET',
      }),
    }),
    changeEmailGenerateCode: builder.mutation({
      query: (newEmail) => ({
        url: API_ROUTES.user.changeEmail.generate,
        method: 'POST',
        body: newEmail,
      }),
    }),
    changeEmailVerificationFinish: builder.mutation({
      query: (credentials) => ({
        url: API_ROUTES.user.changeEmail.finish,
        method: 'POST',
        body: credentials,
      }),
    }),
    changePhoneGenerateCode: builder.mutation({
      query: (newPhone) => ({
        url: API_ROUTES.user.changePhone.generate,
        method: 'POST',
        body: newPhone,
      }),
    }),
    changePhoneVerificationFinish: builder.mutation({
      query: (credentials) => ({
        url: API_ROUTES.user.changePhone.finish,
        method: 'POST',
        body: credentials,
      }),
    }),
    getKycStatus: builder.query<IKYCData, void>({
      query: () => ({
        url: API_ROUTES.user.kyc,
        method: 'GET',
      }),
      providesTags: ['Kyc'],
    }),
    getDocumentRequests: builder.query({
      query: () => ({
        url: API_ROUTES.user.documentRequests,
        method: 'GET',
      }),
    }),
    uploadRequestedDocuments: builder.mutation({
      query: (credentials) => ({
        url: `${API_ROUTES.user.uploadRequestedDocuments}/${credentials.documentRequestId}/${credentials.documentTypeId}`,
        method: 'POST',
        body: credentials.fileData,
      }),
    }),
    getATMLocations: builder.mutation<IATMLocationsResponse, IATMLocationsRequest>({
      query: (filterData) => ({
        url: API_ROUTES.user.atmLocations(filterData),
        method: 'GET',
        params: filterData.filter
          ? {
              FindFilter: filterData.filter ? filterData.filter : '',
            }
          : undefined,
      }),
      transformResponse: (response: any) => response || { foundAtmLocations: [] },
    }),
    checkFree: builder.query<any, void>({
      query: () => ({
        url: API_ROUTES.user.checkFree,
        method: 'GET',
      }),
    }),
    getNotifications: builder.query<INotificationItem[], boolean | void>({
      query: (withDeleted = false) => ({
        url: API_ROUTES.user.notifications,
        method: 'GET',
        params: withDeleted ? { showDeleted: withDeleted } : undefined,
      }),
    }),
    getNotificationsByFilter: builder.query({
      query: (credentials: { showDeleted: boolean; $orderby: string; filter?: string }) => ({
        url: API_ROUTES.user.notifications,
        method: 'GET',
        params: credentials,
      }),
    }),
    getNotificationById: builder.query<INotificationItem, string>({
      query: (id) => ({
        url: `${API_ROUTES.user.notifications}/${id}`,
        method: 'GET',
      }),
    }),
    deleteNotificationById: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_ROUTES.user.notifications}/${id}`,
        method: 'DELETE',
      }),
    }),
    getATMByAddress: builder.query<IATMLocationsResponse, IATMLocationsByAddressRequest>({
      query: (filterData) => ({
        url: API_ROUTES.user.atmByAddress,
        method: 'GET',
        params: filterData.filter
          ? {
              address: filterData.address,
              FindFilter: `${filterData.filter ? filterData.filter : ''}`,
            }
          : {
              address: filterData.address,
            },
      }),
      transformResponse: (response: any) => response || { foundAtmLocations: [] },
    }),
  }),
});

export const {
  useLazyGetCurrentUserQuery,
  useGetCurrentUserQuery,
  useLazyGetIsEmailVerifiedQuery,
  useGetIsEmailVerifiedQuery,
  useGetUserProfileDataMutation,
  useEditUserProfileDataMutation,
  useEditUserNotificationPreferencesMutation,
  useLazyGetUserAlertsQuery,
  useDeleteUserMutation,
  useDirectDepositMutation,
  useEnrollMutation,
  useLazyGetImmediateConsentsQuery,
  useLazyGetEulaPolicyQuery,
  useUpdateConsentByPolicyMutation,
  useLazyGetUserAllAlertsQuery,
  useUpdateUserAllAlertsMutation,
  useUpdateUserAlertsMutation,
  useLazyGetThirdPartyIdsQuery,
  usePutAllAlertsMutation,
  useChangeEmailGenerateCodeMutation,
  useChangeEmailVerificationFinishMutation,
  useChangePhoneGenerateCodeMutation,
  useChangePhoneVerificationFinishMutation,
  useLazyGetDocumentRequestsQuery,
  useUploadRequestedDocumentsMutation,
  useGetKycStatusQuery,
  useChangePasswordMutation,
  useGetATMLocationsMutation,
  useLazyCheckFreeQuery,
  useLazyGetNotificationsQuery,
  useGetNotificationsQuery,
  useLazyGetNotificationByIdQuery,
  useDeleteNotificationByIdMutation,
  useLazyGetATMByAddressQuery,
  useLazyGetNotificationsByFilterQuery,
} = usersApi;
