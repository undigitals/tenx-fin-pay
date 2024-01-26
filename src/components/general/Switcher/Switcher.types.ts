import { TThemeColor } from 'styles/theme';

export interface ISwitcherProps {
  activeColor?: TThemeColor;
  inactiveColor?: TThemeColor;
  checked?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
