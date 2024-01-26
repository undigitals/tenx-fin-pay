import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, matchRoutes, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { selectHelpData } from 'store/user/help.slice';
import { ROUTES } from 'vars/const/ROUTES';
import { areEqualUsers, USER_PROFILE_IDS } from 'vars/const/USER_PROFILE_IDS';
import { selectHeaderTitle } from 'store/ui.slice';
import { Icon } from 'components/general/Icon/Icon';
import { useRouteConfig } from 'utils/hooks/useRouteConfig';
import { BodyText } from 'components/general/Typography';
import { triggerEvent } from 'utils/helpers/events';
import { selectCurrentAuthState, selectIsEmailVerifiedOrAbsent, selectPolicies } from 'store/user/authentication.slice';
import { useTranslation } from 'react-i18next';
import { useChat } from 'utils/hooks/useChat';
import { NeedSupportModal } from 'components/general/Modals/NeedSupportModal/NeedSupportModal';
import { useToggle } from 'utils/hooks/useToggle';
import { selectUserNotifications } from 'store/user/notificationsCenter/notificationsCenter.slice';
import { startChat } from 'views/Chat/zenDeskChat';
import { useGetZendeskTokenMutation } from 'store/user/authentication.api';
import { useLanguage } from 'utils/hooks/useLanguage';
import { SHeaderBar, SHeaderLeftBtn, SHeaderRightBtn, SLeftBtnContainer, SRightButtons } from './PageHeader.styles';
import { PageHeaderProps, IPageState } from './PageHeader.types';

const BACK_NAVIGATABLE_ROUTES = [
  ROUTES.profile,
  ROUTES.enroll,
  ROUTES.termsAndConditions,
  ROUTES.emailVerification,
  ROUTES.verificationCode,
  ROUTES.tenxPayBalance,
  ROUTES.accountApproved,
  ROUTES.myInfoName,
  ROUTES.myInfoAge,
  ROUTES.myInfoHomeAddress,
  ROUTES.myInfoEConsent,
  ROUTES.myInfoTaxId,
  ROUTES.myInfoEmailUsername,
  ROUTES.balancesTransactions,
  ROUTES.myInfoVerifySms,
  ROUTES.myInfoSummary,
  ROUTES.tenxPayHistory,
  ROUTES.internalTransfer,
  ROUTES.openAccountMain,
  ROUTES.successfulAccountOpen,
  ROUTES.directDeposit,
  ROUTES.startDeposit,
  ROUTES.addNeedsGoalsAccount,
  ROUTES.successAddNeedsGoalsAccount,
  ROUTES.accountInformation,
  ROUTES.selectedAccountInformation,
  ROUTES.helpAndSupport,
  ROUTES.subscriptions,
  ROUTES.starter,
  ROUTES.notificationSettings,
  ROUTES.pennyJar,
  ROUTES.pennyJarSetup,
  ROUTES.pennyJarActivate,
  ROUTES.depositOnboard,
  ROUTES.setUpDeposit,
  ROUTES.attune,
  ROUTES.notificationsCenterItem,
  ROUTES.addFunds,
  ROUTES.sendFunds,
];

