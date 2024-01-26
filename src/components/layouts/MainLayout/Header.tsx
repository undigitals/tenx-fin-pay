import React, { useEffect } from 'react';
import { ROUTES } from 'vars/const/ROUTES';
import { useLanguage } from 'utils/hooks/useLanguage';
import { BodyText } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { useRouteConfig } from 'utils/hooks/useRouteConfig';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Link, useNavigate } from 'react-router-dom';
import { useChat } from 'utils/hooks/useChat';
import { NeedSupportModal } from 'components/general/Modals/NeedSupportModal/NeedSupportModal';
import { useSelector } from 'react-redux';
import { USER_PROFILE_IDS, areEqualUsers } from 'vars/const/USER_PROFILE_IDS';
import { selectCurrentAuthState, selectPolicies } from 'store/user/authentication.slice';
import { startChat } from 'views/Chat/zenDeskChat';
import { useToggle } from 'utils/hooks/useToggle';
import { useGetZendeskTokenMutation } from 'store/user/authentication.api';
import { SHeader, SCircle } from './Header.styles';

export const Header = () => {
  const { language, changeLanguage } = useLanguage();
  const { open } = useChat();
  const { isLangSwitcherVisible, isRoundedDesktopHeader } = useRouteConfig();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const needSupportModal = useToggle(false);
  const currentUser = useSelector(selectCurrentAuthState);
  const policies = useSelector(selectPolicies);
  const isClient = areEqualUsers(currentUser?.user?.systemProfileId ?? '', USER_PROFILE_IDS.CLIENT_ccc);
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

  useEffect(() => {
    console.log('*-- We enter start chat useEffect --*');
    if (getZendeskTokenResult.isSuccess) {
      console.log('*-- StartChat function called from useEffect, after token result --*');
      startChat(getZendeskTokenResult.data, language);
    }
  }, [getZendeskTokenResult.isSuccess]);

  const handleZendeskChatIconClick = () => {
    if (document.getElementById('ze-snippet')) {
      console.log('* -- Zendesk script is already in the document -- *');
      getZendeskToken();
    } else {
      addZendeskScript();
    }
  };

  const handleNotificationsClick = () => {
    navigate(ROUTES.notificationsCenter.path);
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

  const buttonChat = (
    <button className="chat" type="button" onClick={handleChatIconClick}>
      {t('main.chat')}
    </button>
  );

  const buttonNotifications = (
    <button className="notifications" type="button" onClick={handleNotificationsClick}>
      {t('main.showNotifications')}
    </button>
  );

  return (
    <>
      <SHeader isRounded={isRoundedDesktopHeader}>
        <h1>
          <Link to={ROUTES.home.path}>Tenx</Link>
        </h1>
        <CustomRow>
          {!isRoundedDesktopHeader && isLangSwitcherVisible && (
            <button className="language" type="button" onClick={() => changeLanguage(language === 'en' ? 'es' : 'en')}>
              <span>{t('main.language.change')}</span>
              <span aria-label={language === 'en' ? t('main.language.English') : t('main.language.Spanish')}>{language === 'en' ? 'eng.' : 'esp.'}</span>
            </button>
          )}
          {isRoundedDesktopHeader && (
            <SCircle marginRight={20} backgroundColor="blue10">
              <BodyText color="blue" fontWeight="B" size="T" textType="bodyText">
                BDK
              </BodyText>
            </SCircle>
          )}
          {isRoundedDesktopHeader ? <SCircle marginRight={20}>{buttonChat}</SCircle> : buttonChat}
          {isRoundedDesktopHeader ? <SCircle>{buttonNotifications}</SCircle> : buttonNotifications}
        </CustomRow>
      </SHeader>

      <NeedSupportModal open={needSupportModal.isActive} onClose={needSupportModal.hide} />
    </>
  );
};
