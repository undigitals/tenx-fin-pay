import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IConversation } from 'views/Chat/types/Conversation.type';
import { getChatWebSocket } from 'views/Chat/services/socket.service';
import { mobileCallLocation, mobileCallCloseChat, mobileCallMicRequest, mobileCallOpenChat, mobileCallSendMessageFromBot } from 'services/mobileService';
import { parseTextFromHtml } from 'views/Chat/utils/parseTextFromHtml';
import { authenticationApi } from 'store/user/authentication.api';
import { chatApi } from './chat.api';
import { IActivity, IIntent, IIntentQuestion, IMessage, IMessageEntity, IMessageObject, MessageTypes, MobileLocationResponse, TLocation, TMessageOriginTypes } from './chat.types';

export interface ChatState {
  activeConversation: IConversation | null;
  token: string;
  otpSeed: string;
  messages: IMessage[];
  currentIntentMessages: any[];
  correctAnswerMessageId: string;
  intentTestingResults: any[];
  messagesIntents: any[];
  connecting: boolean;
  isConnected: boolean;
  isRecognizing: boolean;
  isActionResponse: boolean;
  userId: string;
  message: string;
  askedQuestion: string;
  intents: IIntent[];
  intentQuestions: IIntentQuestion[];
  selectedIntent?: IIntent;
  selectedQuestion: IIntentQuestion | undefined;
  messageObject: IMessageObject | null;
  pingMessageObject: IMessageObject | null;
  userLocation: TLocation | null;
  policies: any;
  error: string | null;
  typing: boolean;
}

