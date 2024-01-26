import { ReactElement } from 'react';

export interface FundsSheetProps {
  isVisible?: boolean;
  onCancelHandler: () => void;
  title: string;
  children?: string | ReactElement;
}
