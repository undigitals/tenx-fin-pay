import React, { useEffect, useRef } from 'react';
import { urlString } from 'utils/helpers/urlString/urlString';
import { SIFrame } from './IFrame.styles';
import { IFrameControllableProps } from './IFrame.types';

export const IFrameControllable: React.FC<IFrameControllableProps> = ({ url, id, onLoad = () => {}, params }) => {
  const urlStr = urlString({ url, params });

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframeCurrent = iframeRef.current;
    iframeCurrent?.addEventListener('load', onLoad);

    return () => {
      iframeCurrent?.removeEventListener('load', onLoad);
    };
  }, [onLoad]);

  return <SIFrame src={urlStr} id={id} ref={iframeRef} />;
};
