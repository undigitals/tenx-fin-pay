import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLanguage } from 'utils/hooks/useLanguage';
import { ZOGO_INTERGATION } from 'vars/const/externalUrls';
import { IFrame } from 'components/general/IFrame/IFrame';
import { selectZogoData } from 'store/user/zogo/zogo.slice';

export const PlayPercUp: React.FC = () => {
  const zogoData = useSelector(selectZogoData);
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const currentLanguage = `${language}-US`;

  const integrationCustomizations = {
    lang: currentLanguage,
  };
  // eslint-disable-next-line
  const iFrameLanguage: string = encodeURIComponent(JSON.stringify(integrationCustomizations));
  // eslint-disable-next-line
  const module_id = searchParams.get('module_id');

  const widgetType: string = searchParams.get('widget_type') || 'learn_and_earn';

  const iframeUrl = `${ZOGO_INTERGATION}?widget_type=${widgetType}&integration_customizations=${iFrameLanguage}&token=${zogoData.accessToken}&module_id=${module_id}`;

  return <IFrame url={iframeUrl} contentId={zogoData.accessToken} />;
};
