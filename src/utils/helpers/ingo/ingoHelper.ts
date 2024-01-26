import { INGO_INSTANT_PAYMENTS } from 'vars/const/externalUrls';
import { IWebPluginProps } from './ingoHelper.types';

export const addScriptToBody = () => {
  const script = document.createElement('script');
  script.src = INGO_INSTANT_PAYMENTS;
  script.async = true;
  document.body.appendChild(script);
};

export const initWebPlugin = ({ iframeElement, iframeUrl, fundingDestination, onCloseHandler, onCreateHistoryHandler, IngoInstantPayments }: IWebPluginProps) => {
  if (IngoInstantPayments) {
    const webPlugin = IngoInstantPayments.create(iframeElement, {
      cssName: 'web-plugin',
      autoHeight: true,
      scrolling: false,
    });

    const closeEventsSet = [IngoInstantPayments.EVENTS.TOKEN_SUCCESS, IngoInstantPayments.EVENTS.FUNDING_CANCELED];

    const createHistoryEventsSet = [
      IngoInstantPayments.EVENTS.TERMINAL_FAILURE,
      IngoInstantPayments.EVENTS.TERMINAL_FAILURE_ACKNOWLEDGED,
      IngoInstantPayments.EVENTS.MAX_VERIFICATION_ATTEMPTS_EXCEEDED,
      IngoInstantPayments.EVENTS.ACCOUNT_COULD_NOT_BE_VERIFIED,
      IngoInstantPayments.EVENTS.BILLPAY_SEARCH_NO_MATCH_FOUND,
      IngoInstantPayments.EVENTS.UNSUPPORTED_BROWSER_DETECTED,
      IngoInstantPayments.EVENTS.PLUGIN_ERROR,
      IngoInstantPayments.EVENTS.SESSION_ERROR,
    ];

    webPlugin.mount(iframeUrl, fundingDestination);

    closeEventsSet.forEach((event: string) => {
      webPlugin.addEventListener(event, () => {
        onCloseHandler();
      });
    });

    createHistoryEventsSet.forEach((event: string) => {
      webPlugin.addEventListener(event, (data: any) => {
        onCreateHistoryHandler(data.content);
      });
    });
  }
};
