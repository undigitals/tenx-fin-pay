export interface IGetPaymentsInfoResponse {
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

export interface IPaymentsInfo {
  availableToTransfer?: number;
  earnedThisCycle?: number;
  earnCicleStartDate?: string;
  earnCicleEndDate?: string;
  submitByDate?: string;
  transferredAmount: number;
  transfersAvailable?: number;
  maxTransfersPerDay?: number;
  availableTransfers?: number;
  availableMax?: number;
  availableMin?: number;
  maxPayPeriodTransactionsCount?: number;
  availableNow: number;
  remainingAmount?: number;
}

interface IAccountDetails {
  additionalData: any;
  availability: any;
  bankName: string;
  currency: any;
  expirationDate: any;
  iban: any;
  number: string;
  route: string;
  styleId: number;
  type: string;
}

export interface IAccount {
  accountDetails: IAccountDetails;
  accountType: string;
  accountTypeDetails: string;
  alias: string;
  balance: any;
  details: string;
  failedAttemptsCount: number;
  id: number;
  modifiedDateTime: string;
  name: string;
  primaryAccount: boolean;
  proxyNumber: any;
  status: string;
}
