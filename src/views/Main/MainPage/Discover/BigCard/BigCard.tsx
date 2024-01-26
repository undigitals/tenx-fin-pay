import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from 'utils/hooks/useAnalytics';
import { useAppDispatch } from 'utils/hooks/store';
import { selectZogoData } from 'store/user/zogo/zogo.slice';
import { setPreviousTab } from 'store/user/help.slice';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { setShowAdditionalInformationModal, selectAdditionalInformationModalType, setDisplayPercPlaysInfoModal } from 'store/ui.slice';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText } from 'components/general/Typography';
import { useTenxPlayWarning } from 'utils/hooks/useTenxPlayWarning';
import { TenxPlayWarningModal } from 'components/general/Modals/TenxPlayWarningModal/TenxPlayWarningModal';
import { ROUTES } from 'vars/const/ROUTES';
import { Icon } from 'components/general/Icon/Icon';
import { IconSign } from 'components/general/Icon/IconSign';
import { Loader } from 'components/general/Loader/Loader';
import { IBigCard } from './BigCard.types';
import { SContainer } from './BigCard.styles';

export const BigCard: React.FC<IBigCard> = ({
  iconName,
  iconColor = 'charcoal70',
  bgColor,
  title,
  buttonText,
  description,
  boldText = false,
  tooltip = false,
  showPoints = false,
  handlePassedButtonClick,
  to = '',
}) => {
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();
  const dispatch = useAppDispatch();
  const { track } = useAnalytics();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const titleSize = pathname === ROUTES.wellness.path ? 'M' : 'L';
  const informationModalType = useSelector(selectAdditionalInformationModalType);
  const { primaryPoints } = useSelector(selectZogoData);
  const { handleGoToPlay, handleCloseWarning, isWarningActive, isStatusLoading, handleContinue, isAcceptPending } = useTenxPlayWarning();

  const isWellnessDesktop = isDesktopSize && ROUTES.wellness.path.includes(pathname);

  const handleButtonClick = () => {
    if (to === ROUTES.wellness.path) dispatch(setPreviousTab('goals-and-tools'));
    if (to === ROUTES.playPercUp.path) {
      handleGoToPlay();
      return;
    }
    navigate(to, { state: { fromPage: pathname } });
  };

  const handleTooltipClick = () => {
    if (to === ROUTES.playPercUp.path) {
      dispatch(setDisplayPercPlaysInfoModal(true));
      track('navigate', '/home/playpercup/tenx-plays-info');
    } else
      dispatch(
        setShowAdditionalInformationModal({
          displayAdditionalInformationModal: true,
          additionalInformationModalType: informationModalType,
        })
      );
  };

  return (
    <SContainer isWellnessDesktop={isWellnessDesktop}>
      {isStatusLoading && <Loader />}
      <div>
        <div className="header">
          <div className="text-container">
            <div className="title-container">
              <div className="icon-text-container">
                <IconSign bgColor={bgColor} iconName={iconName} iconColor={iconColor} />
                {!isWellnessDesktop && (
                  <BodyText textType="bodyText" fontWeight="SB" color="charcoal" size={titleSize} textAlign="start" marginBottom={20} marginTop={15} marginRight={25}>
                    {t(title)}
                  </BodyText>
                )}
              </div>

              {tooltip && <Icon name="circleInfo" color="blue" size="smaller" onClick={handleTooltipClick} cursorPointer className="icon" />}
            </div>

            <div className="description">
              <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" lineHeight={1.4} paddingRight={10}>
                {description}
              </BodyText>
              {boldText && (
                <BodyText textType="bodyText" size="N" fontWeight="B" color="charcoal" style={{ display: 'inline-block' }}>
                  {boldText}
                </BodyText>
              )}
            </div>
          </div>
        </div>

        {showPoints && (
          <div className="tenx-points">
            <div className="title">{t('learnPlay.Tenx Points')}</div>
            <div className="points">{primaryPoints}</div>
          </div>
        )}
      </div>

      <div className="button-container">
        <CustomButton preset="primary" size="small" onClick={handlePassedButtonClick === undefined ? handleButtonClick : handlePassedButtonClick}>
          {t(buttonText)}
        </CustomButton>
      </div>

      {to === ROUTES.playPercUp.path && <TenxPlayWarningModal open={isWarningActive} onClose={handleCloseWarning} onContinue={handleContinue} isLoading={isAcceptPending} />}
    </SContainer>
  );
};
