import React from 'react';
import { SIcon, STitleContainer, STitleText } from './Title.styles';
import { ITitle } from './Title.types';

export const Title: React.FC<ITitle & React.HTMLAttributes<HTMLHeadElement>> = ({
  children,
  icon,
  onClick,
  fontWeight = 'SB',
  size = 'S',
  color = 'charcoal',
  lineHeight,
  font = 'Poppins',
  textAlign = 'start',
  justifyContent = 'start',
  extraStyles,
  textTag = 'div',
  ...props
}) => (
  <STitleContainer {...props} extraStyles={extraStyles} justifyContent={justifyContent}>
    {icon && <SIcon>{icon}</SIcon>}
    <STitleText role="heading" font={font} textAlign={textAlign} fontWeight={fontWeight} size={size} color={color} as={textTag} lineHeight={lineHeight} className="custom-title-text" onClick={onClick}>
      {children}
    </STitleText>
  </STitleContainer>
);
