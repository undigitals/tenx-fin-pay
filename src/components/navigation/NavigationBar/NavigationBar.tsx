import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMainMenuData, selectNavigationBarData } from 'store/ui.slice';
import { useGetMenuDataQuery } from 'store/api';
import { Loader } from 'components/general/Loader/Loader';
import { useAppDispatch } from 'utils/hooks/store';
import { setPreviousTab } from 'store/user/help.slice';
import clsx from 'clsx';
import { IMenuItemDataWithChildren } from 'vars/types/menu.types';
import { useLocationTopLevelParent } from 'utils/hooks/useLocationTopLevelParent';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { LogoutItem } from 'components/navigation/MainMenu/MenuItem/LogoutItem/LogoutItem';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { SNavigation, SIcon } from './NavigationBar.styles';

export interface INavigationBarProps {
  isShadowVisible: boolean;
}

export const NavigationBar = ({ isShadowVisible }: INavigationBarProps) => {
  const dispatch = useAppDispatch();
  const { isDesktopSize } = useDeviceDimension();
  const locationTopLevelParent = useLocationTopLevelParent();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [isSubmenuActive, setIsSubmenuActive] = useState(false);

  const getMenuDataQuery = useGetMenuDataQuery();
  const navigationBarMenu = useSelector(selectNavigationBarData);
  const mainMenuData = useSelector(selectMainMenuData);
  const isLoading = getMenuDataQuery.isLoading || getMenuDataQuery.isFetching;

  const onLinkClick = (item: IMenuItemDataWithChildren) => {
    setIsSubmenuActive(false);
    if (item.path === 'wellness') {
      dispatch(setPreviousTab('goals-and-tools'));
    }
    if (item.path === 'menu') {
      setIsSubmenuActive(true);
      setDropdownIsOpen(!dropdownIsOpen);
    }
  };

  return (
    <SNavigation className={clsx(isShadowVisible && 'shadow')}>
      {isLoading && <Loader noText noPadding />}
      {navigationBarMenu?.map((item) => (
        <Link
          key={item.text}
          to={item.path === 'menu' && isDesktopSize ? '#' : item.path}
          onClick={() => onLinkClick(item)}
          className={clsx(((locationTopLevelParent === item.path && item.path !== 'menu' && !isSubmenuActive) || (item.path === 'menu' && isSubmenuActive)) && 'active')}
        >
          {/* The decision to receive icon names from a backend API does not really make a lot of sense, so it should */}
          <SIcon
            name={item.icon}
            color={(locationTopLevelParent === item.path && item.path !== 'menu' && !isSubmenuActive) || (item.path === 'menu' && isSubmenuActive) ? 'blue' : 'charcoal70'}
            cursorPointer
          />
          <span>{item.text}</span>
        </Link>
      ))}

      {isDesktopSize && (
        <>
          <div className={`overlay ${!dropdownIsOpen && 'hide'}`} onClick={() => setDropdownIsOpen(false)} />
          <CustomCard className={`menu-popup ${!dropdownIsOpen && 'hide'}`}>
            <ul className="subMenu">
              {mainMenuData.map((subItem) => (
                <li>
                  <Link to={subItem.path} key={subItem.text} className={clsx(locationTopLevelParent === subItem.path && 'active')}>
                    <span>{subItem.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CustomCard>
        </>
      )}

      {isDesktopSize && <LogoutItem />}
    </SNavigation>
  );
};
