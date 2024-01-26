import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectImmediateId } from 'store/user/authentication.slice';
import { useLazyGetPaymentsInfoQuery } from 'store/user/payments/payments.api';
import { selectPayementsInfo } from 'store/user/payments/payments.slice';

export const usePayments = (loadImmediately = true) => {
  const [getPaymentsInfoQuery, getPaymentsInfoQueryResult] = useLazyGetPaymentsInfoQuery();
  const paymentsInfo = useSelector(selectPayementsInfo);
  const ThirdPartyUser = useSelector(selectImmediateId);

  useEffect(() => {
    if (ThirdPartyUser && loadImmediately) {
      getPaymentsInfoQuery();
    }
  }, []);

  return {
    getPaymentsInfoQueryResult,
    paymentsInfo,
  };
};
