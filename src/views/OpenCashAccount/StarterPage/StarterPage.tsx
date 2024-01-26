import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { useToggle } from 'utils/hooks/useToggle';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { CashAccountOpeningPage } from './CashAccountOpeningPage';
import { CashAccOpeningDesktopPage } from './CashAccOpeningDesktopPage/CashAccOpeningDesktopPage';

interface IStarterPageProps {
  ignoreDimension?: boolean;
}

export const StarterPage: React.FC<IStarterPageProps> = ({ ignoreDimension = false }) => {
  const navigate = useNavigate();
  const { isDesktopSize } = useDeviceDimension();
  const { isActive, show, hide } = useToggle(false);

  const handleContinueClick = () => navigate(ROUTES.prep.path);

  return isDesktopSize && !ignoreDimension ? (
    <CashAccOpeningDesktopPage onContinueClick={handleContinueClick} onFeeScheduleClick={show} isActive={isActive} hide={hide} />
  ) : (
    <CashAccountOpeningPage handleContinueClick={handleContinueClick} handleFeeScheduleClick={show} isActive={isActive} hide={hide} isStarterPage />
  );
};
