export interface ITenxPayProperty {
  availableToTransfer?: number;
  earnedThisCycle?: number;
  earnCicleStartDate?: string;
  earnCicleEndDate?: string;
  submitByDate?: string;
  transferredAmount?: number;
  transfersAvailable?: number;
  maxTransfersPerDay?: number;
  availableTransfers?: number;
  availableMax?: number;
  availableMin?: number;
  maxPayPeriodTransactionsCount?: number;
  availableNow?: number;
  remainingAmount?: number;
}
