import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { authenticationApi } from 'store/user/authentication.api';
import { paymentsApi } from './payments.api';
import { IGetPaymentsInfoResponse, IAccount, IPaymentsInfo } from './payments.types';

interface IPaymentState {
  paymentsInfo: IPaymentsInfo;
  accounts: IAccount[];
  selectedAccount: number | null;
  accountId: number | string;
  additionalData: any;
  amountSelected: number | string;
  amountToTransfer: number | string;
  estimatedDate: string;
  checkDate: string;
  checkSum: string;
  deliveryPeriod: string;
  fee: number | string;
  feePayer: string;
  holiday: any;
  paymentType: string;
  pushUserId: any;
  hasError: boolean;
  errorMessage: string;
  paymentSucceed: boolean;
  uuid: string;
}

export const initialPaymentsInfo: IPaymentsInfo = {
  availableToTransfer: 0,
  earnedThisCycle: 0,
  availableMax: 0,
  availableMin: 0,
  earnCicleStartDate: '',
  earnCicleEndDate: '',
  submitByDate: '',
  transferredAmount: 0,
  transfersAvailable: 0,
  maxTransfersPerDay: 0,
  availableTransfers: 0,
  maxPayPeriodTransactionsCount: 0,
  availableNow: 0,
  remainingAmount: 0,
};

export const initialPaymentsState: IPaymentState = {
  paymentsInfo: initialPaymentsInfo,
  accounts: [],
  selectedAccount: null,
  accountId: '',
  additionalData: {},
  amountSelected: '',
  amountToTransfer: '',
  estimatedDate: '',
  checkDate: '',
  checkSum: '',
  deliveryPeriod: '',
  fee: 3,
  feePayer: '',
  holiday: null,
  paymentType: '',
  pushUserId: null,
  hasError: false,
  errorMessage: '',
  paymentSucceed: false,
  uuid: '',
};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: initialPaymentsState,
  reducers: {
    setSelectedAccount: (state, { payload }) => {
      state.selectedAccount = payload;
    },
    clearPaymentStatus: (state) => {
      state.hasError = false;
      state.paymentSucceed = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(paymentsApi.endpoints.getPaymentsInfo.matchFulfilled, (state, { payload }: PayloadAction<IGetPaymentsInfoResponse>) => {
      let availableNow;

      if (payload.limits.availableTransactionsCount <= 0) {
        availableNow = 0;
      } else if (payload.available > payload.limits.max) {
        availableNow = payload.limits.max;
      } else if (payload.available <= payload.limits.max && payload.available >= payload.limits.min) {
        availableNow = payload.available;
      } else {
        availableNow = 0;
      }

      state.paymentsInfo = {
        ...state.paymentsInfo,
        availableNow,
        availableToTransfer: payload.available,
        earnedThisCycle: payload.earned,
        earnCicleStartDate: payload.payPeriod.startDate,
        earnCicleEndDate: payload.payPeriod.endDate,
        submitByDate: payload.payPeriod.submitByDate,
        transferredAmount: payload.alreadyTransferred,
        transfersAvailable: payload.limits.availablePayPeriodTransactionsCount,
        maxTransfersPerDay: payload.limits.maxDayAvailableTransactionsCount,
        availableTransfers: payload.limits.availableTransactionsCount,
        availableMax: payload.limits.max,
        availableMin: payload.limits.min,
        maxPayPeriodTransactionsCount: payload.limits.maxPayPeriodTransactionsCount,
        remainingAmount: payload.available - availableNow,
      };
    });
    builder.addMatcher(paymentsApi.endpoints.getPaymentAccounts.matchFulfilled, (state, { payload }) => {
      state.accounts = payload.accounts;
      state.selectedAccount = payload.accounts[0].id;
    });
    builder.addMatcher(paymentsApi.endpoints.preparePayment.matchFulfilled, (state, { payload }) => {
      state.accountId = payload.accountId;
      state.additionalData = payload.additionalData;
      state.amountSelected = payload.amountSelected;
      state.amountToTransfer = payload.amountToTransfer;
      state.checkDate = payload.checkDate;
      state.checkSum = payload.checkSum;
      state.deliveryPeriod = payload.deliveryPeriod;
      state.estimatedDate = payload.estimatedDate;
      state.fee = payload.fee;
      state.feePayer = payload.feePayer;
      state.holiday = payload.holiday;
      state.paymentType = payload.paymentType;
      state.pushUserId = payload.pushUserId;
      state.uuid = payload.uuid;
    });
    builder.addMatcher(paymentsApi.endpoints.requestPayment.matchFulfilled, (state) => {
      state.hasError = false;
      state.paymentSucceed = true;
    });
    builder.addMatcher(paymentsApi.endpoints.requestPayment.matchRejected, (state) => {
      state.hasError = true;
      state.paymentSucceed = false;
      // TODO: replace with error from payload
      state.errorMessage = 'Something went wrong...';
    });
    builder.addMatcher(authenticationApi.endpoints.logout.matchFulfilled, () => initialPaymentsState);
  },
});

export const selectPaymentsAccountsData = (state: RootState) => state.payments;
export const selectPayementsInfo = createSelector(selectPaymentsAccountsData, (state) => state?.paymentsInfo);

export const { setSelectedAccount, clearPaymentStatus } = paymentsSlice.actions;
