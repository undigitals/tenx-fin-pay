import React from 'react';
import { fireEvent, render, screen } from 'test-utils';
import { waitFor } from '@testing-library/react';
import { CustomSheet } from './CustomSheet';

describe('Custom Modal test', () => {
  test('Sheet is visible', async () => {
    render(<CustomSheet isOpen>Sample</CustomSheet>);

    const cancelButton = screen.getByText('Cancel');
    await waitFor(() => expect(cancelButton).toBeInTheDocument());
  });

  test('Close modal with Cancel button', async () => {
    const handleCancelButtonPressed = jest.fn();

    render(<CustomSheet isOpen>Sample</CustomSheet>);

    const cancelButton = screen.getByText('Cancel');
    await waitFor(() => expect(cancelButton).toBeInTheDocument());

    fireEvent.click(cancelButton);
    expect(handleCancelButtonPressed).toHaveBeenCalledTimes(1);
  });

  test('Close modal with OK button', async () => {
    const handleOkButtonPressed = jest.fn();

    render(<CustomSheet isOpen>Sample</CustomSheet>);

    const okButton = screen.getByText('OK');
    await waitFor(() => expect(okButton).toBeInTheDocument());

    fireEvent.click(okButton);
    expect(handleOkButtonPressed).toHaveBeenCalledTimes(1);
  });
});
