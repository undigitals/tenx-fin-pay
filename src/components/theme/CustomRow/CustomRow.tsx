import React from 'react';
import { SRow } from './CustomRow.styles';
import { ICustomRowProps } from './CustomRow.types';

export const CustomRow: React.FC<ICustomRowProps> = ({
  children,
  alignItems = 'center',
  justifyContent = 'space-between',
  flexDirection = 'row',
  marginBottom = 0,
  marginTop = 0,
  marginLeft = 0,
  marginRight = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingTop = 0,
  paddingRight = 0,
  gap = 'unset',
  width = 'auto',
  onClick,
  cursorPointer = false,
  minHeight = 'unset',
  height = 'unset',
  overflowY = 'unset',
  horizontalScroll = false,
  className = '',
  extraStyles,
  ...props
}) => (
  <SRow
    {...props}
    alignItems={alignItems}
    marginBottom={marginBottom}
    marginTop={marginTop}
    justifyContent={justifyContent}
    gap={gap}
    flexDirection={flexDirection}
    width={width}
    marginLeft={marginLeft}
    marginRight={marginRight}
    paddingTop={paddingTop}
    paddingLeft={paddingLeft}
    paddingRight={paddingRight}
    paddingBottom={paddingBottom}
    onClick={onClick}
    cursorPointer={cursorPointer}
    minHeight={minHeight}
    height={height}
    overflowY={overflowY}
    horizontalScroll={horizontalScroll}
    className={`custom-row ${className}`}
    extraStyles={extraStyles}
  >
    {children}
  </SRow>
);
