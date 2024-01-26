import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SCircle } from './FeatureCard.styles';

interface IFeatureCard {
  index: string;
  img: string;
  title: string;
  description: string;
  to: string;
  buttonTitle: string;
}

export const FeatureCard: React.FC<IFeatureCard> = ({ index, img, title, description, to, buttonTitle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(to);
  };

  return (
    <CustomCard marginBottom={20} borderRadius={20}>
      <CustomRow justifyContent="flex-start">
        <SCircle>{index}</SCircle>
      </CustomRow>
      <CustomRow justifyContent="center" marginBottom={24}>
        <img src={img} alt={title} />
      </CustomRow>

      <CustomRow justifyContent="flex-start" alignItems="flex-start" flexDirection="column" marginBottom={22}>
        <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="L" marginBottom={5}>
          {title}
        </BodyText>
        <BodyText textType="bodyText" color="charcoal60" fontWeight="R" size="T">
          {t('onboardDeposit.RequiredTime')}
        </BodyText>
      </CustomRow>

      <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" justifyContent="start" marginBottom={26}>
        {description}
      </BodyText>

      <CustomRow justifyContent="flex-end">
        <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" marginRight={18} onClick={handleNavigate} cursorPointer>
          {buttonTitle}
        </BodyText>
        <Icon name="chevronRight" color="blue" cursorPointer size="smaller" onClick={handleNavigate} />
      </CustomRow>
    </CustomCard>
  );
};
