import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentAuthState } from 'store/user/authentication.slice';
import { SIFrame } from './CardHubModal.styles';

/*
const APP_TOKEN = 'tenx2022';
const FI_TOKEN = '89313191';
const URL_ENDPOINT = 'https://cardhubsdk-poc.ondotsystems.com';
*/

// Create a redirect URL and replace all placeholders with the appropriate values
const redirectUrl = (baseUrl: string | undefined, fiToken: string | undefined, appToken: string | undefined, subscriberReferenceId: string | undefined): string =>
  `${baseUrl}/ch?channel=web&fiToken=${fiToken}&appToken=${appToken}&subscriberReferenceId=${subscriberReferenceId}&nav=cardDetail`;

export const CardHubFrame: React.FC = () => {
  const { cardHubSsoPayload, thirdPartyIds, cardHubSsoData } = useSelector(selectCurrentAuthState);

  const redirectValue = redirectUrl(cardHubSsoData?.baseUrl, cardHubSsoData?.fiToken, cardHubSsoData?.appToken, thirdPartyIds?.CardHub);

  const iframeRef = React.createRef<HTMLIFrameElement>();
  const formRef = React.createRef<HTMLFormElement>();

  useEffect(() => {
    if (iframeRef && formRef) {
      formRef.current?.submit();
    }
  }, []);

  return (
    <>
      <form action={`${cardHubSsoData?.baseUrl}/ch/secureaccess.jsp`} method="POST" target="integrated-app" ref={formRef}>
        <input type="hidden" name="redirectUrl" value={redirectValue} />
        <input type="hidden" name="sso" value={cardHubSsoPayload} />
      </form>
      <SIFrame id="integrated-app" name="integrated-app" title="integration" ref={iframeRef} />
    </>
  );
};
