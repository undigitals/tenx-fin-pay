import { images } from 'assets';
import { BodyText, Title } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';

interface ICarouselItem {
  title: string;
  subtitle: string;
}

export const CarouselItem: React.FC<ICarouselItem> = ({ title, subtitle }) => (
  <CustomCard>
    <CustomRow marginBottom={28} justifyContent="center">
      <img src={images.pennyJarMainLogo} alt="pennyJarMain" />
    </CustomRow>

    <Title fontWeight="M" size="M" marginBottom={16} textAlign="center" justifyContent="center">
      {title}
    </Title>

    <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal60" textAlign="center">
      {subtitle}
    </BodyText>
  </CustomCard>
);
