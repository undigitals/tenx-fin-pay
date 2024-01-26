import React from 'react';
import { ROUTES } from 'vars/const/ROUTES';
import { DrawerMenuItem } from 'vars/types/menu.types';
import { Icon } from 'components/general/Icon/Icon';

export const drawerMenuItems: DrawerMenuItem[] = [
  {
    name: 'menu.Subscriptions',
    path: ROUTES.subscriptions.path,
    icon: <Icon name="subscriptions" cursorPointer />,
  },
  {
    name: 'menu.Notification Settings',
    path: ROUTES.notificationSettings.path,
    icon: <Icon name="bell" cursorPointer />,
  },
  {
    name: 'menu.Security',
    path: ROUTES.profileChangePassword.path,
    icon: <Icon name="security" cursorPointer />,
  },
  {
    name: 'menu.Help & Support',
    path: ROUTES.helpAndSupport.path,
    icon: <Icon name="support" cursorPointer />,
  },
  {
    name: 'menu.Terms and Conditions',
    path: ROUTES.termsAndConditions.path,
    icon: <Icon name="terms" cursorPointer />,
  },
];
