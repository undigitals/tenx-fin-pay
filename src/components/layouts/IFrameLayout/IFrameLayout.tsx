import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageHeader } from 'components/navigation/PageHeader/PageHeader';
import { SLayout, SLayoutContent, SLayoutWrapper } from './IFrameLayout.styles';

export const IFrameLayout: React.FC = () => (
  <SLayout>
    <SLayoutContent>
      <PageHeader isIframePage />
      <SLayoutWrapper>
        <Outlet />
      </SLayoutWrapper>
    </SLayoutContent>
  </SLayout>
);
