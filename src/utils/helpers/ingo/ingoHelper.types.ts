export interface IWebPluginProps {
  iframeElement: HTMLIFrameElement | null;
  iframeUrl: string;
  fundingDestination: string;
  onCloseHandler: Function;
  onCreateHistoryHandler: Function;
  IngoInstantPayments: any;
}
