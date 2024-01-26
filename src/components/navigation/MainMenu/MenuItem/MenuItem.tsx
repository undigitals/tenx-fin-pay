import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SMenuIcon } from './MenuItem.styles';

export interface IMenuItem {
  title: string;
  icon: string;
  arrowIcon?: string | null;
  path?: string;
}

export const MenuItem: React.FC<IMenuItem> = ({ title, icon, path, arrowIcon = 'chevronRight' }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (path) {
      navigate(`/${path}`, { state: { isFromMenu: true } });
    }
  };

  return (
    <CustomRow onClick={handleOnClick} cursorPointer className="menu-item">
      <CustomRow justifyContent="flex-start">
        <SMenuIcon name={icon} color="charcoal70" cursorPointer />
        <BodyText textType="bodyText" fontWeight="R" size="M" color="charcoal" marginLeft={12} cursorPointer>
          {title}
        </BodyText>
      </CustomRow>
      {arrowIcon && <Icon name={arrowIcon} color="blue" size="smallest" cursorPointer />}
    </CustomRow>
  );
};
