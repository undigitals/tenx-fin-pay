import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import { waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouterWrapper } from 'utils/helpers/testComponentsWrappers';
import { ROUTES } from 'vars/const/ROUTES';
import { WelcomePage } from './WelcomePage';

describe('Started Page', () => {
  test('Navigate /login on Log in button click', async () => {
    const history = createMemoryHistory();
    render(<WelcomePage />, { wrapper: HistoryRouterWrapper(history) });
    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);
    await waitFor(() => expect(history.location.pathname).toBe('/login'));
  });
  test('Navigate /register on Register button click', async () => {
    const history = createMemoryHistory();
    render(<WelcomePage />, { wrapper: HistoryRouterWrapper(history) });
    const signUpButton = screen.getByText('Sign Up');
    fireEvent.click(signUpButton);
    await waitFor(() => expect(history.location.pathname).toBe(ROUTES.registration.path));
  });
});
