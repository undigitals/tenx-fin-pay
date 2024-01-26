import React, { useMemo } from 'react';
import { urlString } from 'utils/helpers/urlString/urlString';
import { IUrlString } from 'utils/helpers/urlString/urlString.types';
import { SIFrame } from './IFrame.styles';

export const IFrame: React.FC<IUrlString> = ({ url, params, onLoad, contentId, hidden }) => {
  const src = useMemo(() => urlString({ url, params }), [url, params]);

  return <SIFrame title={contentId} src={src} onLoad={onLoad} hidden={hidden} />;
};
