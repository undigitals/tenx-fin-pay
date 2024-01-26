import React from 'react';
import clsx from 'clsx';
import { SCustomButton } from './CustomButton2.styles';

export type TButtonType = 'primary' | 'alert' | 'transparent';
export type TButtonVariant = 'solid' | 'outlined';
export type TButtonSize = 'small' | 'middle' | 'middleStretch' | 'middleAlt' | 'xl' | 'standard';

export type ICustomButton2Props = {
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  type: TButtonType;
  variant: TButtonVariant;
  className?: string;
  disabled?: boolean;
  size?: TButtonSize;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const CustomButton2 = ({ htmlType, type, variant, disabled, className, children, size, onClick }: ICustomButton2Props) => {
  return (
    <SCustomButton type={htmlType} disabled={disabled} className={clsx(type, variant, size || 'standard', className)} onClick={onClick}>
      {typeof children === 'string' ? children : <div>{children}</div>}
    </SCustomButton>
  );
};
