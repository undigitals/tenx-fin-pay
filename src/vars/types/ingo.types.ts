export interface ITransferExternalAccountRequest {
  accountId?: string;
  externalAccount?: string;
  accountType?: string;
  amount: number;
  notes?: string[];
  transactionId?: string;
}

export interface IRiskSessionData {
  risk_session_token: string;
  org_id: string;
  web_session_id: string;
}

export interface IRiskSessionResponse {
  session: IRiskSessionData;
  ingoCollectorsvcUrl: string;
  ingoCollectorsvcAccountName: string;
}
