export type IBaseSelectOption = {
  value: string;
  label: string;
};

export interface ICurrentAvailableBalanceSheetProps {
  options: IBaseSelectOption[];
  defaultValue?: string;
  onChange: (item: IBaseSelectOption) => void;
  onClose: () => void;
  open: boolean;
}
