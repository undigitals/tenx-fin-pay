import i18next from 'i18next';
import { showNotification } from './notification/showNotification';
import { isErrorWithMessage, isFetchBaseQueryError } from './rtqErrorHandling';

export const handleError = (err: any) => {
  if (isFetchBaseQueryError(err)) {
    const errorMessage = 'error' in err ? err.error : JSON.stringify(err.data);
    const errorMessageData = JSON.parse(errorMessage);
    const isValidationErrorsExist: boolean = Array.isArray(errorMessageData.ValidationErrors);
    const shownErrorMessage = `${
      errorMessageData.Error && isValidationErrorsExist ? `${errorMessageData.Error} ${i18next.t(`errors.${errorMessageData.ValidationErrors.join(', ')}`)}` : `${errorMessageData.Error}`
    }`;
    showNotification({
      type: 'error',
      message: shownErrorMessage,
    });
  } else if (isErrorWithMessage(err)) {
    showNotification({
      type: 'error',
      message: err.message,
    });
  }
};
