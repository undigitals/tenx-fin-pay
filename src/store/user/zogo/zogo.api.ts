import { API_ROUTES } from 'vars/const/API_ROUTES';
import {
  IGetAllZogoPointsRequest,
  IGetAllZogoPointsResponse,
  IGetZogoModulesRequest,
  IGetZogoModulesResponse,
  IGetZogoPointsRequest,
  IGetZogoPointsResponse,
  IGetZogoSkillsRequest,
  IGetZogoSkillsResponse,
  IGetZogoTokenResponse,
  IPutZogoPointsRequest,
  IPutZogoPointsResponse,
} from 'vars/types/zogo.types';
import { api } from 'store/api';

export const zogoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getZogoPoints: builder.query<IGetZogoPointsResponse, IGetZogoPointsRequest>({
      query: (zogoUserId) => ({
        url: API_ROUTES.zogo.points,
        params: zogoUserId,
        timeout: 5000,
      }),
    }),
    putZogoPoints: builder.mutation<IPutZogoPointsResponse, IPutZogoPointsRequest>({
      query: (requestBody) => ({
        url: `${API_ROUTES.zogo.points}?zogoUserId=${requestBody.zogoUserId}`,
        method: 'PUT',
        body: {
          primaryPointsChangeAmount: requestBody.primaryPointsChangeAmount,
          primaryPointsChangeType: requestBody.primaryPointsChangeType,
        },
      }),
    }),
    getAllZogoPoints: builder.mutation<IGetAllZogoPointsResponse, IGetAllZogoPointsRequest>({
      query: (credentials) => ({
        url: API_ROUTES.zogo.allPoints,
        body: credentials,
      }),
    }),
    getZogoSkills: builder.mutation<IGetZogoSkillsResponse, IGetZogoSkillsRequest>({
      query: (zogoUserId) => ({
        url: API_ROUTES.zogo.skills,
        params: zogoUserId,
      }),
    }),
    getZogoModules: builder.mutation<IGetZogoModulesResponse, IGetZogoModulesRequest>({
      query: ({ zogoUserId, skillId }) => ({
        url: API_ROUTES.zogo.modules,
        params: { zogoUserId, skillId },
      }),
    }),
    getZogoToken: builder.query<IGetZogoTokenResponse, void>({
      query: () => ({
        url: API_ROUTES.zogo.token,
      }),
    }),
  }),
});

export const { useLazyGetZogoPointsQuery, usePutZogoPointsMutation, useLazyGetZogoTokenQuery } = zogoApi;