export const PageHeader: React.FC<PageHeaderProps> = ({ isIframePage = false, learnAbout = false, noActions = false, headerTitle = '' }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { open } = useChat();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { previousTab } = useSelector(selectHelpData);
  const { defaultBackTo, noRightButtons, title: routeTitle, isProfileButtonVisible, isTitleVisible } = useRouteConfig();
  const storedHeaderTitle = useSelector(selectHeaderTitle);
  const { fromPage, isFAQFromHomePage, isFromMenu, backPage, editingModeHeaderTitle } = (location?.state as IPageState) || '';
  const isUserEmailVerified = useSelector(selectIsEmailVerifiedOrAbsent);
  const currentUser = useSelector(selectCurrentAuthState);
  const { userNotifications } = useSelector(selectUserNotifications);

  // Checking if page was opened from direct link
  const canGoBack = location.key !== 'default';
  const shouldShowLeftBar = !noActions && !learnAbout;
  const isOpenAccountMainPage = matchPath(ROUTES.openAccountMain.path, location.pathname);
  const shouldShowRightButtons = !isIframePage && !noActions && !noRightButtons;
  const hasCloseBtn = learnAbout;
  const isSelectedAccountInformation = useMatch(ROUTES.selectedAccountInformation.path);
  const isSelectedInfoSummary = useMatch(ROUTES.myInfoSummary.path);
  const isNotificationsCenter = useMatch(ROUTES.notificationsCenter.path);
  const isActivatePennyJar = useMatch(ROUTES.pennyJarActivate.path);
  const isWellnessQuestion = useMatch(ROUTES.wellnessQuestion.path) && previousTab === 'help-and-support';
  const isWellnessQuestionActive = useMatch(ROUTES.wellnessQuestion.path) && previousTab !== 'help-and-support';
  const isWellnessTitleVisible = useMatch('/wellness') || isWellnessQuestion || isWellnessQuestionActive;
  const policies = useSelector(selectPolicies);
  const isClient = areEqualUsers(currentUser?.user?.systemProfileId ?? '', USER_PROFILE_IDS.CLIENT_ccc);
  const isBackNavigatable = defaultBackTo || isWellnessQuestion || matchRoutes(BACK_NAVIGATABLE_ROUTES, location.pathname);
  const needSupportModal = useToggle(false);
  const [getZendeskToken, getZendeskTokenResult] = useGetZendeskTokenMutation();

  const addZendeskScript = () => {
    console.log('*-- Adding zendesk script --*');
    const script = document.createElement('script');
    script.id = 'ze-snippet';
    script.src = 'https://static.zdassets.com/ekr/snippet.js?key=e3e5cbcc-2521-4174-a041-3c55a404776c';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      getZendeskToken();
    };
  };

  const handleZendeskChatIconClick = () => {
    if (document.getElementById('ze-snippet')) {
      console.log('* -- Zendesk script is already in the document -- *');
      getZendeskToken();
    } else {
      addZendeskScript();
    }
  };

  useEffect(() => {
    console.log('*-- We enter start chat useEffect --*');
    if (getZendeskTokenResult.isSuccess) {
      console.log('*-- StartChat function called from useEffect, after token result --*');
      startChat(getZendeskTokenResult.data, language);
    }
  }, [getZendeskTokenResult.isSuccess]);

  const handleBackBtnClick = useCallback(() => {
    triggerEvent('backClick');

    if (isActivatePennyJar) {
      navigate(ROUTES.selectedAccountInformation.path);
      return;
    }

    if (isSelectedAccountInformation) {
      navigate(ROUTES.accountInformation.path, { state: { isByBack: true } });
      return;
    }

    if (isSelectedInfoSummary && isUserEmailVerified) {
      navigate(ROUTES.myInfoAdditionalDetails.path);
      return;
    }

    // if Frequently Asked Question was opened from pop-up home page
    if (isFAQFromHomePage) {
      navigate(ROUTES.home.path);
      return;
    }

    if (backPage) {
      navigate(backPage);
      return;
    }

    if (isIframePage) {
      if (fromPage) {
        navigate(fromPage);
      } else {
        navigate(ROUTES.home.path);
      }
      return;
    }

    if (isOpenAccountMainPage) {
      navigate(ROUTES.prep.path);
      return;
    }

    if (isBackNavigatable && isFromMenu) {
      navigate(-1);
      return;
    }

    if (defaultBackTo) {
      navigate(defaultBackTo);
      return;
    }

    if (isBackNavigatable || canGoBack) {
      navigate(-1);
      console.log('Go back');
      return;
    }

    // Checking if page was opened from direct link
    if (canGoBack) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.home.path);
  }, [location, isIframePage, isBackNavigatable, canGoBack, navigate, dispatch, isSelectedAccountInformation, isActivatePennyJar]);

  const handleCancelButtonClick = () => {
    if (!isFromMenu) {
      navigate(ROUTES.home.path);
    }
  };

  const handleProfileButtonClick = () => {
    navigate(ROUTES.profile.path);
  };

  const handleBellIconClick = () => {
    if (isNotificationsCenter) {
      navigate(-1);
    } else {
      navigate(ROUTES.notificationsCenter.path);
    }
  };

  const handleChatIconClick = () => {
    if (isClient) {
      if (policies?.ChatEnabled) {
        if (policies?.UseZendeskChat) {
          handleZendeskChatIconClick();
        } else {
          open();
        }
      } else {
        needSupportModal.show();
      }
    } else {
      needSupportModal.show();
    }
  };

  return (
    <>
      <SHeaderBar>
        {shouldShowLeftBar && (
          <SLeftBtnContainer isWhiteOutline={isIframePage}>
            {(isBackNavigatable || isIframePage) && (
              <SHeaderLeftBtn onClick={handleBackBtnClick} data-testid="back-btn" style={{ marginLeft: '17px' }}>
                <Icon size="small" name="arrowLeft" color="white" cursorPointer />
              </SHeaderLeftBtn>
            )}
            {isTitleVisible && (
              <BodyText textType="bodyText" marginLeft={isBackNavigatable ? 0 : 14} color="white" size="M" fontWeight="B">
                {editingModeHeaderTitle || storedHeaderTitle || (routeTitle && t(`header.${routeTitle}`)) || headerTitle || (isWellnessTitleVisible && t(`header.${ROUTES.wellness.title}`))}
              </BodyText>
            )}
          </SLeftBtnContainer>
        )}
        {shouldShowRightButtons && (
          <SRightButtons>
            {hasCloseBtn ? (
              <SHeaderRightBtn onClick={handleCancelButtonClick}>
                <Icon name="close" size="smallest" color="white" cursorPointer />
              </SHeaderRightBtn>
            ) : (
              <>
                {isProfileButtonVisible && (
                  <SHeaderRightBtn onClick={handleProfileButtonClick} marginRight={10}>
                    <Icon size="small" name="profile" color="white" cursorPointer />
                  </SHeaderRightBtn>
                )}
                <SHeaderRightBtn onClick={handleChatIconClick}>
                  <Icon size="small" name="chat" color="white" cursorPointer />
                </SHeaderRightBtn>
                {policies?.NotificationsEnabled && (
                  <SHeaderRightBtn onClick={handleBellIconClick} className="notifications" extraStyles={{ marginLeft: '20px' }}>
                    <Icon size="small" name="bell" color="white" cursorPointer />
                    {userNotifications.length > 0 && <span className="notifications">{userNotifications.length}</span>}
                    <span className={isNotificationsCenter ? 'point' : ''} />
                  </SHeaderRightBtn>
                )}
              </>
            )}
          </SRightButtons>
        )}
      </SHeaderBar>

      <NeedSupportModal open={needSupportModal.isActive} onClose={needSupportModal.hide} />
    </>
  );
};
