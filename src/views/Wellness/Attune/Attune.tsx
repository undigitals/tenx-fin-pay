import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentAuthState, selectPolicies, selectUserLanguage } from 'store/user/authentication.slice';
import { selectAttuneData } from 'store/user/attune/attune.slice';
import { SIFrame } from './Attune.style';

export const Attune: React.FC = () => {
  const currentUser = useSelector(selectCurrentAuthState);
  const attuneData = useSelector(selectAttuneData);
  const policies = useSelector(selectPolicies);
  const language = useSelector(selectUserLanguage);

  const getIframeUrl = () => {
    if (policies?.EnableNewAttuneAPI) {
      return `https://attune.co/tenx/app/${currentUser.attuneQuizId}?sessionId=${currentUser.attuneUserId}&lang=${language}`;
    }
    return attuneData.results?.length > 0
      ? `https://www.attune.co/tenx/results/${currentUser.attuneQuizId}/${attuneData.results[0].userUUID}&lang=${language}`
      : `https://www.attune.co/tenx/aq/${currentUser.attuneQuizId}/${currentUser.attuneUserId}?${currentUser.attuneUserId}&lang=${language}`;
  };

  return <SIFrame src={getIframeUrl()} />;
};
