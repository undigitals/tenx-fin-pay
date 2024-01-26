// @ts-nocheck
import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import { waitFor } from '@testing-library/react';
import { MessageInput } from './MessageInput';

describe('Message Input', () => {
  test('Chek message input is editable', async () => {
    render(<MessageInput />);
    const input = screen.getByTestId('message-input');
    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => expect(input.value).toBe('test'));
  });

  test('Check clear message button appears on input value change', async () => {
    render(<MessageInput />);
    const input = screen.getByTestId('message-input');
    const clearMessageButton = screen.getByTestId('input-clear-button');
    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => expect(clearMessageButton).toBeVisible());
  });

  test('Check clear message button clears message and hides', async () => {
    render(<MessageInput />);
    const input = screen.getByTestId('message-input');
    const clearMessageButton = screen.getByTestId('input-clear-button');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(clearMessageButton);
    await waitFor(() => expect(input.value).toBe(''));
    await waitFor(() => expect(clearMessageButton).not.toBeInTheDocument());
  });

  test('Check send message button appends on message input fill', async () => {
    render(<MessageInput />);
    const input = screen.getByTestId('message-input');
    fireEvent.change(input, { target: { value: 'test' } });
    const sendButton = screen.getByTestId('send-button');
    await waitFor(() => expect(sendButton).toBeVisible());
  });
});
