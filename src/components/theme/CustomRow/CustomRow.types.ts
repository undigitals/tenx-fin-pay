import React from 'react';

export interface ICustomRowProps {
  alignItems?: 'center' | 'start' | 'flex-start' | 'flex-end' | 'stretch' | 'inherit';
  justifyContent?: 'space-between' | 'flex-start' | 'flex-end' | 'center' | 'space-evenly' | 'space-around';
  flexDirection?: 'row' | 'column';
  marginBottom?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  gap?: number | string;
  children?: React.ReactNode;
  width?: string;
  onClick?: () => void;
  cursorPointer?: boolean;
  minHeight?: string;
  height?: string;
  horizontalScroll?: boolean;
  className?: string;
  overflowY?: string;
  flex?: number | string;
  flexWrap?: string;
  extraStyles?: { [key: string]: string | number | undefined };
}
