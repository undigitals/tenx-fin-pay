import { IAccountItem } from 'store/user/accounts/accounts.types';

// API
export interface ILoginResponse {
  token: string;
  refreshToken: string;
  environment: string;
  client: any;
  isEmailVerified: boolean;
  otpSeed: string;
  isEmailVerifiedOrAbsent: boolean | null;
  thirdPartyIds: IThirdPartyIds;
  systemProperties: ISystemProperties;
  cardHubSsoPayload: string;
  deviceId?: string;
  policies: IPolicies;
  cardHubSsoData: ICardHubSsoData;
}

export interface GenerateCodeResposnse {
  transactionId: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  fingerprint: any;
  deviceId?: string;
}

export interface IForgotPasswordRequest {
  username: string;
  fingerprint: string;
}

export interface IForgotUsernameRequest {
  email?: string;
  phone?: string;
}

export interface IForgotPasswordGenerateCodeRequest {
  fingerprint: string;
  transactionId: string;
  codeDelivery: string;
}

export interface IForgotPasswordCheckCodeRequest {
  fingerprint: string;
  transactionId: string;
  code: string;
}

export interface IEmailGenerateCodeRequest {
  email: string;
}

export interface IEmailCheckCodeRequest {
  transactionId: string;
  code: string;
  dontUpdateDb?: boolean;
}

export interface IOtpSeedRequest {
  username: string;
  password: string;
  fingerprint: string;
  deviceType: string;
}

export interface IOtpSeedResponse {
  transactionId: string;
  maskedPhone?: string;
  maskedEmail?: string;
}

export interface IOtpSeedGenerateCodeRequest {
  transactionId: string;
  codeDelivery: string;
}

export interface IOtpSeedFinishRequest {
  transactionId: string;
  code: string;
  type?: string;
  name?: string;
  manufacture?: string;
  os?: string;
  version?: string;
  userAgent?: string;
}

export interface ValidateToken {
  token: string;
}

export interface IUserConsent {
  accepted: boolean;
  id: string;
  name: string;
  text: string;
}

export interface IUSerConsents {
  [key: string]: IUserConsent[];
}

// STATE
export interface IUserInfo {
  userId?: string;
  address1?: string;
  address2?: string;
  city?: string;
  county?: string;
  stateProvince?: string;
  postalCode?: string;
  countryCode?: string;
  primaryPhone?: string;
  mobilePhone?: string;
  preferredName?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthday?: string;
  email?: string;
  isNotifyByEmail?: true;
  isNotifyByPush?: true;
  isNotifyBySms?: true;
  channelPartnerId?: string;
  systemProfileId?: string;
  isEmailVerified?: boolean;
  accounts?: IAccountItem[];
  username?: string;
  primarySourceOfIncome?: string;
  annualHouseholdIncome?: string;
  employmentStatus?: string;
  militaryStatus?: string;
  employerName?: string;
  suffix?: string;
  isDocumentRequestPending?: boolean;
  fiservStatus?: string;
  policies?: IPolicies;
  isMailingAddressTheSame?: boolean;
  mailingAddress1?: string;
  mailingAddress2?: string;
  mailingCity?: string;
  mailingCounty?: string;
  mailingStateProvince?: string;
  mailingPostalCode?: string;
  mailingCountryCode?: string;
}

export interface IUIPreferences {
  isTenxPayCollapsed?: boolean;
  isMyAccountCollapsed?: boolean;
  isPennyJarDismissed?: boolean;
}

export interface IThirdPartyIds {
  Attune?: string;
  Zogo?: string;
  CardHub?: string;
  Immediate?: string;
  Fiserv?: string;
}

export interface ISystemProperties {
  attuneQuizId?: string;
  environment?: string;
  idleTimeout?: string;
  sessionLock?: string;
  postLoginURL?: string;
  postRegisterURL?: string;
  routingNumber?: string;
  supportPhoneNumber?: string;
}

export enum EKycPartStatus {
  MATCH = 'Match',
  NO_MATCH = 'Nomatch',
  PENDING = 'Pending',
}

export interface IKYCData {
  status?: boolean;
  piiStatus?: boolean;
  lastPiiStatus?: EKycPartStatus;
  documentStatus?: boolean;
  documentAttempts: number;
  piiAttempts: number;
  lastDocumentStatus?: EKycPartStatus;
  isRequestedDocumentUploaded?: boolean;
  isDocumentRequestPending?: boolean;
}

export interface AuthenticationState {
  user?: IUserInfo;
  token: string | null;
  refreshToken: string | null;
  userMobileNumber: string | null;
  zogoUserId?: string;
  attuneUserId?: string;
  attuneQuizId?: string;
  immediateId?: string;
  thirdPartyIds?: IThirdPartyIds | null;
  systemProperties: ISystemProperties;
  otpSeed: string | null;
  consents: IUSerConsents | null;
  transactionId: string | null;
  isEmailVerifiedOrAbsent: boolean | null;
  language: 'en' | 'es';
  cardHubSsoPayload: string;
  truliooToken: string | null;
  deviceVerifyTransactionId?: string;
  biometryType?: string;
  biometryState?: boolean;
  policies: IPolicies | null;
  changePhoneTransactionId: string;
  estatementIframeUrl?: string;
  KYCData: IKYCData;
  redirectUrl?: string;
  isProspectOnly: boolean;
  shouldRemember?: boolean;
  UIPreferences: IUIPreferences;
  cardHubSsoData: ICardHubSsoData;
}

export interface ICardHubSsoData {
  baseUrl?: string;
  fiToken?: string;
  appToken?: string;
  isSandbox?: boolean;
}

export interface IUpdateUserDataRequestData {
  username?: string;
  email?: string;
  systemProfileId?: string;
  validationStatus?: 'string';
  firstName?: string;
  lastName?: string;
  middleName?: string;
  suffix?: string;
  preferredName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  county?: string;
  stateProvince?: string;
  postalCode?: string;
  countryCode?: string;
  primaryPhone?: string;
  mobilePhone?: string;
  birthday?: Date | string;
  gender?: string;
  photo?: string;
  tin?: string;
  ssn?: string;
  question1Id?: string;
  question1Answer?: string;
  question2Id?: string;
  question2Answer?: string;
  question3Id?: string;
  question3Answer?: string;
}

export interface IUpdateUserDataRequest {
  id: string;
  data: IUpdateUserDataRequestData;
}

export interface IPolicies {
  DisableChecksumHeaderCheck: boolean;
  IntentsTestingEnabled: boolean;
  PennyJarEnabled: boolean;
  ExternalTransferEnabled: boolean;
  ExternalDebitCardTransferEnabled: boolean;
  ExternalACHTransferEnabled: boolean;
  ExternalTransferSendEnabled: boolean;
  CashCushionEnabled: boolean;
  ChatEnabled: boolean;
  CheckCashingEnabled: boolean;
  SpanishEnabled: boolean;
  JointAccountEnabled: boolean;
  TruvEnabled: boolean;
  Docv2Enabled?: boolean;
  BillPayEnabled?: boolean;
  AccountOpeningEnabled?: boolean;
  ATMLocationEnabled?: boolean;
  EnableNewAttuneAPI?: boolean;
  NotificationsEnabled?: boolean;
  PushNotificationsEnabled?: boolean;
  UseZendeskChat: boolean;
  AccountClosingEnabled: boolean;
}
