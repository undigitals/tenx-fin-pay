import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { createBaseQuery } from 'utils/helpers/baseQuery';

export const unprotectedApi = createApi({
  reducerPath: 'unprotectedApi',
  baseQuery: createBaseQuery({
    baseUrl: process.env?.REACT_APP_API_URL ?? '',
    credentials: 'include',
  }),
  endpoints: () => ({}),
});
