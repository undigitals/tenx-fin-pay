import { compose } from 'redux';

declare global {
  interface Window {
    webkit: any;
    IngoInstantPayments?: any;
    TruliooClient?: any;
    changeLanguageRequest: (lang: string) => void;
    mobileBridgeResponse: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }

  interface Navigator {
    systemLanguage: () => void;
  }

  interface IDictionary<TVal> {
    [propName: string]: TVal;
  }
}
