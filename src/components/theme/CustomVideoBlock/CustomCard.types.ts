import { ReactNode } from 'react';
import { TThemeColor } from 'styles/theme';

export interface ICustomVideoBlockProps {
  title: string;
  colorScheme: TThemeColor;
  playing?: boolean;
  handlePlay?: Function;
  videoSrc: string;
  description?: string | ReactNode;
}
