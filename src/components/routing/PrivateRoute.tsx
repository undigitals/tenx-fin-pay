import React, { useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from 'vars/const/ROUTES';
import { Loader } from 'components/general/Loader/Loader';
import { useLazyGetCurrentUserQuery } from 'store/user/users.api';
import { lsGetItem } from 'utils/helpers/storage';
import { useChat } from 'utils/hooks/useChat';
import { selectUserId } from 'store/user/authentication.slice';

export const PrivateRoute = () => {
  const location = useLocation();
  const isLoggedIn = lsGetItem('isLoggedIn');
  const userId = useSelector(selectUserId);
  const { sendMessage, pingMessage } = useChat();
  const chatPingIntervalRef = useRef<undefined | NodeJS.Timer>();
  const [getCurrentUser, getCurrentUserResult] = useLazyGetCurrentUserQuery();
  const shouldRedirectToLogin = !isLoggedIn || getCurrentUserResult.isError;

  if (shouldRedirectToLogin) {
    console.log('Redirect to Login in PrivateRoute');
  }

  useEffect(() => {
    if (isLoggedIn && !userId) {
      console.log('Request user data in PrivateRoute');
      getCurrentUser();
    }
  }, [getCurrentUser, isLoggedIn, userId]);

  // Ping chat after opening it once
  useEffect(() => {
    clearInterval(chatPingIntervalRef.current);

    if (pingMessage) {
      chatPingIntervalRef.current = setInterval(() => {
        console.log('PING!');
        sendMessage(pingMessage);
      }, 10000);
    }

    return () => {
      clearInterval(chatPingIntervalRef.current);
    };
  }, [pingMessage]);

  const loading = getCurrentUserResult.isLoading;

  if (loading) {
    return <Loader />;
  }

  return shouldRedirectToLogin ? <Navigate to={ROUTES.login.path} state={{ from: location }} replace /> : <Outlet />;
};
