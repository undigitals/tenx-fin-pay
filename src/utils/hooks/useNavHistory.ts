import { useEffect } from 'react';
import { useAnalytics } from 'utils/hooks/useAnalytics';

export const useNavHistory = (path: string) => {
  const { track } = useAnalytics();
  useEffect(() => {
    track('navigate', path);
  }, [path]);
};
