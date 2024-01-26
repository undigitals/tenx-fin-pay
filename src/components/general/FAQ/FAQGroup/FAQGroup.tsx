import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'components/general/Icon/Icon';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { IconSign } from 'components/general/Icon/IconSign';
import { BodyText } from 'components/general/Typography';

interface IFAQGroup {
  title: string;
  id: string;
  intentsCount: number;
  onClick: (id: string) => void;
}

export const FAQGroup: React.FC<IFAQGroup> = ({ title, id, intentsCount, onClick }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    onClick(id);
  };

  return (
    <CustomCard marginBottom={20} onClick={handleClick} cursorPointer>
      <CustomRow justifyContent="space-between" cursorPointer>
        <CustomRow>
          <IconSign iconName="questionAndInfo" bgColor="blue5" iconColor="blue" />
          <CustomRow flexDirection="column" alignItems="flex-start" marginLeft={16} cursorPointer>
            <BodyText textType="bodyText" size="M" fontWeight="B" cursorPointer color="charcoal">
              {title}
            </BodyText>
            <BodyText textType="bodyText" color="charcoal70" cursorPointer size="T" fontWeight="R">
              {`${intentsCount} ${t('helpSupport.questions answered')}`}
            </BodyText>
          </CustomRow>
        </CustomRow>
        <Icon color="blue" size="smaller" name="chevronRight" cursorPointer />
      </CustomRow>
    </CustomCard>
  );
};
