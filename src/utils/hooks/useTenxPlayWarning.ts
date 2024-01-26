import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { useSelector } from 'react-redux';
import { useAcceptConsentMutation, useGetPeracpitaPlayConsentStatusQuery } from 'store/user/consents/consents.api';
import { selectIsTenxPayConsentAccepted } from 'store/user/consents/consents.slice';
import { PERCAPITA_PLAY_CONSENT_ID } from 'vars/const/consents';
import { useToggle } from './useToggle';

export const useTenxPlayWarning = () => {
  const getPeracpitaPlayConsentStatusQuery = useGetPeracpitaPlayConsentStatusQuery();
  const [acceptConsent, acceptConsentResult] = useAcceptConsentMutation();
  const isTenxPayConsentAccepted = useSelector(selectIsTenxPayConsentAccepted);
  const warningModal = useToggle(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleGoToPlay = () => {
    if (isTenxPayConsentAccepted) {
      navigate(ROUTES.playPercUp.path, { state: { fromPage: pathname } });
    } else {
      warningModal.show();
    }
  };

  const handleContinue = () => {
    acceptConsent(PERCAPITA_PLAY_CONSENT_ID)
      .unwrap()
      .then(() => {
        warningModal.hide();
        navigate(ROUTES.playPercUp.path, { state: { fromPage: pathname } });
      });
  };

  return {
    handleGoToPlay,
    handleContinue,
    isStatusLoading: getPeracpitaPlayConsentStatusQuery.isLoading,
    isAcceptPending: acceptConsentResult.isLoading,
    isWarningActive: warningModal.isActive && !isTenxPayConsentAccepted,
    handleCloseWarning: warningModal.hide,
  };
};
