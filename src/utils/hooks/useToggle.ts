import { useCallback, useState } from 'react';

export const useToggle = <T>(initialState = false, initialData?: T) => {
  const [isActive, setIsActive] = useState(initialState);
  const [data, setData] = useState(initialData);

  const handleOpen = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsActive(false);
  }, []);

  const handleToggle = useCallback((flag?: boolean) => {
    setIsActive((prev) => (flag !== undefined ? flag : !prev));
  }, []);

  return {
    isActive,
    data,
    setData,
    show: handleOpen,
    hide: handleClose,
    toggle: handleToggle,
  };
};
