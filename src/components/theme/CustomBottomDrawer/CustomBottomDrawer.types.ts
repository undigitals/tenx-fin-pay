import { DrawerProps } from 'antd';
import { ReactNode } from 'react';

export interface ICustomBottomDrawer extends DrawerProps {
  children?: ReactNode;
}
