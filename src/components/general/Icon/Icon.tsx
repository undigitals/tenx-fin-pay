import React from 'react';
import { SVG_ICONS } from 'assets/iconsList';
import { ICON_SIZE_MAP, INITIAL_SIZE_MAP, CLEAR_ICONS } from './Icon.constants';
import { IIconProps, TIconName } from './Icon.types';
import { SIconContainer } from './Icon.styles';

export const Icon: React.FC<IIconProps> = ({
  className,
  name,
  size = 'normal',
  color = 'charcoal',
  pictBgColor = 'transparent',
  type = 'icon',
  cursorPointer = false,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  marginBottom = 0,
  onClick = () => {},
}) => {
  const sizeVal = ICON_SIZE_MAP[size];
  const initialWidth = INITIAL_SIZE_MAP[name]?.width ?? sizeVal;
  const initialHeight = INITIAL_SIZE_MAP[name]?.height ?? sizeVal;
  const widthRatio = sizeVal / initialWidth;
  const heightRatio = sizeVal / initialHeight;
  const classNameStr = `icon svg-icon svg-${type} icon-${name} ${className || ''}`;
  const iconName = SVG_ICONS.includes(name as TIconName) ? name : 'placeholder';
  const isClear = CLEAR_ICONS.includes(name);

  return (
    <SIconContainer
      name={iconName}
      color={color}
      pictBgColor={pictBgColor}
      className={classNameStr}
      data-testid={`icon-${name}`}
      width={initialWidth * widthRatio}
      height={initialHeight * heightRatio}
      onClick={onClick}
      cursorPointer={cursorPointer}
      marginRight={marginRight}
      marginLeft={marginLeft}
      marginTop={marginTop}
      marginBottom={marginBottom}
      clear={isClear}
    />
  );
};