const initialState: ChatState = {
  activeConversation: null,
  token: '',
  otpSeed: '',
  messages: [],
  correctAnswerMessageId: '',
  messagesIntents: [],
  currentIntentMessages: [],
  intentTestingResults: [],
  askedQuestion: '',
  connecting: false,
  isConnected: false,
  isRecognizing: false,
  isActionResponse: false,
  userId: 'John Doe',
  intents: [],
  intentQuestions: [],
  selectedIntent: undefined,
  selectedQuestion: undefined,
  message: '',
  messageObject: null,
  pingMessageObject: null,
  userLocation: null,
  policies: null,
  error: null,
  typing: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setPolicies: (state, { payload }) => {
      state.policies = payload;
    },
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    setRecognizedMessage: (state, { payload }) => {
      if (state.isRecognizing) {
        state.message = payload;
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setSelectedIntent: (state, { payload }: PayloadAction<string>) => {
      state.selectedIntent = state.intents.find((intent) => intent.id === payload);
    },
    setSelectedQuestion: (state, { payload }: PayloadAction<string>) => {
      state.selectedQuestion = state.intentQuestions.find((intent) => intent.id === payload);
    },
    setMobileLocation: (state, { payload }: PayloadAction<MobileLocationResponse>) => {
      state.userLocation = payload;
    },
    pickAnotherQuestion: (state) => {
      state.selectedIntent = state.intents[Math.floor(Math.random() * state.intents.length)];
    },
    /* eslint-disable */
    startConnecting: (state, { payload }: PayloadAction<string>) => {
      state.connecting = true;
      getChatWebSocket(payload);
    },
    startRecognizing: (state) => {
      if (!state.isRecognizing) {
        mobileCallMicRequest();
        state.isRecognizing = true;
      }
    },
    stopRecognizing: (state) => {
      if (state.isRecognizing) {
        mobileCallMicRequest();
        state.isRecognizing = false;
      }
    },
    setMessageAsActionResponse: (state) => {
      state.isActionResponse = true;
    },
    setTyping: (state, { payload }) => {
      state.typing = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    setIsConnected: (state) => {
      state.isConnected = true;
      state.connecting = false;
      state.error = null;
    },
    connectionClosed: (state) => {
      state.isConnected = false;
      state.connecting = false;
      state.messages = [];
    },
    addMessages: (state, { payload }: PayloadAction<any[]>) => {
      const uniqueMessages = payload.filter((msg1, i, a) => a.findIndex((msg2) => msg2.id === msg1.id) === i);
      state.messages.splice(state.messages.length, 0, ...uniqueMessages);
    },
    receiveMessage: (state, { payload }: PayloadAction<IActivity>) => {
      const { entities, text, id, suggestedActions } = payload;

      const origin: TMessageOriginTypes = payload.recipient ? 'OUTBOX' : 'INBOX';
      // TODO: for next PR
      // const origin: TMessageOriginTypes = 'OUTBOX';
      const messageSourceEntity = entities?.find((entity) => entity.type === 'MessageSource');
      const messageIdEntity = entities?.find((entity) => entity.type === 'MessageIdEntity');
      const intentTestSessionEntity = entities?.find((entity) => entity.type === 'IntentTestSessionEntity');

      if (messageSourceEntity?.value === 'voice' && origin === 'INBOX') {
        mobileCallSendMessageFromBot(parseTextFromHtml(text));
      }

      if (intentTestSessionEntity && origin === 'INBOX') {
        state.currentIntentMessages.push({
          id,
          text,
          bot: intentTestSessionEntity.Bot,
          askedQuestion: intentTestSessionEntity.AskedQuestion,
          intentId: intentTestSessionEntity.IntentId,
        });
      }

      const messageObj = {
        origin,
        contentType: payload.type === 'message' ? MessageTypes.MESSAGE : MessageTypes.SYSTEM,
        isIntent: Boolean(intentTestSessionEntity),
        ...payload,
      };

      const allMessageEntityIds = state.messages
        ?.map((msg) => msg.entities.find((msg) => msg.type === 'MessageIdEntity'))
        .filter(Boolean)
        .map((id) => id?.Value);

      if (suggestedActions) messageObj.suggestedActions = suggestedActions;

      const messageAlreadyExists = state.messages.some((msg) => msg.id === id) || allMessageEntityIds.some((id) => messageIdEntity?.Value === id);

      if (!messageAlreadyExists) {
        state.messages.push(messageObj);
      }
    },
    prepareIntentTestingResults: (state) => {
      state.intentTestingResults = state.currentIntentMessages.map((msg) => ({
        intentId: msg.intentId,
        bot: msg.bot,
        askedQuestion: msg.askedQuestion,
        answer: msg.text,
        isCorrect: state.selectedIntent?.correctAnswerText === msg.text,
      }));
    },
    prepareSystemMessage: (state, { payload }) => {
      const { token, userId, activeConversation, otpSeed } = state;
      const conversationId = activeConversation?.conversationId || '';

      const typingEntity: IMessageEntity = {
        type: payload,
      };

      state.messageObject = {
        id: conversationId,
        text: '',
        fromUserId: userId,
        entities: [typingEntity],
        authToken: token,
        otpToken: otpSeed,
        type: MessageTypes.SYSTEM,
      };
    },
    setPingMessage: (state) => {
      const { token, userId, activeConversation, otpSeed } = state;
      const conversationId = activeConversation?.conversationId || '';

      state.pingMessageObject = {
        id: conversationId,
        text: '',
        fromUserId: userId,
        entities: [
          {
            type: 'Ping',
          },
        ],
        authToken: token,
        otpToken: otpSeed,
        type: MessageTypes.SYSTEM,
      };
    },
    clearPingMessage: (state) => {
      state.pingMessageObject = null;
    },
    prepareMessageObject: (state) => {
      state.askedQuestion = '';

      const { userLocation, isRecognizing, token, userId, activeConversation, otpSeed, message, selectedQuestion } = state;

      const conversationId = activeConversation?.conversationId || '';
      const entities = [];

      const intentTestEntity: IMessageEntity = {
        type: 'IntentTestSessionEntity',
        intentId: selectedQuestion?.intentId || '',
        askedQuestion: message,
      };

      if (state.policies?.IntentsTestingEnabled) {
        entities.push(intentTestEntity);
      }

      console.log('User location from message: ', userLocation);

      if (userLocation) {
        const locationEntity: IMessageEntity = {
          type: 'GeoCoordinates',
          latitude: userLocation.x,
          longitude: userLocation.y,
        };

        entities.push(locationEntity);
      }

      console.log('entities: ', entities);

      if (isRecognizing) {
        const speechMessageEntity: IMessageEntity = {
          type: 'MessageSource',
          value: 'voice',
        };
        entities.push(speechMessageEntity);
        mobileCallMicRequest();
        state.isRecognizing = false;
      }

      state.messageObject = {
        id: conversationId,
        fromUserId: userId,
        text: message,
        entities,
        authToken: token,
        otpToken: otpSeed,
      };

      state.currentIntentMessages = [];
      state.askedQuestion = message;
    },
    closeChat: () => {
      mobileCallCloseChat();
    },
    reconnectToWebSocket: (state) => {
      if (state.activeConversation) {
        getChatWebSocket(state.activeConversation.streamUrl);
      }
    },
    openChat: () => {
      mobileCallOpenChat();
    },
    getMobileLocation: () => {
      mobileCallLocation();
    },
    clearMessage: (state) => {
      state.message = '';
      state.messageObject = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(chatApi.endpoints.sendMessage.matchPending, (state) => {
      if (state.isRecognizing) state.isRecognizing = false;
      if (state.isActionResponse) state.isActionResponse = false;

      // state.message = '';
      state.messageObject = null;
    });
    builder.addMatcher(chatApi.endpoints.sendIntent.matchFulfilled, (state) => {
      state.currentIntentMessages = [];
    });
    builder.addMatcher(chatApi.endpoints.getIntents.matchFulfilled, (state, { payload }: PayloadAction<any>) => {
      state.intents = payload;
      state.selectedIntent = payload[Math.floor(Math.random() * payload.length)];
    });
    builder.addMatcher(chatApi.endpoints.getIntentQuestions.matchFulfilled, (state, { payload }: PayloadAction<any>) => {
      state.intentQuestions = payload;
      state.selectedQuestion = payload[Math.floor(Math.random() * payload.length)];
    });
    builder.addMatcher(chatApi.endpoints.getConversations.matchFulfilled, (state, { payload }: PayloadAction<IConversation>) => {
      state.activeConversation = payload;
    });
    builder.addMatcher(chatApi.endpoints.reconnectToConversation.matchFulfilled, (state, { payload }: PayloadAction) => {
      // eslint-disable-next-line no-console
      console.log(payload);
    });
    builder.addMatcher(chatApi.endpoints.endConversation.matchFulfilled, (state, { payload }: PayloadAction) => {
      // eslint-disable-next-line no-console
      console.log(payload);
    });
    builder.addMatcher(authenticationApi.endpoints.logout.matchFulfilled, (state) => {
      // chatSlice.caseReducers.closeChat();
      state.activeConversation = null;
    });
  },
});

export const selectChatState = (state: RootState) => state.chat;
export const selectPingMessage = createSelector(selectChatState, (chatState) => chatState.pingMessageObject);
export const chatActions = chatSlice.actions;
export const reducers = chatSlice.reducer;
