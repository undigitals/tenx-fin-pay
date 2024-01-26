import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { AddNewSourceModal } from 'components/general/Modals/AddNewSourceModal/AddNewSourceModal';
import { useLazyGetIframeUrlQuery } from 'store/ingo/ingo.api';
import { INGO_INSTANT_PAYMENTS } from 'vars/const/externalUrls';
import { useScript } from 'utils/hooks/useScript';
import { useAnalytics } from 'utils/hooks/useAnalytics';
import { initWebPlugin } from 'utils/helpers/ingo/ingoHelper';
import { useToggle } from 'utils/hooks/useToggle';
import { SIFrame, SLayout } from './AddNewSourceIframe.style';

interface IAddNewSourceIframeLocation {
  state?: {
    fundingDestination: 'ach' | 'debit';
  };
}

export const AddNewSourceIframe = () => {
  useScript(INGO_INSTANT_PAYMENTS);
  const location = useLocation() as IAddNewSourceIframeLocation;
  const [getIframeUrl] = useLazyGetIframeUrlQuery();
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [modalIsSuccess, setModalIsSuccess] = useState(false);
  const { track } = useAnalytics();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fundingDestination = location?.state?.fundingDestination ?? 'ach';
  const addNewSourceModal = useToggle(false);

  const executeModal = (isSuccess: boolean) => {
    setModalIsSuccess(isSuccess);
    addNewSourceModal.show();
  };

  const onSuccess = () => {
    executeModal(true);
  };

  const onFailure = (event: any) => {
    track('ingo_error', JSON.stringify(event));
    executeModal(false);
  };

  const executeWebPlugin = async () => {
    const iframeUrl = await getIframeUrl({}).unwrap();
    if (iframeUrl) {
      initWebPlugin({
        iframeElement: iframeRef.current,
        iframeUrl,
        fundingDestination,
        onCloseHandler: onSuccess,
        onCreateHistoryHandler: onFailure,
        IngoInstantPayments: window?.IngoInstantPayments,
      });
    }
  };

  useEffect(() => {
    if (window?.IngoInstantPayments) {
      executeWebPlugin();
    } else {
      setConnectionAttempts(connectionAttempts + 1);
    }
  }, [connectionAttempts]);

  return (
    <SLayout>
      <SIFrame id="ingo-iframe" ref={iframeRef} />
      <AddNewSourceModal open={addNewSourceModal.isActive} onClose={addNewSourceModal.hide} isSuccess={modalIsSuccess} navPath={ROUTES.addMoney.path} />
    </SLayout>
  );
};
