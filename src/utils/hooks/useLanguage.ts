import { i18n } from 'i18n/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, selectUserLanguage, setUserLanguage } from 'store/user/authentication.slice';
import { useEffect } from 'react';
import { useLazyGetUserLanguageQuery } from 'store/user/properties/userProperties.api';
import { lsGetItem, lsSetItem } from 'utils/helpers/storage';
import { resetFAQ } from 'store/user/help.slice';
import { useProperties } from './useProperties';

export const useLanguage = (isInitial = false) => {
  const { setProperty } = useProperties();
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const userLanguage = useSelector(selectUserLanguage);
  const savedLanguage = lsGetItem('lastLanguage');
  const [getUserLanguage] = useLazyGetUserLanguageQuery();

  const changeLanguage = (lang: string) =>
    i18n.changeLanguage(lang).then(() => {
      if (userId) {
        const data = {
          propertyName: 'language',
          value: lang,
        };
        setProperty(data);
        dispatch(setUserLanguage(lang));
      }

      dispatch(resetFAQ());
      lsSetItem('lastLanguage', lang);
    });

  // Set language from user properties
  useEffect(() => {
    if (isInitial && userLanguage !== i18n.language) {
      i18n.changeLanguage(userLanguage);
    }
  }, [userLanguage, isInitial]);

  // Set language from last saved language
  useEffect(() => {
    if (isInitial && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [savedLanguage, isInitial]);

  useEffect(() => {
    if (isInitial && userId && !userLanguage) {
      getUserLanguage();
    }
  }, [userId, isInitial, userLanguage]);

  return {
    changeLanguage,
    userLanguage,
    language: i18n.language,
    locale: `${i18n.language}-US`,
  };
};
