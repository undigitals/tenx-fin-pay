import React from 'react';
import { SCustomText, SCustomTextContainer } from './CustomText.styles';
import { ICustomText, ICustomTextStyleObj } from './CustomText.types';

export const CustomText: React.FC<ICustomText> = ({
  children,
  font = 'DM Sans',
  fontWeight = 'normal',
  size = 'normal',
  textColor = 'charcoal',
  fontStyle = 'normal',
  icon,
  className = '',
  innerClassName = '',
  textAlign = 'left',
  lineHeight = 1.2,
  display,
  cursorPointer = false,
  nowrap = false,
  onClick,
  extraStyles,
  ...props
}) => {
  const StylesObj: ICustomTextStyleObj = {
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
  };

  return (
    <SCustomTextContainer className={`custom-text ${className}`} display={display} onClick={onClick} nowrap={nowrap}>
      <>
        {icon ? <div style={{ flexGrow: 1 }}>{icon}</div> : null}
        <SCustomText
          fontWeight={fontWeight}
          size={size}
          color={textColor}
          $StylesObj={StylesObj}
          $extraStyles={extraStyles}
          textAlign={textAlign}
          className={`custom-text-inner ${innerClassName}`}
          display={display}
          lineHeight={lineHeight}
          cursorPointer={cursorPointer}
          fontStyle={fontStyle}
          onClick={onClick}
          font={font}
        >
          {children}
        </SCustomText>
      </>
    </SCustomTextContainer>
  );
};
