import { useDispatch } from 'react-redux';
import { authenticationApi, useLogoutMutation } from 'store/user/authentication.api';
import { cleanUserData } from 'store/user/authentication.slice';
import { persistor } from 'store/store';
import { lsGetItem, lsRemoveItem, lsSetItem } from 'utils/helpers/storage';
import { mobileApiCall } from 'services/mobileService';
import { useEffect } from 'react';

export const useLogout = () => {
  const [logoutRequest, { isSuccess, isLoading }] = useLogoutMutation();
  const isMobileApp = lsGetItem('isMobileApp');
  const dispatch = useDispatch();

  const cleanPersisted = () => {
    authenticationApi.util.resetApiState();
    persistor.purge();
    sessionStorage.removeItem('persist:root');
    persistor.pause();
    lsRemoveItem('isLoggedIn');
    lsSetItem('wasLoggedOut', true);
  };

  const logout = () => {
    // window.location.reload();
    if (isMobileApp) {
      dispatch(cleanUserData());
      cleanPersisted();
      mobileApiCall('logout');
    } else logoutRequest();
  };

  useEffect(() => {
    if (isSuccess) {
      cleanPersisted();
      window.location.replace('/login');
    }
  }, [isSuccess]);

  return {
    logout,
    isLogoutSuccess: isSuccess,
    isLogoutLoading: isLoading,
  };
};
