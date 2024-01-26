import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { urlString } from 'utils/helpers/urlString/urlString';
import { useSaveTransactionMutation } from 'store/trulioo/trulioo.api';
import { SIFrame } from './TruliooIframe.style';

interface ITruliooIframe {
  iframeUrl: string;
  truliooAccessToken: string | null;
  isBrowser: boolean;
}

export const TruliooIframe: React.FC<ITruliooIframe> = ({ iframeUrl, truliooAccessToken, isBrowser }) => {
  const navigate = useNavigate();
  const [saveTransaction] = useSaveTransactionMutation();

  const getMobileUrl = (experienceTransactionId: string) => {
    const params = { experienceTransactionId };
    return urlString({ url: ROUTES.myIdPending.path, params });
  };

  useEffect(() => {
    const onMessage = async (event: any) => {
      if (event.data?.function === 'handleResponse') {
        const message = JSON.parse(event.data.message);
        const { experienceTransactionId } = message;
        if (experienceTransactionId) {
          await saveTransaction({ truliooAccessToken, experienceTransactionId });
        }

        if (isBrowser) {
          const browserRoute = experienceTransactionId ? ROUTES.myIdPending.path : ROUTES.myId.path;
          navigate(browserRoute, {
            state: { experienceTransactionId },
          });
        } else {
          const mobileRoute = experienceTransactionId ? getMobileUrl(experienceTransactionId) : ROUTES.myId.path;
          window.location.href = `com.tenx://closeSafaryController?url=${mobileRoute}`;
        }
      }
    };
    if (window && window.addEventListener) {
      window.addEventListener('message', onMessage, false);
    }

    return () => {
      window?.removeEventListener('message', onMessage);
    };
  }, [navigate, saveTransaction, truliooAccessToken]);

  return <SIFrame src={iframeUrl} id="ingo-iframe" allow="camera" />;
};
