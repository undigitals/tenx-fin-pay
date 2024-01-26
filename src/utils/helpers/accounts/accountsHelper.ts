import i18next from 'i18next';
import { IAcctTrnRecItem, IPartyAcctRelRecItem, IAccountItem, IThirdParty } from 'store/user/accounts/accounts.types';

export const getMoneyOut = (transactions: IAcctTrnRecItem[]): number => {
  let totalMoneyOut = 0;

  transactions?.forEach((transaction: IAcctTrnRecItem) => {
    if (transaction?.acctTrnInfo?.drCrType === 'Debit') {
      totalMoneyOut += transaction?.acctTrnInfo?.trnAmt?.amt || 0;
    }
  });

  return totalMoneyOut > 0 ? -totalMoneyOut : 0;
};

export const getMoneyIn = (transactions: IAcctTrnRecItem[]): number => {
  let totalMoneyIn = 0;

  transactions?.forEach((transaction: IAcctTrnRecItem) => {
    if (transaction?.acctTrnInfo?.drCrType !== 'Debit') {
      totalMoneyIn += transaction?.acctTrnInfo?.trnAmt?.amt || 0;
    }
  });

  return totalMoneyIn;
};

export const getFiservAccountType = (allAccounts: IPartyAcctRelRecItem[], accountId: string) =>
  allAccounts?.find((item: IPartyAcctRelRecItem) => item?.partyAcctRelKeys?.acctKeys?.acctId === accountId)?.partyAcctRelKeys?.acctKeys?.acctType;

export const getAccountDescription = (allAccounts: IPartyAcctRelRecItem[], accountId: string) => {
  const accountDescription = allAccounts?.find((item: IPartyAcctRelRecItem) => item?.partyAcctRelKeys?.acctKeys?.acctId === accountId)?.partyAcctRelInfo?.acctRef?.acctSummInfo?.desc;

  return accountDescription || '';
};

const ACCOUNT_NICKNAME_MAP: IDictionary<string> = {
  Cash: 'Cash',
  Save: 'Goals',
  Stuff: 'Needs',
};

export const getMaskedAcctId = (account: IPartyAcctRelRecItem) => {
  const maskedAccountId = account.partyAcctRelKeys?.acctKeys?.acctId.slice(-4) ?? '0000';
  const accountNickName = account.partyAcctRelInfo?.nickname ?? ACCOUNT_NICKNAME_MAP[account.partyAcctRelKeys?.acctKeys?.tenxAccountType];

  return `${accountNickName} ${maskedAccountId}`;
};

export const getLastFourDigitsOfAccId = (allAccounts: IPartyAcctRelRecItem[], accountId?: string) =>
  allAccounts?.find((item) => item?.partyAcctRelKeys?.acctKeys?.acctId === accountId)?.partyAcctRelKeys?.acctKeys?.acctId.slice(-4) || '0000';

export const getThirdPatryAccountById = (items: IThirdParty[], id: string) => items?.find((item) => item?.id === id);

export const sortAccountsByType = (accounts: IPartyAcctRelRecItem[]) => {
  const typesOrder = ['Cash', 'Stuff', 'Save'];

  return accounts.sort((a, b) => {
    const typeA = typesOrder.indexOf(a.partyAcctRelKeys?.acctKeys?.tenxAccountType);
    const typeB = typesOrder.indexOf(b.partyAcctRelKeys?.acctKeys?.tenxAccountType);

    if (typeA < typeB) {
      return -1;
    }
    if (typeA > typeB) {
      return 1;
    }
    return 0;
  });
};

export const getAccountsSortedByTypeAndOwnership = (allAccounts?: IPartyAcctRelRecItem[]): IPartyAcctRelRecItem[] => {
  const accounts = allAccounts ? [...allAccounts] : [];

  // Get the ownerId of the accounts
  const ownerAccount = accounts.find((account) => !!account?.partyAcctRelKeys?.acctKeys?.owner);
  const ownerId = ownerAccount?.partyAcctRelKeys.acctKeys.ownerId || null;
  sortAccountsByType(accounts);

  // Group accounts by ownerId
  const groupedAccounts = accounts.reduce((accountsGroupedById: Record<string, IPartyAcctRelRecItem[]>, account) => {
    const accountId = account.partyAcctRelKeys.acctKeys.ownerId;
    if (accountId in accountsGroupedById) {
      accountsGroupedById[accountId].push(account);
    } else {
      // eslint-disable-next-line no-param-reassign
      accountsGroupedById[accountId] = [account];
    }
    return accountsGroupedById;
  }, {});

  // Get self and joint accounts
  const selfAccounts = ownerId ? groupedAccounts[ownerId] : [];
  const jointAccounts = Object.keys(groupedAccounts)
    .filter((id) => id !== ownerId)
    .flatMap((id) => groupedAccounts[id]);

  return [...selfAccounts, ...jointAccounts];
};

export const getSlicedAccountId = (fiservAccountId?: string) => `(${fiservAccountId?.slice(-4)})` || '';
export const getAvailableBalance = (partyAcctRelRec: IPartyAcctRelRecItem[], acctId: string) => {
  const selectedAccount = partyAcctRelRec.find((account) => account.partyAcctRelKeys.acctKeys.acctId === acctId);
  return selectedAccount?.partyAcctRelInfo?.acctRef?.acctSummInfo?.acctBal.find(({ balType }) => balType === 'Avail')?.curAmt.amt;
};

export const getAccountTitle = (language: string, account: IAccountItem, firstName?: string, preferredName?: string) => {
  if (language === 'en') {
    if (account.owner) {
      return preferredName ? `${preferredName}'s ${account.type} account ${getSlicedAccountId(account.fiservAccountId)}` : `${firstName}'s ${account.type} account`;
    }

    return `Joint ${getSlicedAccountId(account.fiservAccountId)}'s ${account.type} account`;
  }

  if (language === 'es') {
    if (account.owner) {
      return preferredName
        ? `Cuenta ${account.type} de ${preferredName} ${getSlicedAccountId(account.fiservAccountId)}`
        : `Cuenta ${account.type} de ${firstName} ${getSlicedAccountId(account.fiservAccountId)}`;
    }

    return `Cuenta conjunta ${getSlicedAccountId(account.fiservAccountId)}'s ${account.type}`;
  }

  return '';
};

export const getSaveStuffNames = (type: string) => (type === 'Stuff' ? i18next.t('explicitAccount.Needs') : i18next.t('explicitAccount.Goals'));

export const getSummaryTitle = (account: IAccountItem | null) => {
  if (account?.owner && account?.type === 'Cash') return i18next.t('explicitAccount.PrimaryCash');
  if (!account?.owner && account?.type === 'Cash') return i18next.t('explicitAccount.JointCash');

  return account ? getSaveStuffNames(account.type) : '';
};
