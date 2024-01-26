import React from 'react';
import { SDrawer, SMaskStyle } from './CustomBottomDrawer.styles';
import { ICustomBottomDrawer } from './CustomBottomDrawer.types';

export const CustomBottomDrawer: React.FC<ICustomBottomDrawer> = ({ children, ...props }) => (
  <SDrawer placement="bottom" getContainer={false} width={500} maskStyle={SMaskStyle} destroyOnClose {...props}>
    {children}
  </SDrawer>
);
