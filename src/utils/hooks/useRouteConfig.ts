import { matchPath, useLocation } from 'react-router-dom';
import { ROUTES, IRouteConfig } from 'vars/const/ROUTES';

const DEFAULT_ROUTE_CONFIG: IRouteConfig = {
  path: '',
  title: '',
  isProfileButtonVisible: false,
  isBackButtonVisible: true,
  isTitleVisible: true,
  isLangSwitcherVisible: true,
  noLeftNav: false,
  isRoundedDesktopHeader: false,
  isRoundedDesktopLeftNav: false,
};

export const useRouteConfig = (): IRouteConfig => {
  const location = useLocation();
  const routeConfig = Object.values(ROUTES).find((routeItem) => matchPath(String(location.pathname), String(routeItem.path))) || ({} as IRouteConfig);

  return { ...DEFAULT_ROUTE_CONFIG, ...routeConfig };
};
