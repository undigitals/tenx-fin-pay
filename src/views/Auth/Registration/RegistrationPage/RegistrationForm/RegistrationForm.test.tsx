import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import { waitFor } from '@testing-library/react';
import { RegistrationForm } from './RegistrationForm';

describe('Registration page', () => {
  test('Check empty phone', async () => {
    render(<RegistrationForm />);
    const submitButton = screen.getByText('Register');
    fireEvent.submit(submitButton);
    await waitFor(() => expect(screen.getByText('Please input your mobile number')).toBeVisible());
  });

  // test('Check empty email', async () => {
  //   render(<RegistrationForm />);
  //   const submitButton = screen.getByText('Register');
  //   fireEvent.submit(submitButton);
  //   await waitFor(() => expect(screen.getByText('Please input your email')).toBeVisible());
  // });

  // test('Check password', async () => {
  //   render(<RegistrationForm />);
  //   const submitButton = screen.getByText('Register');
  //   fireEvent.submit(submitButton);
  //   await waitFor(() => expect(screen.getByText('Please input your password')).toBeVisible());
  // });
});
