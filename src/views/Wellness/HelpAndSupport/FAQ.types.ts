import { IGetIntentGroupsByIdResponse, IIntentGroupItem } from 'store/chat/chat.types';

export type TFAQCategory = IIntentGroupItem & IGetIntentGroupsByIdResponse;
export interface IFAQQuestion {
  questionText: string;
  answerText: string;
  intentName: string;
  groupId?: string;
}
