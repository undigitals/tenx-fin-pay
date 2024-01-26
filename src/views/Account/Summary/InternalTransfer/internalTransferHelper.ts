import { IPartyAcctRelRecItem, IAccountItem } from 'store/user/accounts/accounts.types';

export const getIconName = (account: IPartyAcctRelRecItem) => {
  switch (account?.partyAcctRelKeys?.acctKeys?.tenxAccountType) {
    case 'Cash':
      return 'cash';
    case 'Save':
      return 'goal';
    case 'Stuff':
      return 'stash';
    default:
      return 'cash';
  }
};

export const getAccountName = (account: IPartyAcctRelRecItem) => {
  switch (account.partyAcctRelKeys?.acctKeys?.tenxAccountType) {
    case 'Cash':
      return account?.partyAcctRelKeys?.acctKeys?.owner ? 'Primary Cash Account' : 'Joint Cash Account';
    case 'Save':
      return account?.partyAcctRelKeys?.acctKeys?.owner ? 'Primary Goals Account' : 'Joint Goals Account';
    case 'Stuff':
      return account?.partyAcctRelKeys?.acctKeys?.owner ? 'Primary Needs Account' : 'Joint Needs Account';
    default:
      return 'Cash Account';
  }
};

export const getFiservBalance = (fiservAccountData: IPartyAcctRelRecItem[], accountId: string) => {
  const fiservAccount = fiservAccountData?.find((account) => account.partyAcctRelKeys.acctKeys.acctId === accountId);
  if (fiservAccount) {
    return fiservAccount.partyAcctRelInfo.acctRef.acctSummInfo?.acctBal?.find(({ balType }) => balType === 'Avail')?.curAmt.amt ?? 0;
  }

  return undefined;
};

export const getAccountNameByAuth = (account: IAccountItem) => {
  switch (account.type) {
    case 'Cash':
      return account.owner ? 'Primary Cash Account' : 'Joint Cash Account';
    case 'Save':
      return account.owner ? 'Primary Goals Account' : 'Joint Goals Account';
    case 'Stuff':
      return account.owner ? 'Primary Needs Account' : 'Joint Needs Account';
    default:
      return 'Cash Account';
  }
};
