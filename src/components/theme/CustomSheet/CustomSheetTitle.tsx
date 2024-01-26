import React from 'react';
import { Title, BodyText } from 'components/general/Typography';
import { ICustomSheetTitleProps } from './CustomSheet.types';

export const CustomSheetTitle: React.FC<ICustomSheetTitleProps> = ({ title, subtitle, extra }) => (
  <div className="custom-sheet-title">
    {title && (
      <Title textAlign="start" marginTop={12} marginBottom={10} fontWeight="SB" font="Poppins" size="T">
        {title}
      </Title>
    )}

    {subtitle && (
      <BodyText textType="bodyText" textAlign="start" fontWeight="R" size="N" color="charcoal70" font="DM Sans">
        {subtitle}
      </BodyText>
    )}
    {extra && extra}
  </div>
);
