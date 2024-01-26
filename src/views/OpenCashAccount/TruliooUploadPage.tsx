import React, { useState } from 'react';
import { ROUTES } from 'vars/const/ROUTES';
import { TruliooOverlay } from './TruliooOverlay';

export const TruliooUploadPage = () => {
  const [truliooQueryParams] = useState(() => {
    const queryParams = new URLSearchParams(window.location.search);
    return {
      shortCode: queryParams.get('code'),
      language: queryParams.get('locale'),
    };
  });

  return <TruliooOverlay active shortCode={truliooQueryParams.shortCode} language={truliooQueryParams.language} redirectURL={ROUTES.myId.path} />;
};
