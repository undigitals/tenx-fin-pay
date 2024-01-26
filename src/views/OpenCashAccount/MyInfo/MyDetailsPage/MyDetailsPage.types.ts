export type TRecord = {
  id?: number;
  label: string;
  value: string;
};

export type TMyDetailsProps = {
  options?: TRecord[];
  value?: any;
  onChange: (option: any) => void;
};

export type TIncomeRadioProps = {
  data: { id?: number; label: string; name: string }[];
  onChange: (value: string) => void;
  value?: string;
};

export type TEstimatedSourceProps = {
  data?: { id?: number; label: string; name: string }[];
  onChange: (value: TEstimatedSource) => void;
  value?: string;
};

export type TEstimatedSource = { id?: number; label: string; name: string };
