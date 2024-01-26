export interface IPhoneInputProps {
  redBorder?: boolean;
  size?: number;
  name?: string;
  value?: string;
  hasSubmitError?: boolean;
  isCompleted?: boolean;
  inputTheme?: string;
  separatorsAfter?: number[];
  onChange?: (val: string) => void;
}

export interface IPhoneFormProps {
  redBorder?: boolean;
  handleCompletion: (code: string) => void;
  onCompletion?: React.Dispatch<React.SetStateAction<boolean>>;
  inputTheme?: string;
  size?: number;
  checkError?: string;
  generateError?: string;
  separatorsAfter?: number[];
  defaultValue?: string;
}

export interface IPhoneFormValues {
  phoneNumber: string[];
}

export interface ISInputNumber {
  isError?: boolean;
  isCompleted?: boolean;
}
