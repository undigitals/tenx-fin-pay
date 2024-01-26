import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from 'components/general/Loader/Loader';
import { SIFrame } from './AccountStatementsIframe.styles';

interface IAccountStatementsIframeProps {
  state?: {
    iFrameUrl?: string;
    iFrameTitle?: string;
  };
  search: string;
}

export const AccountStatementsIframe: React.FC = () => {
  const location = useLocation() as IAccountStatementsIframeProps;
  const searchParams = new URLSearchParams(location.search);
  const iFrameUrl = location?.state?.iFrameUrl || searchParams.get('iFrameUrl') || '';
  const iFrameTitle = location?.state?.iFrameTitle || searchParams.get('iFrameTitle');
  const [iFrameIsLoading, setIFrameIsLoading] = useState(true);

  return (
    <>
      {iFrameIsLoading && <Loader />}
      <SIFrame width="100%" height="100%" frameBorder="0" onLoad={() => setIFrameIsLoading(false)} title={String(iFrameTitle)} src={iFrameUrl} />
    </>
  );
};
