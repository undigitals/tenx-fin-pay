import React, { FC, useEffect } from 'react';
import { IRiskSessionResponse } from 'vars/types/ingo.types';

interface IRiskSessionProps {
  data: IRiskSessionResponse;
}

export const FingerprintAndBehavioralData: FC<IRiskSessionProps> = ({ data }) => {
  const {
    ingoCollectorsvcUrl,
    ingoCollectorsvcAccountName,
    session: { org_id: orgId, web_session_id: webSessionId },
  } = data;

  const fpUrl = `https://fp.ecustomerpayments.com/DF/fp/check.js?org_id=${orgId}&session_id=${webSessionId}`;
  const collectorsUrl = `${ingoCollectorsvcUrl}?AccountName=${ingoCollectorsvcAccountName}&WebSessionID=${webSessionId}`;
  const bgUrl = `https://fp.ecustomerpayments.com/DF/fp/clear.png?org_id=${orgId}&session_id=${webSessionId}&m=1`;
  const imgSrc = `https://fp.ecustomerpayments.com/DF/fp/clear.png?org_id=${orgId}&session_id=${webSessionId}&m=2`;

  useEffect(() => {
    const scriptFingerprint = document.createElement('script');
    const scriptCollectors = document.createElement('script');
    if (data) {
      scriptFingerprint.src = fpUrl;
      scriptCollectors.src = collectorsUrl;
      scriptFingerprint.async = true;
      scriptCollectors.async = true;
      document.body.appendChild(scriptFingerprint);
      document.body.appendChild(scriptCollectors);
    }

    return () => {
      document.body.removeChild(scriptFingerprint);
      document.body.removeChild(scriptCollectors);
    };
  }, []);

  return (
    data && (
      <>
        <p style={{ background: `url(${bgUrl})` }} />

        <img src={imgSrc} alt="" />
      </>
    )
  );
};
