export interface ISmsCodeInputProps {
  size?: number;
  name?: string;
  value?: string;
  hasSubmitError?: boolean;
  inputTheme?: string;
  separatorsAfter?: number[];
  onChange?: (val: string) => void;
  placeholder?: string;
  isCompleted?: boolean;
  isWrongCode?: boolean;
}

export interface ISmsFormProps {
  handleCompletion: (code: string) => void;
  onCompletion?: React.Dispatch<React.SetStateAction<boolean>>;
  inputTheme?: string;
  size?: number;
  checkError?: string;
  generateError?: string;
  separatorsAfter?: number[];
  placeholder?: string;
  isWrongCode?: boolean;
}

export interface ISmsFormValues {
  smsCode: string[];
}

export interface ISInputNumber {
  isError?: boolean;
  isCompleted?: boolean;
  isWrongCode?: boolean;
}
