import { store } from 'store/store';
import { chatActions } from 'store/chat/chat.slice';

type TIFrameResponseType = 'SendToken';

interface IIFrameResponse {
  actionName: TIFrameResponseType;
  [key: string]: any;
}

const iFrameBridgeResponse = (response: string | Object) => {
  if (response) {
    if (response instanceof Object) return;

    const parsedResponse: IIFrameResponse = JSON.parse(response);
    const { actionName, data } = parsedResponse;

    if (actionName === 'SendToken') {
      store.dispatch(chatActions.setToken(data));
    }
  }
};

export const iFrameMessagesListener = () => {
  window.addEventListener('message', ({ data }) => {
    if (data.type?.includes('webpack')) return;
    iFrameBridgeResponse(data);
  });
};
