import React from 'react';
import { render, screen } from 'test-utils';
import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouterWrapper } from 'utils/helpers/testComponentsWrappers';
import { ForgotPasswordPage } from './ForgotPasswordPage';

describe('Forgot password page', () => {
  test('Check button disabled state when email selected', async () => {
    const history = createMemoryHistory();
    render(<ForgotPasswordPage />, { wrapper: HistoryRouterWrapper(history) });
    const submitButton = screen.getByTestId('confirmButton');
    fireEvent.click(submitButton);
  });
});
