import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRouteConfig } from 'utils/hooks/useRouteConfig';
import { SContainer, SContent } from './GridDesignLayout.styles';

interface IGridDesignLayout {
  noContentPadding?: boolean;
}

export const GridDesignLayout: React.FC<IGridDesignLayout> = ({ noContentPadding = false }) => {
  const { isRoundedDesktopLeftNav } = useRouteConfig();
  return (
    <SContainer noContentPadding={noContentPadding || isRoundedDesktopLeftNav}>
      <SContent>
        <Outlet />
      </SContent>
    </SContainer>
  );
};
