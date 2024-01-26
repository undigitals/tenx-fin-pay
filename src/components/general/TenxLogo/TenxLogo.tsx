import React from 'react';
import { TenxLong, TenxLongWhite } from 'assets/logos';
import { ILogoProps } from './TenxLogo.types';

export const TenxLogo: React.FC<ILogoProps> = ({ isWhite, height = 'auto', width = 266, className }) => {
  const LogoSvgComponent = isWhite ? TenxLongWhite : TenxLong;

  return <LogoSvgComponent height={height} width={width} className={className} />;
};
