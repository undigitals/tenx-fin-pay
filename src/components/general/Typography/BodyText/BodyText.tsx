import React from 'react';
import { SBodyText, SBodyTextContainer, SIcon } from './BodyText.styles';
import { IBodyText } from './BodyText.types';

export const BodyText: React.FC<IBodyText & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  textType = 'bodyText',
  icon,
  font = 'DM Sans',
  fontWeight = 'R',
  size = 'S',
  color = 'charcoal',
  textAlign = 'start',
  justifyContent = 'start',
  lineHeight = 1.2,
  display,
  cursorPointer = false,
  nowrap = false,
  onClick,
  extraStyles,
  textTag = 'div',
  underlined = false,
  ...props
}) => (
  <SBodyTextContainer role="dialog" className="body-text" display={display} nowrap={nowrap} justifyContent={justifyContent} cursorPointer={cursorPointer} {...props} extraStyles={extraStyles}>
    {icon ? <SIcon>{icon}</SIcon> : null}
    <SBodyText
      role="textbox"
      textType={textType}
      as={textTag}
      font={font}
      fontWeight={fontWeight}
      size={size}
      color={color}
      lineHeight={lineHeight}
      textAlign={textAlign}
      display={display}
      underlined={underlined}
      className="custom-text-inner"
      cursorPointer={cursorPointer}
      onClick={onClick}
    >
      {children}
    </SBodyText>
  </SBodyTextContainer>
);
