import React from 'react';
import { useLocation } from 'react-router-dom';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { TruliooIframe } from 'views/OpenCashAccount/MyIdPage/TruliooIframe/TruliooIframe';
import { SLayout } from './TruliooLayout.style';

interface ITruliooLayout {
  state?: {
    iframeUrl: '';
    truliooAccessToken: '';
    isBrowser?: boolean;
  };
  search: string;
}

export const TruliooLayout: React.FC = () => {
  const location = useLocation() as ITruliooLayout;
  const searchParams = new URLSearchParams(location.search);
  const isBrowser = location?.state?.isBrowser || false;
  const iframeUrl = location?.state?.iframeUrl || searchParams.get('iframeUrl');
  const truliooAccessToken = location?.state?.truliooAccessToken || searchParams.get('truliooAccessToken');

  return (
    <SLayout>
      {iframeUrl && truliooAccessToken ? <TruliooIframe iframeUrl={iframeUrl} truliooAccessToken={truliooAccessToken} isBrowser={isBrowser} /> : <CustomText>Not valid data</CustomText>}
    </SLayout>
  );
};
