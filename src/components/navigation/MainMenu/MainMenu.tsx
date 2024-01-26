import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetMenuDataQuery } from 'store/api';
import { selectMainMenuData } from 'store/ui.slice';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { IMenuItemData } from 'vars/types/menu.types';
import { useSelector } from 'react-redux';
import { ChipLanguageSwitcher } from 'components/general/ChipLanguageSwitcher/ChipLanguageSwitcher';
import { BodyText } from 'components/general/Typography';
import { SLangSwitcherWrapper } from 'components/general/ChipLanguageSwitcher/ChipLanguageSwitcher.styles';
import { Loader } from 'components/general/Loader/Loader';
import { selectPolicies } from 'store/user/authentication.slice';
import { SMenuContainer } from './DrawerMenu.styles';
import { MenuItem } from './MenuItem/MenuItem';
import { LogoutItem } from './MenuItem/LogoutItem/LogoutItem';
import { MenuGroup } from './MenuItem/MenuGroup';

export const MainMenu: React.FC = () => {
  const { t } = useTranslation();
  const getMenuDataQuery = useGetMenuDataQuery();
  const menuData = useSelector(selectMainMenuData);
  const policies = useSelector(selectPolicies);
  const isLoading = getMenuDataQuery.isLoading || getMenuDataQuery.isFetching;

  return (
    <CustomCard padding="0 0 25px 0" background="transparent" marginTop={0}>
      {isLoading && <Loader />}
      <SMenuContainer>
        {menuData.map((menuItem: IMenuItemData) =>
          menuItem.children && menuItem.children.length ? (
            <MenuGroup title={menuItem.text} items={menuItem.children} icon={menuItem.icon} key={menuItem.index} />
          ) : (
            <MenuItem title={menuItem.text} icon={menuItem.icon} path={menuItem.path} key={menuItem.index} />
          )
        )}
      </SMenuContainer>

      <SLangSwitcherWrapper>
        <BodyText textType="bodyText" marginBottom={20} size="M" color="charcoal" fontWeight="R">
          {t('preRegOnboarding.Language Preference')}
        </BodyText>
        <ChipLanguageSwitcher defaultValue="en" preset="primary" isDisabled={!policies?.SpanishEnabled} />
      </SLangSwitcherWrapper>

      <LogoutItem />

      <SuttonDisclaimerNote />
    </CustomCard>
  );
};
