import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Returns the top-level parent in the current location URL path.
 * E.g., if the current URL is https://www.example.com:8080/a/b/c, the top-level parent is 'a'.
 */
export const useLocationTopLevelParent = () => {
  const location = useLocation();

  return useMemo(() => {
    const startSeparatorIdx = location.pathname.indexOf('/');
    if (startSeparatorIdx < 0) {
      return '';
    }
    const endSeparatorIdx = location.pathname.indexOf('/', startSeparatorIdx + 1);
    return location.pathname.substring(startSeparatorIdx + 1, endSeparatorIdx < 0 ? undefined : endSeparatorIdx);
  }, [location]);
};
