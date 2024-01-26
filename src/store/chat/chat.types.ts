export type TLocation = {
  x: string;
  y: string;
};

export interface MobileLocationResponse {
  x: string;
  y: string;
}

export interface ISuggestedAction {
  type: string;
  title: string;
  text: string;
  value: string;
}

export interface IMessage extends IActivity {
  timestamp: string;
  contentType: MessageTypes;
  hasSuggestion?: boolean;
  isIntent?: boolean;
  isActionResponse?: boolean;
  intentId?: string;
  origin: TMessageOriginTypes;
  onSelect?: Function;
  selected?: boolean;
  isCorrectAnswer?: boolean;
  fromBot?: boolean | undefined;
  isIntro?: boolean;
  isFromUser?: boolean;
}

export interface IActivity {
  type: string;
  id: string;
  timestamp: string;
  serviceUrl: string;
  channelId: string;
  entities: IMessageEntity[];
  from: IActivityFrom;
  conversation: IActivityConversation;
  suggestedActions?: { actions: ISuggestedAction[] };
  recipient: IRecipient;
  locale: string;
  text: string;
}

export interface IMessageObject {
  id: string;
  fromUserId: string;
  text: string;
  entities: IMessageEntity[];
  authToken: string;
  otpToken: string;
  type?: MessageTypes;
}

export interface IActivityFrom {
  id: string;
  name: string;
}

export interface IActivityConversation {
  id: string;
}

export interface IRecipient {
  id: string;
  name: string;
}

export interface IIntent {
  id: string;
  intentName: string;
  correctAnswerText: string;
  tags: string;
}

export interface IIntentQuestion {
  id: string;
  intentId: string;
  questionText: string;
  answer: string;
}

export enum MessageTypes {
  TYPING = 'TYPING',
  MESSAGE = 'MESSAGE',
  VOICE = 'VOICE',
  SYSTEM = 'SYSTEM',
}

type TMessageEntityTypes = 'MessageSource' | 'GeoCoordinates' | 'IntentTestSessionEntity' | 'IsIntentTestSession' | 'MessageIdEntity' | 'Typing' | 'Ping';

export interface IMessageEntity {
  type: TMessageEntityTypes;
  [key: string]: any;
}

export type TMessageOriginTypes = 'OUTBOX' | 'INBOX';

export interface IIntentItem {
  groupId?: string;
  correctAnswerText: string;
  id: string;
  intentName: string;
  tags: string;
}

export interface IIntentGroupItem {
  description: string | null;
  id: string;
  name: string;
  sortOrder: number;
  tags: string;
}

export interface IGetIntentGroupsByIdResponse {
  description: string | null;
  id: string;
  intents: IIntentItem[];
  name: string;
  tags: string;
}

export interface IQuestionItem {
  id: string;
  intentId: string;
  questionText: string;
}
