import React from 'react';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { STick } from 'views/TenxPay/Enroll/EnrollPage.styles';
import { BodyText } from 'components/general/Typography';
import { ICON_SIZE_MAP } from 'components/general/Icon/Icon.constants';
import { TThemeColor } from 'styles/theme';

interface IListItem {
  children?: string | React.ReactNode;
  icon?: string;
  size?: keyof typeof ICON_SIZE_MAP;
  color?: TThemeColor;
}

export const ListItem: React.FC<IListItem> = ({ children, icon = 'circleTick', size = 'small', color = 'charcoal' }) => (
  <CustomRow justifyContent="flex-start" alignItems="center" marginBottom={8}>
    <STick name={icon} size={size} />
    <BodyText marginLeft={16} lineHeight={1.6} size="N" fontWeight="R" textType="bodyText" color={color}>
      {children}
    </BodyText>
  </CustomRow>
);
