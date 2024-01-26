import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setDisplayPercPlaysInfoModal } from 'store/ui.slice';
import { useAnalytics } from 'utils/hooks/useAnalytics';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { useAppDispatch } from 'utils/hooks/store';
import { TPreset } from 'components/theme/CustomButton/CustomButton.types';
import { Loader } from 'components/general/Loader/Loader';
import { BodyText } from 'components/general/Typography';
import { TenxPlayWarningModal } from 'components/general/Modals/TenxPlayWarningModal/TenxPlayWarningModal';
import { useTenxPlayWarning } from 'utils/hooks/useTenxPlayWarning';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { SIconTooltip, SButton } from './ToolCard.styles';

interface IToolCard {
  imgSrc: string;
  buttonPreset?: TPreset;
  buttonText: string;
  tooltip?: boolean;
  description: string | React.ReactNode;
  to?: string;
  isTenxPlay?: boolean;
}

export const ToolCard: React.FC<IToolCard> = ({ imgSrc, buttonPreset = '', buttonText, tooltip = false, description, to = '', isTenxPlay = false }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { track } = useAnalytics();
  const { pathname } = useLocation();
  const { isDesktopSize } = useDeviceDimension();
  const { handleGoToPlay, handleCloseWarning, isWarningActive, isStatusLoading, handleContinue, isAcceptPending } = useTenxPlayWarning();

  const handleButtonClick = () => {
    if (isTenxPlay) {
      handleGoToPlay();
      return;
    }
    navigate(to, { state: { fromPage: pathname } });
  };

  const handleTooltipClick = () => {
    dispatch(setDisplayPercPlaysInfoModal(true));
    track('navigate', '/wellness/goals-and-tools/playpercup/tenx-plays-info');
  };

  return (
    <>
      <CustomCard marginTop={0} marginBottom={30} width={isDesktopSize ? '50%' : 'auto'}>
        {isStatusLoading && isTenxPlay && <Loader />}
        <CustomRow justifyContent="flex-start" overflowY="hidden">
          <img src={imgSrc} alt={imgSrc} />
          <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginLeft={30} marginTop={tooltip ? 10 : 0} justifyContent="start">
            {description}
          </BodyText>
          {isTenxPlay && <SIconTooltip cursorPointer onClick={handleTooltipClick} />}
        </CustomRow>
        <CustomRow justifyContent={isDesktopSize ? 'flex-start' : 'flex-end'} marginLeft={isDesktopSize ? 78 : 0}>
          <SButton preset={buttonPreset} onClick={handleButtonClick} size="small">
            {buttonText}
          </SButton>
        </CustomRow>
      </CustomCard>

      {isTenxPlay && <TenxPlayWarningModal open={isWarningActive} onClose={handleCloseWarning} onContinue={handleContinue} isLoading={isAcceptPending} />}
    </>
  );
};
