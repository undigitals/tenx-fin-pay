import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText } from 'components/general/Typography';
import { TSizeProp } from 'components/general/Typography/Typography.types';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface IListItem {
  text: string;
  IconName: string;
  size: TSizeProp;
  marginTop?: number;
}

export const ListItem: React.FC<IListItem> = ({ text, IconName, size = 'S', marginTop }) => {
  const { t } = useTranslation();

  return (
    <CustomRow justifyContent="flex-start" marginBottom={9} marginTop={marginTop}>
      <BodyText textType="bodyText" size={size} icon={<Icon name={IconName} color="blue" />} fontWeight="R" font="DM Sans" lineHeight={1.3} color="charcoal70" paddingRight={30}>
        {t(text)}
      </BodyText>
    </CustomRow>
  );
};
