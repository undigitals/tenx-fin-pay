import { API_ROUTES } from 'vars/const/API_ROUTES';
import { api } from 'store/api';

export const truvApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBridgeToken: builder.mutation<any, void>({
      query: () => ({
        url: API_ROUTES.user.truvToken,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetBridgeTokenMutation } = truvApi;
