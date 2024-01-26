import { TPreset, TSize } from 'components/theme/CustomButton/CustomButton.types';

export interface IAccountButton {
  title: string;
  preset: TPreset;
  size: TSize;
  extraStyles: object;
  onClick?: () => void;
  src?: string;
  to: string;
}
