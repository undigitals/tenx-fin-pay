import { useCallback, useMemo } from 'react';
import { selectKycStatus } from 'store/user/authentication.slice';
import { usersApi, useGetKycStatusQuery } from 'store/user/users.api';
import { useSelector } from 'react-redux';
import { EKycPartStatus } from 'vars/types/authentication.types';
import { useAppDispatch } from './store';

const MAX_ATTEMPTS = 3;

export enum EKycFlowStatusType {
  IN_PROGRESS = 'inProgress',
  NOT_STARTED = 'notStarted',
  FAILED = 'failed',
  DONE = 'done',
  UNKNOWN = 'unknown',
}

export const useKYC = () => {
  const kycStatusQuery = useGetKycStatusQuery();
  const dispatch = useAppDispatch();
  const { piiStatus, piiAttempts, documentStatus, documentAttempts, status, lastDocumentStatus, lastPiiStatus, isRequestedDocumentUploaded, isDocumentRequestPending } = useSelector(selectKycStatus);

  const invalidateKycData = useCallback(() => dispatch(usersApi.util.invalidateTags(['Kyc'])), [dispatch]);

  return useMemo(() => {
    const isPiiPending = lastPiiStatus === EKycPartStatus.PENDING && piiAttempts <= MAX_ATTEMPTS;
    const isPiiFailed = !piiStatus && !isPiiPending && piiAttempts >= MAX_ATTEMPTS;
    const isPiiInProgress = !isPiiPending && !piiStatus && piiAttempts > 0 && piiAttempts < MAX_ATTEMPTS;
    const isPiiNotStarted = !piiStatus && piiAttempts === 0;
    const piiFlowStatus =
      (piiStatus && EKycFlowStatusType.DONE) ||
      (isPiiFailed && EKycFlowStatusType.FAILED) ||
      (isPiiInProgress && EKycFlowStatusType.IN_PROGRESS) ||
      (isPiiNotStarted && EKycFlowStatusType.NOT_STARTED) ||
      EKycFlowStatusType.UNKNOWN;

    const isDocumentPending = lastDocumentStatus === EKycPartStatus.PENDING && documentAttempts <= MAX_ATTEMPTS;
    const isDocumentFailed = !documentStatus && !isDocumentPending && documentAttempts >= MAX_ATTEMPTS;
    const isDocumentInProgress = !isDocumentPending && !documentStatus && documentAttempts > 0 && documentAttempts < MAX_ATTEMPTS;
    const isDocumentNotStarted = !documentStatus && documentAttempts === 0;
    const documentFlowStatus =
      (documentStatus && EKycFlowStatusType.DONE) ||
      (isDocumentFailed && EKycFlowStatusType.FAILED) ||
      (isDocumentInProgress && EKycFlowStatusType.IN_PROGRESS) ||
      (isDocumentNotStarted && EKycFlowStatusType.NOT_STARTED) ||
      EKycFlowStatusType.UNKNOWN;

    return {
      refetchKYC: kycStatusQuery.refetch,
      isLoading: kycStatusQuery.isLoading,
      isFetching: kycStatusQuery.isFetching,
      KYCStatus: status,
      invalidateKycData,
      // Personal information submission data
      pii: {
        status: piiStatus,
        lastStatus: lastPiiStatus,
        flowStatus: piiFlowStatus,
        attemptsCount: piiAttempts,
        attemptsLeft: MAX_ATTEMPTS - piiAttempts,
        isNotStarted: isPiiNotStarted,
        isTouched: piiAttempts > 0,
        isPending: isPiiPending,
        isInProgress: isPiiInProgress,
        isFailed: isPiiFailed,
      },
      document: {
        status: documentStatus,
        lastStatus: lastDocumentStatus,
        flowStatus: documentFlowStatus,
        attemptsCount: documentAttempts,
        attemptsLeft: MAX_ATTEMPTS - documentAttempts,
        isNotStarted: isDocumentNotStarted,
        isTouched: documentAttempts > 0,
        isPending: isDocumentPending,
        isInProgress: isDocumentInProgress,
        isFailed: isDocumentFailed,
        requestedUploaded: isRequestedDocumentUploaded,
        isRequestForDocumentsPending: isDocumentRequestPending,
      },
    };
  }, [
    piiStatus,
    piiAttempts,
    documentStatus,
    lastDocumentStatus,
    lastPiiStatus,
    documentAttempts,
    status,
    isRequestedDocumentUploaded,
    isDocumentRequestPending,
    kycStatusQuery.isLoading,
    invalidateKycData,
  ]);
};
