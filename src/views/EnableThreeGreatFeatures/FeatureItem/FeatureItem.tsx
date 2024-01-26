import React from 'react';
import { BodyText, Title } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { IFeatureItemProps } from 'views/EnableThreeGreatFeatures/EnableThreeGreatFeaturesPage.types';
import { SHeaderLayout, SIconLayout, SItemButton, SLayout } from './FeatureItem.styles';

export const FeatureItem: React.FC<IFeatureItemProps> = ({ index, title, subTitle, description, image, button }) => (
  <SLayout>
    <SHeaderLayout>
      <SIconLayout>
        <BodyText textType="bodyText" fontWeight="B" size="N" color="charcoal">
          {index}
        </BodyText>
      </SIconLayout>

      <img src={image} width={162} alt="Great Features" />
    </SHeaderLayout>
    <Title font="DM Sans" size="sM" fontWeight="B" marginBottom={2}>
      {title}
    </Title>

    <BodyText textType="bodyText" fontWeight="R" size="T" color="charcoal60" marginBottom={26}>
      {subTitle}
    </BodyText>

    <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.4} marginBottom={16}>
      {description}
    </BodyText>

    <CustomRow justifyContent="flex-end">
      <SItemButton preset="secondary" size="middle" onClick={button?.onClick}>
        <BodyText color="charcoal" fontWeight="B" size="N" textType="bodyText" marginRight={16} cursorPointer>
          {button?.text}
        </BodyText>

        <Icon name="arrowRight" size="xs" color="blue" />
      </SItemButton>
    </CustomRow>
  </SLayout>
);
