import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAcceptConsentMutation, useLazyGetConsentsByFlowNameQuery } from 'store/user/consents/consents.api';
import { selectConsentsData, setIsConsentAccepted } from 'store/user/consents/consents.slice';
import { IConsentHelper, IConsentsStatus, IConsentsStatusData } from 'store/user/consents/consents.types';

const getResultData = (mutationResult: IConsentsStatus) => {
  const { isSuccess, isError, isLoading, error } = mutationResult;
  const resultData: IConsentsStatusData = {
    isSuccess,
    isLoading,
    isError,
  };

  const errorData = error?.data;

  if (errorData?.error) {
    resultData.errorMessage = errorData?.error;
  }

  if (errorData?.Error) {
    resultData.errorMessage = errorData?.Error;
  }

  return resultData;
};

export const useConsents = (flowName?: string) => {
  const dispatch = useDispatch();
  const consentsData = useSelector(selectConsentsData);
  const [getConsentByFlowName, getConsentByFlowNameResult] = useLazyGetConsentsByFlowNameQuery();
  const [acceptConsent, acceptConsentResult] = useAcceptConsentMutation();

  useEffect(() => {
    if (flowName) {
      getConsentByFlowName(flowName);
    }
  }, [flowName]);

  return useMemo(() => {
    const helper: IConsentHelper = {};

    helper.consentsData = flowName !== undefined ? consentsData?.[flowName] : undefined;

    helper.getConsentByFlowName = () => {
      if (flowName) {
        getConsentByFlowName(flowName);
      }
    };
    helper.getConsentByFlowNameResult = getResultData(getConsentByFlowNameResult as IConsentsStatus);

    helper.acceptConsent = (consentId: string, _flowName: string) => {
      acceptConsent(consentId).then(() => {
        dispatch(setIsConsentAccepted({ isAccepted: true, id: consentId, flowName: _flowName }));
      });
    };
    helper.acceptConsentResult = getResultData(acceptConsentResult as IConsentsStatus);

    return helper;
  }, [consentsData, getConsentByFlowNameResult, acceptConsentResult]);
};
