import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'utils/hooks/store';
import { setIsDesktopSize, selectIsDesktopSize } from 'store/ui.slice';
import { MEDIA_SIZE } from 'utils/helpers/styleHelpers';

export const useDeviceDimension = () => {
  const dispatch = useAppDispatch();
  const isDesktopSize = useSelector(selectIsDesktopSize);

  const handleWindowResize = () => {
    const windowWidth = window.innerWidth;
    dispatch(setIsDesktopSize(windowWidth >= MEDIA_SIZE.tablet));
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return {
    isDesktopSize,
  };
};
