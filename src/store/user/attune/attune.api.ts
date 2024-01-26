import { API_ROUTES } from 'vars/const/API_ROUTES';
import { api } from 'store/api';
import { IGetAttuneResultsRequest, IResultItem } from './attune.types';

export const attuneApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAttuneResults: builder.query<IResultItem[], IGetAttuneResultsRequest>({
      query: (credentials) => ({
        url: API_ROUTES.user.attune.quizResult(credentials.id),
        params: credentials,
      }),
    }),
  }),
});

export const { useLazyGetAttuneResultsQuery } = attuneApi;
