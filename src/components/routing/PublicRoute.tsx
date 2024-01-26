import React from 'react';
import { Outlet } from 'react-router-dom';

import { useLanguage } from 'utils/hooks/useLanguage';

export const PublicRoute = () => {
  useLanguage(true);

  return <Outlet />;
};
