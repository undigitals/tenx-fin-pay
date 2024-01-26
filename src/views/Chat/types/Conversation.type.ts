export interface IConversation {
  conversationId: string;
  error: string | null;
  expires_In: number;
  referenceGrammarId: string;
  streamUrl: string;
  token: string;
}
