export interface ICurAmt {
  amt: number;
}

export interface IAcctBalItem {
  balType: string;
  curAmt: ICurAmt;
}

export enum EAccountType {
  CASH = 'Cash',
  STUFF = 'Stuff',
  SAVE = 'Save',
}

export interface IAddAccountRequest {
  type?: EAccountType;
  tenxAccountType?: EAccountType;
  nickname?: string;
  jointInviteType?: string;
}

export interface IAddAccountResponse {}

export type IGetAccountTransactionsRequest = {
  accountId: string;
  accountType: string;
  dateTo: string;
  dateFrom: string;
};

export type IGetAccountTransactionsResponse = {
  acctTrnRec: IAcctTrnRecItem[];
};

export interface IAcctSummInfo {
  acctBal: IAcctBalItem[];
  acctDtlStatus: string;
  acctMajorType: string;
  desc: string;
  employeeInd: boolean;
  openDt: string;
  rate: number;
  restrictedInd: boolean;
}

export interface IAcctRef {
  acctSummInfo: IAcctSummInfo;
}

export interface IPartyAcctRelDataItem {
  partyAcctRelDesc: string;
  partyAcctRealType: string;
}

export interface IPartyAcctRelInfo {
  acctRef: IAcctRef;
  acctRelClass: string;
  nickname: string;
  ownerInd: boolean;
  partyAcctRelData: IPartyAcctRelDataItem[];
  primaryOwnerInd: boolean;
  taxReportingOwnerInd: boolean;
}

export interface IAcctKeys {
  acctId: string;
  acctType: string;
  owner: boolean;
  ownerId: string;
  tenxAccountId: string;
  tenxAccountType: string;
  debitCardNumber: string | null;
}

export interface IPartyKeys {
  partyId: string;
}

export interface IPartyAcctRelKeys {
  acctKeys: IAcctKeys;
  partyKeys: IPartyKeys;
}

export interface IPartyAcctRelStatus {
  effDt: string;
  partyAcctRelStatusCode: string;
}

export interface IAccountItem {
  accountId: string;
  balance: number;
  fiservAccountId: string;
  owner: boolean;
  ownerId: string;
  type: string;
  debitCardNumber?: string | null;
}

export interface IPartyAcctRelRecItem {
  partyAcctRelInfo: IPartyAcctRelInfo;
  partyAcctRelKeys: IPartyAcctRelKeys;
  partyAcctRelStatus: IPartyAcctRelStatus;
}

export interface IRecCtrlOut {
  sentRecCount: number;
}

export interface IStatus {
  severity: string;
  statusCode: string;
  statusDesc: string;
  svcProviderName: string;
}

export interface ISubAccountsItem {
  fiservAccountId: string;
  id: string;
  isActive: boolean;
  parentAccountId: string | null;
  userId: string;
}

export interface IFiservAccounts {
  partyAcctRelRec: IPartyAcctRelRecItem[];
  recCtrlOut: IRecCtrlOut;
  status: IStatus;
}

export interface IGetAccountsResponse {
  account: null;
  fiservAccounts: IFiservAccounts;
  subAccounts: ISubAccountsItem[];
}

// TODO: Update according to the api
export interface ISelectedAccount {
  id: string;
  title: string;
  description: string;
}

export type TAddAccountType = 'needs' | 'goals';

export interface IInitialAccountsState {
  fiservAccountsData: IFiservAccounts;
  recentTransactions: IAcctTrnRecItem[];
  immediatePayFrameUrl: string;
  lastTransactionFromAccount: string;
  lastTransactionToAccount: string;
  lastTransactionAmount: string;
  lastTransactionDate: string;
  lastTransactionNote: string;
  walletAccounts: IWalletAccount[];
  thirdPartyData: IThirdParty[];
  cashAccountId: string;
  addAccountType: TAddAccountType;
  selectedAccountInformation: IAccountItem;
  pennyJarDestinationAccount: IAccountItem;
  pennyJarDestinationAccounts: IAccountItem[];
  summaryTopAccount: IAccountItem | null;
}

export interface ICurCode {
  curCodeType: string;
  curCodeValue: string;
}

export interface IStmtRunningBalItem {
  amt: number;
  curCode: ICurCode;
  stmtRunningBalType: string;
}

export interface ITrnAmt {
  amt: number;
  curCode: ICurCode;
}

export interface IAcctTrnInfo {
  cspRefIdent: string;
  desc: string[];
  drCrType: string;
  effDt: string;
  memoPostInd: boolean;
  postedDt: string;
  restrictedInd: boolean;
  stmtRunningBal: IStmtRunningBalItem[];
  tellerIdent: string;
  trnAmt: ITrnAmt;
  trnCode: string;
  trnDt: string;
}

export interface IAcctKeysTrn {
  acctId: string;
  acctType: string;
}

export interface IAcctTrnKeys {
  acctKeys: IAcctKeysTrn;
  acctTrnIndent: string;
}

export interface IAcctTrnStatus {
  acctTrnStatusCode: string;
  effDt: string;
}

export interface IAcctTrnRecItem {
  acctTrnInfo: IAcctTrnInfo;
  acctTrnKeys: IAcctTrnKeys;
  acctTrnStatus: IAcctTrnStatus;
}

export interface ISetLastTransactionData {
  lastTransactionFromAccount: string;
  lastTransactionToAccount: string;
  lastTransactionAmount: string;
  lastTransactionDate: string;
  lastTransactionNote: string;
}

export interface WalletAccountAdditionalData {}

export interface WalletAccountDetails {
  additionalData: WalletAccountAdditionalData;
  availability: string;
  bankName: string;
  currency?: any;
  expirationDate: string;
  iban?: any;
  number: string;
  route: string;
  styleId: number;
  type: string;
}

export interface IWalletAccount {
  accountDetails: WalletAccountDetails;
  accountType: string;
  accountTypeDetails: string;
  alias: string;
  balance?: any;
  details: string;
  failedAttemptsCount: number;
  id: number;
  modifiedDateTime: Date;
  name: string;
  primaryAccount: boolean;
  proxyNumber?: any;
  status: string;
}

export interface IThirdParty {
  accountId: string;
  dateCreated: string;
  externalDisplayAccountName: string;
  externalDisplayAccountNumber?: string;
  externalExpirationDate?: string;
  id: string;
  ownerAddress1?: string;
  ownerCity?: string;
  ownerState?: string;
  ownerZip?: string;
  thirdPartyAccountId?: string;
  thirdPartyAccountSubType?: string;
  thirdPartyAccountType?: string;
  thirdPartyDetails?: string;
  thirdPartyProvider?: string;
  thirdPartySessionID?: string;
  userId: string;
  issuingNetwork?: string;
}

export interface IRoundUp {
  accountId: string;
  amount: number;
}

export interface IFeatureItem {
  isEnabled: boolean;
  roundUp: IRoundUp;
  type: string;
}

export interface IValidateRequest {
  bankName: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
  first: string;
  last: string;
  middle?: string;
}

export interface IInviteRequest {
  inviteId?: string;
}

export interface IInviteHolderRequest {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  isPrimaryOwner?: boolean;
}
