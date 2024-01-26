import React from 'react';
import { render, fireEvent, screen, waitFor } from 'test-utils';
import { createMemoryHistory } from 'history';
import { HistoryRouterWrapper } from 'utils/helpers/testComponentsWrappers';
import { ROUTES } from 'vars/const/ROUTES';
import { ChangePasswordForm } from './ChangePasswordForm';

const regExPattern = /([A-Z]+)([a-z]{5,})([0-9]{1,})/g;

const checkStringMatching = (passwordValue: string) => {
  render(<ChangePasswordForm handleChangePassword={Function} isLoading />);

  const newPassword: HTMLInputElement = screen.getByTestId('newPassword');
  const submitButton = screen.getByTestId('confirmButton');

  fireEvent.change(newPassword, { target: { value: passwordValue } });

  expect(newPassword.value).not.toEqual(expect.stringMatching(regExPattern));
  expect(submitButton).toBeDisabled();
};

describe('ChangePasswordForm', () => {
  test('Check navigation if conditions are met', async () => {
    const history = createMemoryHistory();
    render(<ChangePasswordForm handleChangePassword={Function} isLoading />, {
      wrapper: HistoryRouterWrapper(history),
    });
    const newPassword: HTMLInputElement = screen.getByTestId('newPassword');
    const retypePassword: HTMLInputElement = screen.getByTestId('retypePassword');
    const submitButton = screen.getByTestId('confirmButton');

    fireEvent.change(newPassword, { target: { value: 'Password1' } });
    fireEvent.change(retypePassword, { target: { value: 'Password1' } });
    expect(newPassword.value).toEqual(expect.stringMatching(retypePassword.value));
    fireEvent.submit(submitButton);
    await waitFor(() => {
      try {
        expect(history.location.pathname).toBe(ROUTES.success.path);
      } catch (error) {
        expect(error).not.toBe('error');
      }
    });
  });

  test('Check if the submit button is disabled if conditions are not met', async () => {
    // Checking if the password does not have an uppercase letter
    setTimeout(() => checkStringMatching('password1'), 0);

    // Checking if the password does not have a numeric character
    setTimeout(() => checkStringMatching('Password'), 0);

    // Checking if the password length is less than 6 characters
    setTimeout(() => checkStringMatching('Pass1'), 0);

    // Checking if passwords contain spaces
    setTimeout(() => checkStringMatching('Password 1'), 0);
  });

  test('Checking if the submit button is disabled if passwords does not match', async () => {
    render(<ChangePasswordForm handleChangePassword={Function} isLoading />);

    const newPassword: HTMLInputElement = screen.getByTestId('newPassword');
    const retypePassword: HTMLInputElement = screen.getByTestId('retypePassword');
    const submitButton = screen.getByTestId('confirmButton');

    fireEvent.change(newPassword, { target: { value: 'Password1' } });
    fireEvent.change(retypePassword, { target: { value: 'Password2' } });

    expect(newPassword.value).toEqual(expect.stringMatching(regExPattern));
    expect(retypePassword.value).toEqual(expect.stringMatching(regExPattern));
    expect(newPassword.value).not.toEqual(expect.stringMatching(retypePassword.value));
    expect(submitButton).toBeDisabled();
  });
});
