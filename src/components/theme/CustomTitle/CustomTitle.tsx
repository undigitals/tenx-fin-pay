import React from 'react';
import { ICustomTitle, ICustomTitleStyleObj } from './CustomTitle.types';
import { SCustomTitleContainer, SCustomTitleIcon, SCustomTitleText } from './CustomTitle.styles';

export const CustomTitle: React.FC<ICustomTitle> = ({
  icon,
  onClick,
  children,
  font = 'Poppins',
  fontWeight = 'normal',
  size = 'normal',
  textColor = 'charcoal',
  marginBottom = 'small',
  marginTop = 'none',
  align = 'center',
  textTag = 'div',
  className,
  textAlign = 'start',
  lineHeight = 1,
  extraStyles,
  ...props
}) => {
  const StylesObj: ICustomTitleStyleObj = {
    paddingTop: props.paddingTop,
    paddingBottom: props.paddingBottom,
    paddingRight: props.paddingRight,
    paddingLeft: props.paddingLeft,
  };

  return (
    <SCustomTitleContainer onClick={onClick} marginBottom={marginBottom} marginTop={marginTop} align={align} className={`custom-title ${className}`}>
      {icon && <SCustomTitleIcon>{icon}</SCustomTitleIcon>}
      <SCustomTitleText
        fontWeight={fontWeight}
        size={size}
        color={textColor}
        as={textTag}
        lineHeight={lineHeight}
        className="custom-title-text"
        font={font}
        textAlign={textAlign}
        $StylesObj={StylesObj}
        $extraStyles={extraStyles}
      >
        {children}
      </SCustomTitleText>
    </SCustomTitleContainer>
  );
};
