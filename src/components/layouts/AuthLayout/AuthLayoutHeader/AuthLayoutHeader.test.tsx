import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import { waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouterWrapper } from 'utils/helpers/testComponentsWrappers';
import { ROUTES } from 'vars/const/ROUTES';
import { AuthLayoutHeader } from './AuthLayoutHeader';

describe('Auth Layout Header', () => {
  test('Navigate to /started on logo click', async () => {
    const history = createMemoryHistory();
    render(<AuthLayoutHeader />, { wrapper: HistoryRouterWrapper(history) });
    const logo = screen.getByText('tenxLongWhite.svg');
    fireEvent.click(logo);
    await waitFor(() => expect(history.location.pathname).toBe(ROUTES.started.path));
  });
});
