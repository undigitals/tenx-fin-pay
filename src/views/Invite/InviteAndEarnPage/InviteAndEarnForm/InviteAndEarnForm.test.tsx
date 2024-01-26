import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import { waitFor } from '@testing-library/react';
import { InviteAndEarnForm } from './InviteAndEarnForm';

describe('Refer friend page', () => {
  test('Check empty name', async () => {
    render(<InviteAndEarnForm />);
    const submitButton = screen.getByText('Invite');
    fireEvent.submit(submitButton);
    await waitFor(() => expect(screen.getByText('Please input your name')).toBeVisible());
  });

  test('Check empty friend name', async () => {
    render(<InviteAndEarnForm />);
    const submitButton = screen.getByText('Invite');
    fireEvent.submit(submitButton);
    await waitFor(() => expect(screen.getByText('Please input your friend&apos;s full name')).toBeVisible());
  });

  test('Check empty friend phone', async () => {
    render(<InviteAndEarnForm />);
    const submitButton = screen.getByText('Invite');
    fireEvent.submit(submitButton);
    await waitFor(() => expect(screen.getByText('Please input your friend&apos;s phone number')).toBeVisible());
  });
});
