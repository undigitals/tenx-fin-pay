import React from 'react';
import { render, screen, fireEvent } from 'test-utils';
import { waitFor } from '@testing-library/react';
import { CustomModal } from './CustomModal';

describe('Custom Modal test', () => {
  test('Modal visible', async () => {
    render(<CustomModal visible />);

    const cancelButton = screen.getByText('Cancel');
    await waitFor(() => expect(cancelButton).toBeInTheDocument());
  });

  test('Close modal with Cancel button', async () => {
    const handleCancelButtonPressed = jest.fn();

    render(<CustomModal visible destroyOnClose onCancel={handleCancelButtonPressed} />);

    const cancelButton = screen.getByText('Cancel');
    await waitFor(() => expect(cancelButton).toBeInTheDocument());

    fireEvent.click(cancelButton);
    expect(handleCancelButtonPressed).toHaveBeenCalledTimes(1);
  });

  test('Close modal with OK button', async () => {
    const handleOkButtonPressed = jest.fn();

    render(<CustomModal visible destroyOnClose onOk={handleOkButtonPressed} />);

    const okButton = screen.getByText('OK');
    await waitFor(() => expect(okButton).toBeInTheDocument());

    fireEvent.click(okButton);
    expect(handleOkButtonPressed).toHaveBeenCalledTimes(1);
  });
});
