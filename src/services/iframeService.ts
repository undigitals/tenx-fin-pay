type TIframePostMessageType = 'SendToken';

interface IIframePostMessage {
  actionName: TIframePostMessageType;
  [key: string]: any;
}

export const iframeCall = (iframe: HTMLIFrameElement, event: IIframePostMessage) => {
  const postMessage = JSON.stringify(event);

  if (iframe.contentWindow) {
    iframe.contentWindow.postMessage(postMessage, process.env.REACT_APP_BASE_URL || document.location.origin);
  }
};
