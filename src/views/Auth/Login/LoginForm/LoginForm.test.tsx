import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import { createMemoryHistory } from 'history';
import { HistoryRouterWrapper } from 'utils/helpers/testComponentsWrappers';
import { waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('Login page', () => {
  test('Check empty mobile number', async () => {
    render(<LoginForm />);
    const submitButton = screen.getByText('Log in');
    fireEvent.submit(submitButton);
    await waitFor(() => expect(screen.getByText('Please input your mobile number')).toBeVisible());
  });

  test('Check empty password', async () => {
    render(<LoginForm />);
    const submitButton = screen.getByText('Log in');
    fireEvent.submit(submitButton);
    await waitFor(() => expect(screen.getByText('Please input your password')).toBeVisible());
  });

  test('Check log in', async () => {
    const history = createMemoryHistory();
    render(<LoginForm />, { wrapper: HistoryRouterWrapper(history) });

    const submitButton = screen.getByText('Log in');
    const mobileInput = screen.getByTestId('mobileInput');
    const passwordInput = screen.getByTestId('passwordInput');

    fireEvent.change(mobileInput, { target: { value: '+15512992500' } });
    fireEvent.change(passwordInput, { target: { value: 'string' } });
    fireEvent.submit(submitButton);
  });

  test('Check /forgot on forgot password link', async () => {
    const history = createMemoryHistory();
    render(<LoginForm />, { wrapper: HistoryRouterWrapper(history) });

    const forgotPassword = screen.getByText('Forgot Password?');
    fireEvent.click(forgotPassword);
  });
});
