import React from 'react';
import { useAppDispatch } from 'utils/hooks/store';
import { setShowCashOpeningExitModal } from 'store/ui.slice';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';

export const ExitIcon: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleExit = () => {
    dispatch(setShowCashOpeningExitModal(true));
  };

  return (
    <CustomRow onClick={handleExit}>
      <Icon name="exitFlow" marginRight={4} cursorPointer />
    </CustomRow>
  );
};
