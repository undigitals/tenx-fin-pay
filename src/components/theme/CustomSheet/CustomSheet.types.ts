import { DrawerProps } from 'antd';
import { ReactNode } from 'react';

export interface ICustomSheetProps extends DrawerProps {
  id?: string;
  children: ReactNode;
  footer?: ReactNode;
  titleExtra?: ReactNode;
  title?: string;
  subtitle?: string | ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
  hasCloseIcon?: boolean;
  header?: boolean;
  height?: string;
  borderRadius?: string;
  width?: string;
  modalBottom?: string;
  maxHeight?: string;
  wrapperPadding?: boolean;
  headerStyle?: IHeaderStyle;
  paddingBottom?: string;
  paddingTop?: string;
  padding?: string;
  className?: string;
  footerStyle?: React.CSSProperties;
}

export interface IHeaderStyle {
  borderRadius?: string;
  background?: string;
  minHeight?: string | number;
  padding?: string | number;
  paddingBottom?: string | number;
}

export type THeaderProps = {
  $headerStyle?: IHeaderStyle;
};

export interface ISDialogBodyProps {
  paddingBottom?: string;
  paddingTop?: string;
  padding?: string;
}

export interface ICustomSheetTitleProps {
  title?: string;
  subtitle?: ReactNode | string;
  extra?: ReactNode;
}

export interface ISCustomSheet {
  className?: string;
  height?: string;
  width?: string;
  modalBottom?: string;
  maxHeight?: string;
  borderRadius?: string;
  isDialogOpen?: boolean;
  wrapperPadding?: boolean;
}

export interface ISDialogHeaderProps {
  $headerStyle?: IHeaderStyle;
}
