import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import { waitFor } from '@testing-library/react';
import { CustomCheckbox } from './CustomCheckbox';

describe('Custom Checkbox test', () => {
  test('Checkbox is checked', async () => {
    render(<CustomCheckbox />);
    const checkbox = screen.getByTestId('checkbox');
    fireEvent.click(checkbox);
    await waitFor(() => expect(checkbox).toBeChecked());
  });

  test('Checkbox is not checked', async () => {
    render(<CustomCheckbox />);
    const checkbox = screen.getByTestId('checkbox');
    await waitFor(() => expect(checkbox).not.toBeChecked());
  });
});
