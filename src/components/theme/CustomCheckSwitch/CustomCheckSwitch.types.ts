export interface InnerProps {
  selected?: boolean;
  checked?: boolean;
}

export interface SwitchProps {
  checked?: boolean;
}

export interface CustomCheckSwitchProps {
  checked?: boolean;
  onChange?: (newState: boolean) => void;
}
