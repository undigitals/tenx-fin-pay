import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import { waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouterWrapper } from 'utils/helpers/testComponentsWrappers';
import { Icon } from 'components/general/Icon/Icon';
import { Card } from './Card';

const cardItem = {
  title: 'Exit',
  icon: <Icon name="logout" color="blue" size="big" />,
  buttonText: 'Exit Button',
  route: '/',
};

describe('Card', () => {
  test('Navigate to provided path on card click', async () => {
    const history = createMemoryHistory();
    render(<Card {...cardItem} />, { wrapper: HistoryRouterWrapper(history) });
    const testButton = screen.getByText('Exit Button');
    fireEvent.click(testButton);
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });
});
