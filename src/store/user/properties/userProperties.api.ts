import { API_ROUTES } from 'vars/const/API_ROUTES';
import { GetUserInfoResponse, SetUserInfoRequest } from 'vars/types/userInfo.types';
import { api } from 'store/api';

export const userPropertiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserProperties: builder.query<any, void>({
      query: () => ({
        url: API_ROUTES.user.properties.allProperties,
        method: 'GET',
      }),
    }),
    getUserProperty: builder.query<any, string>({
      query: (propertyName) => ({
        url: API_ROUTES.user.properties.property(propertyName),
        method: 'GET',
        responseHandler: 'text',
      }),
    }),
    addUserProperties: builder.mutation<any, any>({
      query: (data) => ({
        url: API_ROUTES.user.properties.property(data.propertyName),
        method: 'PUT',
        body: { value: data.value },
      }),
      invalidatesTags: (result, error, arg) => (arg.propertyName === 'language' ? ['Menu', 'Language', 'FAQ', 'Video'] : []),
    }),
    getUserLanguage: builder.query<'en' | 'es', void>({
      query: () => ({
        url: API_ROUTES.user.properties.language,
        method: 'GET',
        responseHandler: 'text',
      }),
      providesTags: ['Language'],
    }),
    getAccountOpeningProperty: builder.query<GetUserInfoResponse, void>({
      query: () => ({
        url: API_ROUTES.user.properties.onboardingPreferences,
        method: 'GET',
      }),
      providesTags: ['Account-opening-data'],
      transformResponse: (response: { MyInfo: GetUserInfoResponse }) => response.MyInfo,
    }),
    setAccountOpeningProperty: builder.mutation<void, SetUserInfoRequest>({
      query: ({ userId, ...userInfo }) => ({
        url: API_ROUTES.user.properties.onboardingPreferences,
        method: 'PUT',
        body: { value: JSON.stringify({ MyInfo: userInfo }) },
      }),
      invalidatesTags: ['Account-opening-data'],
    }),
    getUIPreference: builder.query<any, void>({
      query: () => ({
        url: API_ROUTES.user.properties.UIPreference,
        method: 'GET',
      }),
    }),
    setUIPreference: builder.mutation({
      query: (data) => ({
        url: API_ROUTES.user.properties.UIPreference,
        method: 'PUT',
        body: { value: JSON.stringify(data.value) },
      }),
    }),
  }),
});

export const {
  useSetUIPreferenceMutation,
  useLazyGetUserLanguageQuery,
  useLazyGetUIPreferenceQuery,
  useLazyGetUserPropertyQuery,
  useLazyGetUserPropertiesQuery,
  useGetAccountOpeningPropertyQuery,
  useAddUserPropertiesMutation,
} = userPropertiesApi;
