import { EKycFlowStatusType } from 'utils/hooks/useKYC';

export type TAccountOpeningStepStatus = 'done' | 'failed' | undefined;

export interface UserInfoData {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  suffix?: string;
  address?: string;
  address2?: string;
  dateOfBirth?: string;
  city?: string;
  apt?: string;
  stateProvince?: string;
  zipCode?: string;
  completed?: boolean;
  email?: string;
  username?: string;
  taxId?: string;
  taxIdType?: string;
  myDetailsStatus: EKycFlowStatusType;
  mailingAddress1?: string;
  mailingAddress2?: string;
  mailingCity?: string;
  mailingState?: string;
  mailingPostalCode?: string;
  isMailingAddressTheSame: boolean;
  currentUrl?: string;
}

export interface GetUserInfoResponse {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  First: string;
  Middle: string;
  Last: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  completed: boolean;
  username: string;
  email: string;
  id: string;
  myDetailsStatus: EKycFlowStatusType;
  idType: 'SocialService' | 'TaxIDNumber';
  currentUrl: string;
  isMailingAddressTheSame: boolean;
}

export interface UserInfo {
  dateOfBirth?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  email?: string;
  username?: string;
  completed?: boolean;
  taxId?: string;
  taxIdType?: string;
  myInfoVerificationStatus?: TAccountOpeningStepStatus;
  myDetailsStatus?: TAccountOpeningStepStatus;
  myIdStatus?: TAccountOpeningStepStatus;
  myInfoVerificationFailedCount?: number;
  currentUrl?: string;
  annualHouseholdIncome?: string;
  employerName?: string;
  employmentStatus?: string;
  militaryStatus?: string;
  primarySourceOfIncome?: string;
  isMailingAddressTheSame?: boolean;
  mailingAddress1?: string;
  mailingAddress2?: string;
  mailingCity?: string;
  mailingState?: string;
  mailingPostalCode?: string;
  stateProvince?: string;
  zipCode?: string;
}

export interface SetUserInfoRequest extends UserInfo {
  userId?: string;
}

export interface IPaymentsInfoResponse {
  alreadyTransferred: number;
  available: number;
  availableAdjustments: number;
  earned: number;
  hoursLastUpdatedOn: string;
  limits: {
    availablePayPeriodTransactionsCount: number;
    availableTransactionsCount: number;
    maxDayAvailableTransactionsCount: number;
    maxPayPeriodTransactionsCount: number;
    max: number;
    min: number;
  };
  payPeriod: {
    checkDate: string;
    endDate: string;
    startDate: string;
    submitByDate: string;
  };
  totalAdjustments: number;
}

export interface IAdditionalData {
  networkID: string;
  networkRC: string;
  ofacMatchCodes: string;
  referenceId: string;
  status: string;
}

export interface ITenxPayHistoryItem {
  account: string;
  accountType: string;
  additionalData: IAdditionalData;
  alias: string;
  amount: number;
  dateTime: string;
  owned: boolean;
  planned: boolean;
  status: string;
  type: string;
  uuid: string;
  fee?: number;
}

export interface ITimeEntriesItem {
  earned: number;
  externalId: string;
  intervals: string;
  modifiedDateTime: string;
  rateAmount: number;
  rateType: string;
  sourceType: string;
  userId: number;
  workDate: string;
  workedSeconds: number;
}
