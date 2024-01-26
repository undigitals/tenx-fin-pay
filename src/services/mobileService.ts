import { mobileAuthentication, mobileAuthRefreshToken } from 'store/user/authentication.slice';
import { store } from 'store/store';
import { setMenuData } from 'store/ui.slice';
import { chatActions } from 'store/chat/chat.slice';
import { setMobileLocation } from 'store/location.slice';

type MobileRequestType =
  | 'logout'
  | 'getLocation'
  | 'openChat'
  | 'closeChat'
  | 'refreshToken'
  | 'micChatRequest'
  | 'chatBotMessage'
  | 'chatURLRedirect'
  | 'backgroundChange'
  | 'cardHubRequest'
  | 'userNameChange'
  | 'legalNameChange'
  | 'preferredNameChange'
  | 'changeLanguageRequest'
  | 'accountDeleted'
  | 'setBiometry'
  | 'showFullBrowser'
  | 'startTrulioo'
  | 'documentUploadRequest'
  | 'openCheckCashing';

type MobileResponseType = 'LoginAuth' | 'SendLocation' | 'AuthRefresh' | 'ChatSTTMessage' | 'AppStateDidChange';

interface MobileResponse {
  actionName: MobileResponseType;
  data: any;
}

interface IChatRecognizedMessageResponse {
  text: string;
}

interface IMobileAppState {
  state: 'background' | 'foreground';
}

// ================================== API FUNCTIONS ==================================
const mobileResponseLogin = (data: any) => {
  store.dispatch(
    mobileAuthentication({
      client: data.client,
      token: data.accessToken,
      environment: data.environment,
      otpSeed: data.otpSeed,
      isEmailVerifiedOrAbsent: data.isEmailVerifiedOrAbsent,
      thirdPartyIds: data.thirdPartyIds,
      systemProperties: data.systemProperties,
      biometryState: data.biometryState,
      biometryType: data.biometryType,
      policies: data.policies,
      language: data.language,
      redirectUrl: data.redirectUrl,
      cardHubSsoData: data.cardHubSsoData,
    })
  );
  store.dispatch(setMenuData(data.menu));
};

const mobileResponseLocation = (data: any) => {
  store.dispatch(setMobileLocation(data));
  console.log('mobileResponseLocation', data);
  store.dispatch(chatActions.setMobileLocation(data));
};
const mobileResponseRecognizeMessage = ({ text }: IChatRecognizedMessageResponse) => {
  store.dispatch(chatActions.setRecognizedMessage(text));
};

const mobileResponseAuthRefresh = (data: any) => {
  store.dispatch(mobileAuthRefreshToken({ token: data.accessToken }));
};

const mobileHandleAppStateChange = ({ state }: IMobileAppState) => {
  if (state === 'foreground') {
    store.dispatch(chatActions.reconnectToWebSocket());
  }
};

// ================================== API WRAPPERS ==================================
export const mobileApiCall = (actionName: MobileRequestType, data: any = '') => {
  const actionData = {
    actionName,
    data,
  };

  const postMessage = JSON.stringify(actionData);

  if (window.webkit) {
    window.webkit?.messageHandlers?.mobileBridgeRequest?.postMessage(postMessage);
  }
};

/**
 * This function is used to inject the mobile authentication into the store
 * Mobile device will call this function and give React app user date
 * @param response
 */
export const mobileBridgeResponse = (response: string | null = null) => {
  if (response) {
    const parsedResponse: MobileResponse = JSON.parse(response);
    // TODO: create types for data
    const { actionName, data } = parsedResponse;

    if (actionName === 'LoginAuth') {
      mobileResponseLogin(data);
    }

    if (actionName === 'SendLocation') {
      mobileResponseLocation(data);
    }

    if (actionName === 'AuthRefresh') {
      mobileResponseAuthRefresh(data);
    }
    if (actionName === 'ChatSTTMessage') {
      mobileResponseRecognizeMessage(data);
    }

    if (actionName === 'AppStateDidChange') {
      mobileHandleAppStateChange(data);
    }
  }
};

/**
 * Init mobile injections
 * Note: you need to add new methods into global window interface
 */
export const mobileInjectionInit = () => {
  window.mobileBridgeResponse = mobileBridgeResponse;
};

// ================================== API CALLS ==================================

export const mobileCallCloseChat = () => {
  mobileApiCall('closeChat');
};

export const mobileCallOpenChat = () => {
  mobileApiCall('openChat');
};

export const mobileCallLocation = () => {
  mobileApiCall('getLocation');
};

export const mobileCallMicRequest = () => {
  mobileApiCall('micChatRequest');
};

export const mobileCallUrlRedirect = (url: string) => {
  mobileApiCall('chatURLRedirect', url);
};

export const mobileCallSendMessageFromBot = (message: string) => {
  mobileApiCall('chatBotMessage', message);
};
