export interface IDigitalCodeInputProps {
  size?: number;
  borderRadius?: string;
  name?: string;
  value?: string;
  hasSubmitError?: boolean;
  isWrapped?: boolean;
  separatorsAfter?: number[];
  onChange?: (val: string) => void;
  showCaret?: boolean;
}
