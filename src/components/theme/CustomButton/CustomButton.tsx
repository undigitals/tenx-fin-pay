import React from 'react';
import clsx from 'clsx';
import { SButton, SChildrenWrapper } from './CustomButton.styles';
import { ICustomButtonProps, ICustomButtonStyleObj } from './CustomButton.types';

export const CustomButton = ({ type, children, onClick, preset, size, disabled, ...props }: ICustomButtonProps) => {
  const StyleObj: ICustomButtonStyleObj = {
    marginBottom: props.marginBottom,
    marginTop: props.marginTop,
    marginRight: props.marginRight,
    marginLeft: props.marginLeft,
    letterSpacing: props.letterSpacing,
    width: props.width,
  };

  return (
    <SButton className={clsx(preset || 'default')} $preset={preset} $size={size} $StyleObj={StyleObj} type={type} onClick={onClick} disabled={disabled} {...props}>
      {typeof children === 'string' ? children : <SChildrenWrapper>{children}</SChildrenWrapper>}
    </SButton>
  );
};
