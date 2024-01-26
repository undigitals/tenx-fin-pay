import React from 'react';
import { SImageWrapper, SImage } from './CustomImage.styles';

interface ICustomImageProps {
  img?: string;
  width?: string;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

export const CustomImage: React.FC<ICustomImageProps> = ({ img, position, width }) => (
  <SImageWrapper $position={position} width={width}>
    <SImage src={img} alt={position} />
  </SImageWrapper>
);
