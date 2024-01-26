import assert from 'assert';
import clsx from 'clsx';
import { Loader } from 'components/general/Loader/Loader';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import type { event as TruliooEvent } from '@trulioo/docv';
import { mediaUpTo } from 'utils/helpers/styleHelpers';

const STruliooOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: white;
  z-index: 1001;

  ${mediaUpTo(
    767,
    css`
      position: absolute;
    `
  )}

  &.inactive {
    display: none;
  }
`;

const TRULIOO_OVERLAY_ID = 'trulioo-overlay';

export type ITruliooOverlayProps = {
  active: boolean;
  shortCode: string | null;
  language: string | null;
  redirectURL: string | null;
  onComplete?: TruliooEvent.adapters.ListenerCallback['onComplete'];
  onError?: TruliooEvent.adapters.ListenerCallback['onError'];
  onException?: TruliooEvent.adapters.ListenerCallback['onException'];
};

export const TruliooOverlay = ({ active, shortCode, language, redirectURL, onComplete, onError, onException }: ITruliooOverlayProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (active) {
      (async function initAndLaunchTrulioo() {
        assert(shortCode != null);
        assert(language != null);
        assert(redirectURL != null);

        setLoading(true);

        try {
          const { Trulioo, event: TruliooEvent } = await import('@trulioo/docv');
          const workflow = Trulioo.workflow();
          workflow.setShortCode(shortCode);
          workflow.setLanguage(language);
          workflow.setRedirectUrl(redirectURL);
          await Trulioo.initialize(workflow);

          const callbacks = new TruliooEvent.adapters.ListenerCallback({
            onComplete,
            onError,
            onException,
          });
          const events = Trulioo.event().setCallbacks(callbacks);
          await Trulioo.launch(TRULIOO_OVERLAY_ID, events);
        } finally {
          setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <>
      {active && loading && <Loader />}
      <STruliooOverlay id={TRULIOO_OVERLAY_ID} className={clsx((!active || loading) && 'inactive')} />
    </>
  );
};
