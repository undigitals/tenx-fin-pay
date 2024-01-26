import React from 'react';
import { Outlet } from 'react-router-dom';
import { SLayout, SLayoutInner, SLayoutContent } from './TenxLayout.styles';
import { TenxLayoutHeader } from './TenxLayoutHeader/TenxLayoutHeader';

export const TenxLayout = () => (
  <SLayout>
    <TenxLayoutHeader />

    <SLayoutInner>
      <SLayoutContent>
        <Outlet />
      </SLayoutContent>
    </SLayoutInner>
  </SLayout>
);
