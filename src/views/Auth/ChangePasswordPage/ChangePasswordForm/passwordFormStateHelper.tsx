import { FormInstance } from 'antd';

export const passwordFormStateHelper = (form: FormInstance) => {
  const getPasswordSuccessState = (errorValue: string, extraErrorValue: string, passwordErrors: string[], fieldValue: string): boolean =>
    Number(form?.getFieldValue(fieldValue)?.length) > 0 && !passwordErrors?.includes(errorValue) && !passwordErrors?.includes(extraErrorValue) && form?.isFieldTouched(fieldValue);

  const getPasswordErrorState = (errorValue: string, passwordErrors: string[], fieldValue: string): boolean =>
    Number(form?.getFieldValue(fieldValue)?.length) > 0 && passwordErrors?.includes(errorValue) && form?.isFieldTouched(fieldValue);

  const getPasswordMatchError = (firstPasswordField: string, retypePasswordField: string, passwordMatchError?: string[]): boolean =>
    Number(passwordMatchError?.length) > 0 && form.getFieldValue(firstPasswordField) !== form.getFieldValue(retypePasswordField);

  const getPasswordMatchSuccess = (firstPasswordField: string, retypePasswordField: string, passwordMatchError?: string[]): boolean =>
    Number(passwordMatchError?.length) === 0 &&
    form.isFieldTouched(firstPasswordField) &&
    form.getFieldValue(firstPasswordField) !== undefined &&
    form.getFieldValue(firstPasswordField) !== '' &&
    form.getFieldValue(firstPasswordField) === form.getFieldValue(retypePasswordField);

  return {
    getPasswordSuccessState,
    getPasswordErrorState,
    getPasswordMatchError,
    getPasswordMatchSuccess,
  };
};
