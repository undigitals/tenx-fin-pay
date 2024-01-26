import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { SmsCodeForm } from './SmsCodeForm';

const smsCodeFormHandleCompletionMock = jest.fn();
const smsCodeFormOnCompletionMock = jest.fn();
const errorMock = 'Error';

describe('SmsCodeForm tests', () => {
  test('Check ability to input number', async () => {
    render(<SmsCodeForm handleCompletion={smsCodeFormHandleCompletionMock} onCompletion={smsCodeFormOnCompletionMock} />);
    const smsCodeInput = screen.getByTestId('smsCode-num-0');
    userEvent.type(smsCodeInput, '1');
    await waitFor(() => expect(screen.getByDisplayValue('1')).toBeInTheDocument());
  });
  test('Check ability to input non-number', async () => {
    render(<SmsCodeForm handleCompletion={smsCodeFormHandleCompletionMock} onCompletion={smsCodeFormOnCompletionMock} />);
    const smsCodeInput = screen.getByTestId('smsCode-num-0');
    userEvent.type(smsCodeInput, 'a');
    await waitFor(() => expect((smsCodeInput as HTMLInputElement).value).toBe(''));
  });
  test('Check ability to delete', async () => {
    render(<SmsCodeForm handleCompletion={smsCodeFormHandleCompletionMock} onCompletion={smsCodeFormOnCompletionMock} />);
    const smsCodeInput = screen.getByTestId('smsCode-num-0');
    userEvent.click(smsCodeInput);
    userEvent.type(smsCodeInput, '1');
    userEvent.type(smsCodeInput, '{backspace}');
    userEvent.type(smsCodeInput, '{backspace}');
    await waitFor(() => expect((smsCodeInput as HTMLInputElement).value).toBe(''));
  });
  test('Check if next input field is focused after input to previous', async () => {
    render(<SmsCodeForm handleCompletion={smsCodeFormHandleCompletionMock} onCompletion={smsCodeFormOnCompletionMock} />);
    const smsCodeInputPrevious = screen.getByTestId('smsCode-num-0');
    const smsCodeInputNext = screen.getByTestId('smsCode-num-1');
    userEvent.click(smsCodeInputPrevious);
    userEvent.type(smsCodeInputPrevious, '1');
    await waitFor(() => expect(smsCodeInputNext).toBe(document.activeElement));
  });
  test('Check if next input field is focused after delete press on previous', async () => {
    render(<SmsCodeForm handleCompletion={smsCodeFormHandleCompletionMock} onCompletion={smsCodeFormOnCompletionMock} />);
    const smsCodeInputPrevious = screen.getByTestId('smsCode-num-0');
    const smsCodeInputNext = screen.getByTestId('smsCode-num-1');
    userEvent.click(smsCodeInputPrevious);
    userEvent.type(smsCodeInputPrevious, '{delete}');
    await waitFor(() => expect(smsCodeInputNext).toBe(document.activeElement));
  });
  test('Check if previous input field is focused after backspace press on next', async () => {
    render(<SmsCodeForm handleCompletion={smsCodeFormHandleCompletionMock} onCompletion={smsCodeFormOnCompletionMock} />);
    const smsCodeInputPrevious = screen.getByTestId('smsCode-num-0');
    const smsCodeInputNext = screen.getByTestId('smsCode-num-1');
    userEvent.click(smsCodeInputNext);
    userEvent.type(smsCodeInputNext, '{backspace}');
    await waitFor(() => expect(smsCodeInputPrevious).toBe(document.activeElement));
  });
  test('Check error display if checkError is passed', async () => {
    render(<SmsCodeForm handleCompletion={smsCodeFormHandleCompletionMock} onCompletion={smsCodeFormOnCompletionMock} checkError={errorMock} />);
    await waitFor(() => expect(screen.getByText('Error')).toBeInTheDocument());
  });
  test('Check error display if generateError is passed', async () => {
    render(<SmsCodeForm handleCompletion={smsCodeFormHandleCompletionMock} onCompletion={smsCodeFormOnCompletionMock} generateError={errorMock} />);
    await waitFor(() => expect(screen.getByText('Error')).toBeInTheDocument());
  });
});
