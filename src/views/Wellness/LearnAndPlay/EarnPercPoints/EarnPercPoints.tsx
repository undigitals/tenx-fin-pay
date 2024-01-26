import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'utils/hooks/store';
import { useTenxPlayWarning } from 'utils/hooks/useTenxPlayWarning';
import { setDisplayPercPlaysInfoModal } from 'store/ui.slice';
import { useLazyGetZogoTokenQuery } from 'store/user/zogo/zogo.api';
import { Loader } from 'components/general/Loader/Loader';
import { useAnalytics } from 'utils/hooks/useAnalytics';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText } from 'components/general/Typography';
import { TenxPlayWarningModal } from 'components/general/Modals/TenxPlayWarningModal/TenxPlayWarningModal';
import { Icon } from 'components/general/Icon/Icon';
import { SCard } from './EarnPercPoints.styles';

export const EarnPercPoints: React.FC = () => {
  const dispatch = useAppDispatch();
  const { track } = useAnalytics();
  const { t } = useTranslation();
  const [getZogoTokenAPI, { isFetching }] = useLazyGetZogoTokenQuery();
  const { handleGoToPlay, handleCloseWarning, isWarningActive, isStatusLoading, handleContinue, isAcceptPending } = useTenxPlayWarning();

  useEffect(() => {
    getZogoTokenAPI();
  }, []);

  const handleInfoClick = () => {
    dispatch(setDisplayPercPlaysInfoModal(true));
    track('navigate', '/wellness/learn-and-play/playpercup/tenx-plays-info');
  };

  if (isStatusLoading || isFetching) return <Loader />;

  return (
    <>
      <SCard>
        <div className="percup-image" />

        <div className="text-button-container">
          <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" marginBottom={20} marginTop={10}>
            {t('learnPlay.PlayTenxPlays')}
          </BodyText>

          <div className="button-container">
            <CustomButton preset="primary" onClick={handleGoToPlay} size="small">
              {t('learnPlay.ReadyToPlay')}
            </CustomButton>
          </div>
        </div>

        <div className="info-container">
          <Icon name="info" color="blue" onClick={handleInfoClick} cursorPointer className="info" size="smaller" />
        </div>
      </SCard>

      <TenxPlayWarningModal open={isWarningActive} onClose={handleCloseWarning} onContinue={handleContinue} isLoading={isAcceptPending} />
    </>
  );
};
