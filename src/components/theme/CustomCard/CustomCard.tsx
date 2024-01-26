import React from 'react';
import { SCard } from './CustomCard.styles';
import { CustomCardProps } from './CustomCard.types';

export const CustomCard: React.FC<CustomCardProps> = ({
  children,
  marginBottom = 0,
  marginTop = 16,
  onClick,
  className,
  cursorPointer = false,
  position = 'relative',
  borderRadius = 25,
  padding = '24px',
  border = 'none',
  width = 'auto',
  height = 'auto',
  background = 'white',
  extraStyles,
}) => (
  <SCard
    onClick={onClick}
    marginBottom={marginBottom}
    marginTop={marginTop}
    className={className}
    cursorPointer={cursorPointer}
    borderRadius={borderRadius}
    padding={padding}
    border={border}
    width={width}
    background={background}
    position={position}
    height={height}
    $extraStyles={extraStyles}
  >
    {children}
  </SCard>
);
