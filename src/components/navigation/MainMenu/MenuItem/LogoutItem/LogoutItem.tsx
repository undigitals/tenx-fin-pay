import React from 'react';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { Icon } from 'components/general/Icon/Icon';
import { useTranslation } from 'react-i18next';
import { LogoutModal } from 'components/general/Modals/LogoutModal/LogoutModal';
import { useToggle } from 'utils/hooks/useToggle';

interface ILogoutItemProps {
  isVertical?: boolean;
}

export const LogoutItem: React.FC<ILogoutItemProps> = ({ isVertical = false }) => {
  const { t } = useTranslation();
  const logoutModal = useToggle(false);

  const handleOnClick = () => {
    logoutModal.show();
  };

  return (
    <>
      <CustomRow onClick={handleOnClick} justifyContent="flex-start" flexDirection={isVertical ? 'column' : 'row'} gap={isVertical ? 6 : 0} marginBottom={isVertical ? 0 : 25}>
        <Icon name="logout" color="red" cursorPointer />
        <CustomText textColor="red" size={isVertical ? 'smaller' : 'big'} cursorPointer marginLeft={isVertical ? 0 : 12} fontWeight="strong">
          {t('menu.Log Out')}
        </CustomText>
      </CustomRow>

      <LogoutModal open={logoutModal.isActive} onClose={logoutModal.hide} />
    </>
  );
};
