import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => typeof error === 'object' && error != null && 'status' in error;

// TODO: remove cast to `any` when TS is upgraded to 4.9 or newer
export const isErrorWithMessage = (error: unknown): error is { message: string } => typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string';

interface IBackendErrorData {
  Error?: string;
  Code?: number;
  ValidationErrors?: string[];
}

export const isBackendError = (error: unknown): error is { data: IBackendErrorData } => {
  const typedError = error as any;

  return (
    typeof typedError === 'object' &&
    typedError != null &&
    'data' in typedError &&
    typeof typedError?.data?.Code === 'number' &&
    (typeof typedError?.data?.Error === 'string' || Array.isArray(typedError?.data?.ValidationErrors))
  );
};

export const getBackendErrorData = (error: unknown): IBackendErrorData | undefined => (isBackendError(error) ? error.data : undefined);
