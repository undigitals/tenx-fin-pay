import React from 'react';
import { Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { ListItem } from 'views/TenxPay/Enroll/ListItem/ListItem';
import { SContainer, SWrapper } from './Card.styles';

type TCardProp = {
  title: string;
  list: React.ReactNode[];
  handleEnrollClick: () => Promise<void>;
};

export const Card: React.FC<TCardProp> = ({ title, list, handleEnrollClick }) => {
  const { t } = useTranslation();

  return (
    <SContainer>
      <CustomRow alignItems="flex-end">
        <SWrapper>
          <div className="title-container">
            <Title fontWeight="SB" size="sM">
              {title}
            </Title>
          </div>

          {list.map((cardData: React.ReactNode) => (
            <ListItem icon="checked" size="smallest" color="charcoal70">
              {cardData}
            </ListItem>
          ))}
        </SWrapper>
        <CustomRow>
          <CustomButton preset="primary" onClick={handleEnrollClick}>
            {t(`tenxPayEnroll.Start Enrollment`)}
          </CustomButton>
        </CustomRow>
      </CustomRow>
    </SContainer>
  );
};
