import { TThemeColor } from 'styles/theme';

export interface ILoader {
  color?: TThemeColor;
  noPadding?: boolean;
  header?: string;
  noText?: boolean;
}

export interface ISLoader {
  color: TThemeColor;
  noPadding: boolean;
}
