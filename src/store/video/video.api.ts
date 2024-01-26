import { API_ROUTES } from 'vars/const/API_ROUTES';
import { api } from 'store/api';
import { IVideoItem, TGroupName } from './video.types';

export const videoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: (groupName: TGroupName) => ({
        url: API_ROUTES.video(groupName),
        method: 'GET',
      }),
      transformResponse: (response: IVideoItem[]) => response.sort((a, b) => a.groupIndex - b.groupIndex),
      providesTags: ['Video'],
    }),
  }),
});

export const { useLazyGetVideosQuery } = videoApi;
