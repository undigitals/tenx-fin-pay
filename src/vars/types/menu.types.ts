import { ReactElement } from 'react';

export type DrawerMenuItemOnClickSpecial = 'logout';
export type DrawerMenuItemOnClick = DrawerMenuItemOnClickSpecial | (() => void);

export interface DrawerMenuItem {
  name: string;
  path: string;
  icon: ReactElement;
  isLogout?: boolean;
  onClick?: DrawerMenuItemOnClick;
  children?: DrawerMenuItem[];
}

export interface IMenuItemData {
  index: number;
  text: string;
  description: string;
  icon: string;
  path: string;
  element?: string;
  action?: string;
  children?: any[];
}

export interface IMenuItemDataWithChildren extends IMenuItemData {
  children: IMenuItemData[];
}

export interface IMenuData {
  horizontal: IMenuItemDataWithChildren[];
  popup: IMenuItemDataWithChildren[];
  vertical: IMenuItemDataWithChildren[];
}

export type TBreadcrumbsPath = {
  id: number;
  name: string;
  path?: string;
};
