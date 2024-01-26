import { TThemeColor } from 'styles/theme';
import { TIconName } from 'components/general/Icon/Icon.types';

export interface IBigCard {
  iconName: TIconName;
  handlePassedButtonClick?: () => void;
  iconColor: TThemeColor;
  bgColor: TThemeColor;
  title: string;
  buttonText: string;
  description: string | React.ReactNode;
  boldText?: string;
  tenxPoints?: number | string;
  tooltip?: boolean;
  className?: string;
  to?: string;
  showPoints?: boolean;
}
