import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IPartyAcctRelRecItem } from 'store/user/accounts/accounts.types';
import { useGetAccountsQuery } from 'store/user/accounts/accounts.api';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';

const prepareAccounts = (rawAccounts: IPartyAcctRelRecItem[]) =>
  rawAccounts.map((accData) => ({
    type: accData.partyAcctRelKeys?.acctKeys?.tenxAccountType ?? '',
    accountId: accData.partyAcctRelKeys?.acctKeys?.tenxAccountId ?? '',
    fiservAccountId: accData.partyAcctRelKeys?.acctKeys?.acctId ?? '',
    balance: accData.partyAcctRelInfo.acctRef.acctSummInfo.acctBal.find(({ balType }) => balType === 'Avail')?.curAmt.amt ?? 0,
    owner: accData.partyAcctRelKeys?.acctKeys?.owner ?? '',
    ownerId: accData.partyAcctRelKeys?.acctKeys?.ownerId ?? '',
    debitCardNumber: accData.partyAcctRelKeys?.acctKeys?.debitCardNumber ?? '',
  }));

export const useAccounts = () => {
  const { refetch, isFetching, isLoading } = useGetAccountsQuery();
  const { fiservAccountsData } = useSelector(selectAccountsData);
  const allAccounts = useMemo(() => prepareAccounts(fiservAccountsData?.partyAcctRelRec), [fiservAccountsData]);
  const cashAccounts = useMemo(() => allAccounts.filter((account) => account.type === 'Cash'), [allAccounts]);

  return {
    isLoading: isLoading || isFetching,
    refetch,
    allAccounts,
    cashAccounts,
  };
};
