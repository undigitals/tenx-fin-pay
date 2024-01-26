import React, { ReactElement } from 'react';

export interface IRadioButtonProps {
  children?: string | ReactElement;
  checked?: boolean;
  disabled?: boolean;
  isError?: boolean;
  errorText?: string;
  onChange?: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}
