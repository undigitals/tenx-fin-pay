import { ReactElement, ReactNode } from 'react';

export interface CustomDropdownInputProps {
  bgColor?: 'white' | 'creamSS2';
  stylePreset?: 'regular' | 'on-white';
  marginBottom?: number;
  marginRight?: number;
  onChange?: (event: unknown) => void;
  defaultValue?: string;
  placeholder?: string | ReactElement;
  children?: ReactNode | ReactNode[];
  dDstyle?: 'default' | 'transfer';
  onBlur?: () => void;
  onClick?: () => void;
  dropdownStyle?: React.CSSProperties;
}
