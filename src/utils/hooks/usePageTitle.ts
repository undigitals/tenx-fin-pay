import { useLocation } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { useMemo } from 'react';

export const usePageTitle = (): string => {
  const { pathname } = useLocation();

  return useMemo(() => {
    const route = Object.values(ROUTES).find((r) => r.path === pathname);
    return route?.title || '';
  }, [pathname]);
};
