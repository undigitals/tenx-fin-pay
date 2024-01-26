import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store/store';
import { Mutex } from 'async-mutex';
import { API_ROUTES } from 'vars/const/API_ROUTES';
import { cleanUserData, setToken } from 'store/user/authentication.slice';
import { ROUTES } from 'vars/const/ROUTES';
import { HTTP_STATUS } from 'vars/const/API_CODES';
import { i18n } from 'i18n/i18n';
import { mobileApiCall } from 'services/mobileService';
import { getOtpToken, getRequestChecksum } from './encrypt';
import { lsGetItem } from './storage';

interface ICreateBaseQyeryArgs {
  baseUrl: string;
  token?: string | null;
  checksum?: string;
  language?: string;
  credentials?: RequestCredentials;
}

export const createBaseQuery = ({ baseUrl, token, checksum, credentials }: ICreateBaseQyeryArgs) =>
  fetchBaseQuery({
    baseUrl,
    credentials,
    prepareHeaders: (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      if (checksum) {
        headers.set('checksum', checksum);
      }

      headers.set('Accept-Language', `${i18n.language};q=0.6`);

      return headers;
    },
  });

export const createSecureBaseQuery = (baseUrl = '', withChecksum = true) => {
  const secureHeaderBaseQuery: BaseQueryFn<string | FetchArgs> = async (args, api, extraOptions) => {
    const { otpSeed: otpSeedFromStore, token } = (api.getState() as RootState).authentication;

    const otpSeed = otpSeedFromStore || lsGetItem('otpSeed');

    const queryOptions: ICreateBaseQyeryArgs = {
      baseUrl,
      token,
      language: i18n.language,
    };

    // @ts-ignore
    const isWithChecksum = extraOptions?.bypassChecksum !== false && otpSeed && withChecksum;

    if (isWithChecksum) {
      const argsUrl = typeof args === 'string' ? args : args?.url;
      const argsBody = typeof args === 'string' ? null : args?.body;
      const queryStr = typeof args === 'object' && args?.params ? `?${new URLSearchParams(args.params).toString()}` : '';
      const apiUrl = `${baseUrl}${argsUrl}${queryStr}`.match(/\/api.+/gi)?.[0] ?? '';
      queryOptions.checksum = await getRequestChecksum(otpSeed, apiUrl, argsBody);
    }
    const secureBaseQuery = createBaseQuery(queryOptions);

    return secureBaseQuery(args, api, extraOptions);
  };

  return secureHeaderBaseQuery;
};

interface IQueryExtraOptions {
  ignoreTokenCheck?: boolean;
}

export const createCustomBaseQuery = (baseUrl = process.env.REACT_APP_API_URL, withChecksum = true) => {
  const queryMutex = new Mutex();
  const currentBaseQuery = createSecureBaseQuery(baseUrl, withChecksum);
  const clearBaseQuery = createSecureBaseQuery(baseUrl);

  const queryWithTokenRefreshment: BaseQueryFn<string | FetchArgs> = async (args, api, extraOptions: IQueryExtraOptions) => {
    await queryMutex.waitForUnlock();
    const { otpSeed, refreshToken, token } = (api.getState() as RootState).authentication;
    let result = await currentBaseQuery(args, api, extraOptions);
    // @ts-ignore
    const isTokenExpired = result?.error?.status === HTTP_STATUS.UNAUTHORIZED;
    const isMobileApp = lsGetItem('isMobileApp');
    const ignoreTokenCheck = !!extraOptions?.ignoreTokenCheck;

    if (isTokenExpired && !isMobileApp && !ignoreTokenCheck) {
      if (!queryMutex.isLocked()) {
        const release = await queryMutex.acquire();

        try {
          const seed = otpSeed || lsGetItem('otpSeed');
          if (!seed) throw new Error('No OTP Seed found to refresh token . Logging out.');

          const otpToken = getOtpToken(seed);

          const refreshResult = await clearBaseQuery(
            {
              method: 'POST',
              credentials: 'include',
              url: API_ROUTES.auth.refreshToken,
              body: {
                authToken: token,
                refreshToken,
                otpToken,
                fingerprint: 'string',
              },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            // Update auth token
            // @ts-ignore
            const freshToken = refreshResult.data?.token;

            api.dispatch(
              setToken({
                token: freshToken,
              })
            );
            result = await currentBaseQuery(args, api, extraOptions);
          } else {
            throw new Error('Cannot refresh auth token. Logging out.');
          }
        } catch (err) {
          api.dispatch(cleanUserData());
          window.location.href = ROUTES.login.path;
        } finally {
          release();
        }
      } else {
        await queryMutex.waitForUnlock();
        result = await currentBaseQuery(args, api, extraOptions);
      }
    }

    if (isTokenExpired && isMobileApp) {
      api.dispatch(cleanUserData());
      mobileApiCall('logout');
    }

    return result;
  };
  return queryWithTokenRefreshment;
};
