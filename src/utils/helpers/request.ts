export interface IErrorRes {
  data?: {
    Error?: string;
    error?: string;
    validationErrors?: string[];
  };
}

export interface IRequestResult {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  error?: IErrorRes;
  errorMessage?: string;
  data?: any;
}

export const handleApiRequestResult = (result: IRequestResult) => {
  const { isSuccess, isError, isLoading, error, data } = result;
  const resultData: IRequestResult = {
    isSuccess,
    isLoading,
    isError,
    data,
  };

  const errorData = error?.data;

  if (errorData?.error) {
    resultData.errorMessage = `${errorData?.error} ${errorData?.validationErrors?.join(' ')}`;
  }

  if (errorData?.Error) {
    resultData.errorMessage = errorData?.Error;
  }

  return resultData;
};
