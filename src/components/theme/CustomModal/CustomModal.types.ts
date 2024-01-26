import { ModalProps } from 'antd';
import { ReactNode } from 'react';
import { TThemeColor } from 'styles/theme';

export interface ICustomModalProps extends ModalProps {
  display?: string;
  children?: ReactNode;
  maskStyle?: React.CSSProperties;
  bodyStlye?: React.CSSProperties;
  closeIcon?: React.ReactNode;
  centered?: boolean;
  destroyOnClose?: boolean;
  footer?: React.ReactNode;
  topPosition?: string | number;
  bottomPosition?: string;
  padding?: string;
  margin?: string;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  isStickedToBottom?: boolean;
  contentHeight?: string | number;
  closeIconColor?: TThemeColor;
  onClose?: () => void;
  closable?: boolean;
}

export interface ISModal {
  padding: string;
  margin?: string;
  isFullWidth?: boolean;
  contentHeight?: string | number;
  closeIconColor?: TThemeColor;
}
