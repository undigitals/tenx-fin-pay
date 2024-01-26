import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPrivacyPolicyDisclosureQuery, useGetTermsOfUseDisclosureQuery } from 'store/api';
import { selectDisclosuresData, setPrivacyPolicy, setTermsOfUse } from 'store/user/disclosures/disclosures.slice';
import { IDisclosureHelper, IDisclosuresStatus, IDisclosuresStatusData } from 'vars/types/disclosures.type';

const getResultData = (mutationResult: IDisclosuresStatus) => {
  const { isSuccess, isError, isLoading, isFetching, error } = mutationResult;
  const resultData: IDisclosuresStatusData = {
    isSuccess,
    isLoading,
    isFetching,
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

export const useDisclosures = () => {
  const dispatch = useDispatch();
  const getPrivacyPolicyDisclosure = useGetPrivacyPolicyDisclosureQuery();
  const getTermsOfUseDisclosure = useGetTermsOfUseDisclosureQuery();
  const disclosuresData = useSelector(selectDisclosuresData);

  useEffect(() => {
    getPrivacyPolicyDisclosure.refetch();
    getTermsOfUseDisclosure.refetch();
  }, []);

  return useMemo(() => {
    const helper: IDisclosureHelper = {};
    const getPrivacyPolicyData = getPrivacyPolicyDisclosure?.data;
    const getTermsOfUseData = getTermsOfUseDisclosure?.data;
    helper.getPrivacyPolicyDisclosureResult = getResultData(getPrivacyPolicyDisclosure as IDisclosuresStatus);
    helper.getPrivacyPolicyDisclosure = getPrivacyPolicyData;

    helper.getTermsOfUseDisclosureResult = getResultData(getTermsOfUseDisclosure as IDisclosuresStatus);
    helper.getTermsOfUseDisclosure = getTermsOfUseData;

    helper.disclosuresData = disclosuresData;
    helper.setPrivacyPolicyStatus = (value: boolean) => dispatch(setPrivacyPolicy(value));
    helper.setTermsOfUseStatus = (value: boolean) => dispatch(setTermsOfUse(value));
    return helper;
  }, [disclosuresData, dispatch, getPrivacyPolicyDisclosure, getTermsOfUseDisclosure]);
};
