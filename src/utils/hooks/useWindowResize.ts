import { useEffect, useState } from 'react';

export const useWindowResize = () => {
  const [isResizing, setIsResizing] = useState<boolean | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);

      setIsResizing(true);

      timeout = setTimeout(() => {
        setIsResizing(false);
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isResizing, wasResized: isResizing === false };
};
