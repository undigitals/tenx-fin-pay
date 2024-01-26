import { API_ROUTES } from 'vars/const/API_ROUTES';
import { getChatWebSocket } from 'views/Chat/services/socket.service';
import { IConversation } from 'views/Chat/types/Conversation.type';
import { api } from 'store/api';
import { IQuestionItem, IIntentGroupItem, IGetIntentGroupsByIdResponse, IMessage, IIntent } from './chat.types';

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<IConversation, void>({
      query: () => ({
        url: API_ROUTES.chat.conversations,
        method: 'POST',
      }),
    }),
    getMessagesFromStream: builder.query<IMessage[], string>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        console.log(`The application requests the conversations for the first time in a while`);
        try {
          const conversationsRes = await cacheDataLoaded;
          console.log(`The conversations for chat`, conversationsRes);
          const chatSocket = getChatWebSocket(arg);
          console.log('SOCKET_STREAK', arg);

          chatSocket.onmessage = (event: any) => {
            if (event.data.length) {
              const messages = JSON.parse(event.data).activities;

              updateCachedData((draft) => {
                draft.splice(draft.length, 0, ...messages);
              });
            }
          };

          await cacheEntryRemoved;
          chatSocket?.close();
          console.log(`No component subscribed to the data from conversations for the last 60 seconds`);
        } catch {
          // if cacheEntryRemoved resolves before cacheDataLoaded,
          // cacheDataLoaded throws an error
        }
      },
    }),
    sendMessage: builder.mutation({
      query: ({ id, fromUserId, type = 'message', text, entities }) => ({
        url: API_ROUTES.chat.messages(id),
        method: 'POST',
        body: {
          fromUserId,
          type,
          text,
          entities,
        },
      }),
    }),
    getMessages: builder.query({
      query: ({ id }) => ({
        url: API_ROUTES.chat.messages(id),
        method: 'GET',
      }),
    }),
    reconnectToConversation: builder.mutation({
      query: ({ id, watermark }) => ({
        url: API_ROUTES.chat.reconnect(id),
        method: 'POST',
        body: { watermark },
      }),
    }),
    endConversation: builder.mutation({
      query: ({ id, fromUserId }) => ({
        url: API_ROUTES.chat.end(id),
        method: 'POST',
        body: { fromUserId },
      }),
    }),
    getIntents: builder.query<IIntent[], void>({
      query: () => ({
        url: API_ROUTES.chat.intents,
        method: 'GET',
      }),
      providesTags: ['FAQ'],
    }),
    getIntentGroups: builder.query<IIntentGroupItem[], void>({
      query: () => ({
        url: API_ROUTES.chat.intentGroups,
      }),
      transformResponse: (response: IIntentGroupItem[]) => response.sort((a, b) => a.sortOrder - b.sortOrder),
      providesTags: ['FAQ'],
    }),
    getIntentsByGroupId: builder.query<IGetIntentGroupsByIdResponse, string>({
      query: (groupId) => ({
        url: API_ROUTES.chat.intentGroupById(groupId),
      }),
      providesTags: ['FAQ'],
    }),
    getIntentQuestions: builder.query<IQuestionItem[], string>({
      query: (intentName) => ({
        url: API_ROUTES.chat.intentQuestions(intentName),
        method: 'GET',
      }),
      providesTags: ['FAQ'],
    }),
    sendIntent: builder.mutation({
      query: (intent) => ({
        url: API_ROUTES.chat.intentTestingResults,
        method: 'POST',
        body: intent,
      }),
    }),
  }),
});

export const {
  useLazyGetConversationsQuery,
  useSendMessageMutation,
  useSendIntentMutation,
  useLazyGetIntentsQuery,
  useLazyGetIntentsByGroupIdQuery,
  useLazyGetIntentGroupsQuery,
  useLazyGetIntentQuestionsQuery,
} = chatApi;
