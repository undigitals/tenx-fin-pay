import React, { useState } from 'react';
import { FormInstance } from 'antd';
import { ValidationHelp } from 'components/general/ValidationHelp/ValidationHelp';
import { passwordFormStateHelper } from './passwordFormStateHelper';

export const useFormValidationHelper = (form: FormInstance, firstPasswordField: string, retypePasswordField?: string, ignorePasswordMatch = true) => {
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordMatchError, setPasswordMatchError] = useState<string[]>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const { getPasswordSuccessState, getPasswordErrorState, getPasswordMatchError, getPasswordMatchSuccess } = passwordFormStateHelper(form);

  const handleFormChange = () => {
    const errors = form.getFieldError(firstPasswordField);
    setPasswordErrors(errors);
    if (!ignorePasswordMatch) {
      const matchError = form.getFieldError(String(retypePasswordField));
      setPasswordMatchError(matchError);
    }
    setIsDisabled(
      (!ignorePasswordMatch && !(form.getFieldValue(firstPasswordField) === form.getFieldValue(String(retypePasswordField)))) ||
        form.getFieldValue(firstPasswordField)?.length === 0 ||
        passwordErrors?.length > 0
    );
  };

  const formValidationHelpStates: React.ReactNode = (
    <>
      <ValidationHelp
        message="preRegOnboarding.Minimum 8 characters"
        isError={getPasswordErrorState('Minimum 8 characters', passwordErrors, firstPasswordField)}
        isSuccess={getPasswordSuccessState('Minimum 8 characters', 'Please input your password', passwordErrors, firstPasswordField)}
      />
      <ValidationHelp
        message="preRegOnboarding.At least 1 capital letter (A-Z)"
        isError={getPasswordErrorState('At least 1 capital letter (A-Z)', passwordErrors, firstPasswordField)}
        isSuccess={getPasswordSuccessState('At least 1 capital letter (A-Z)', 'Please input your password', passwordErrors, firstPasswordField)}
      />
      <ValidationHelp
        message="preRegOnboarding.At least 1 number (0-9)"
        isError={getPasswordErrorState('At least 1 number (0-9)', passwordErrors, firstPasswordField)}
        isSuccess={getPasswordSuccessState('At least 1 number (0-9)', 'Please input your password', passwordErrors, firstPasswordField)}
      />
      <ValidationHelp
        message="changePassword.AtLeastOneSpecialCharacter"
        isError={getPasswordErrorState('At least 1 special character (!$%@&#?+-_)', passwordErrors, firstPasswordField)}
        isSuccess={getPasswordSuccessState('At least 1 special character (!$%@&#?+-_)', 'Please input your password', passwordErrors, firstPasswordField)}
      />
      {!ignorePasswordMatch && (
        <ValidationHelp
          message="changePassword.PasswordsMustMatch"
          isError={getPasswordMatchError(firstPasswordField, String(retypePasswordField), passwordMatchError)}
          isSuccess={getPasswordMatchSuccess(firstPasswordField, String(retypePasswordField), passwordMatchError)}
        />
      )}
    </>
  );
  return { isDisabled, passwordErrors, passwordMatchError, formValidationHelpStates, handleFormChange };
};
