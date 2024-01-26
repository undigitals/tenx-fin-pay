import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import assert from 'assert';
import { useTranslation } from 'react-i18next';
import { isSameDay } from 'date-fns';
import { useToggle } from 'utils/hooks/useToggle';
import { useCurrencyFormat } from 'utils/hooks/useCurrencyFormat';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { FilterDrawer } from 'components/general/BottomDrawers/FilterDrawer/FilterDrawer';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { useGetAccountTransactionsMutation, useLazyGetAccountsQuery } from 'store/user/accounts/accounts.api';
import { getAvailableBalance, getFiservAccountType } from 'utils/helpers/accounts/accountsHelper';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { Loader } from 'components/general/Loader/Loader';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate, formatLocaleDate } from 'utils/helpers/date';
import { EAccountType, IAccountItem, IAcctTrnRecItem } from 'store/user/accounts/accounts.types';
import { useLanguage } from 'utils/hooks/useLanguage';
import { maxBy } from 'utils/helpers/minmax';
import { BodyText, Title } from 'components/general/Typography';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { SORT_VARIABLES } from 'components/general/BottomDrawers/FilterDrawer/constants';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { AccountSelector } from './AccountSelector/AccountSelector';
import { SPage, SMainContent, STransaction } from './BalancesTransactionsPage.styles';
import { TransactionDetailsSheet } from './TransactionDetailsSheet/TransactionDetailsSheet';
import { TagBar } from './TagBar/TagBar';
import { TFilterParamsInit, TTagNameList } from './BalancesTransactionsPage.types';
import { Slider } from './Slider/Slider';
import { TransactionDetailsModal } from './TransactionDetailsModal/TransactionDetailsModal';
import { Sign } from './Sign';

const filterParamsInit: TFilterParamsInit = {
  filterBy: {
    incoming: true,
    outgoing: true,
    minAmount: '',
    maxAmount: '',
    fromDate: null,
    toDate: null,
  },
  sortBy: SORT_VARIABLES[0],
  search: '',
};

const tagNameList: TTagNameList = {
  filterBy: {
    incoming: 'Money In',
    outgoing: 'Money Out',
    minAmount: 'Min Amount',
    maxAmount: 'Max Amount',
    fromDate: 'From Date',
    toDate: 'To Date',
  },
};

const useOwnerId = (): string => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  return location.state?.ownerId ?? user?.userId;
};

const useAccountType = (): EAccountType => {
  const location = useLocation();
  return location.state?.accountType ?? EAccountType.CASH;
};

const useAccounts = (ownerId: string) => {
  const user = useSelector(selectCurrentUser);

  const [accounts, setAccounts] = useState<Record<EAccountType, IAccountItem | undefined>>({
    [EAccountType.CASH]: undefined,
    [EAccountType.STUFF]: undefined,
    [EAccountType.SAVE]: undefined,
  });

  useEffect(() => {
    setAccounts(() => {
      const newAccounts: Record<EAccountType, IAccountItem | undefined> = {
        [EAccountType.CASH]: undefined,
        [EAccountType.STUFF]: undefined,
        [EAccountType.SAVE]: undefined,
      };
      if (user?.accounts) {
        for (const account of user.accounts) {
          if (account.ownerId !== ownerId) {
            continue;
          }
          if (account.type !== EAccountType.CASH && account.type !== EAccountType.SAVE && account.type !== EAccountType.STUFF) {
            // FIXME: are there any other possible account types? If not, maybe IAccountItem's `type` property
            // should be typed as EAccountType?
            continue;
          }
          if (newAccounts[account.type] !== undefined) {
            // only take the first matching account for every account type
            // FIXME: is it possible to have multiple accounts with the same type and owner id?
            continue;
          }
          newAccounts[account.type] = account;
        }
      }
      return newAccounts;
    });
  }, [ownerId, user]);

  return accounts;
};

export const BalancesTransactionsPage = () => {
  const { t } = useTranslation();
  const ownerId = useOwnerId();
  const accountType = useAccountType();
  const { isDesktopSize } = useDeviceDimension();
  const navigate = useNavigate();

  const { locale } = useLanguage();
  const { formatAutoSign } = useCurrencyFormat();
  const [getFiservAccountsAPI, getFiservAccountsAPIResult] = useLazyGetAccountsQuery();
  const { fiservAccountsData } = useSelector(selectAccountsData);

  const [viewedAccount, setViewedAccount] = useState(accountType);
  const [getAccountTransactionsAPI, getAccountTransactionsAPIResult] = useGetAccountTransactionsMutation();
  const [selectedAccountTransactions, setSelectedAccountTransactions] = useState<IAcctTrnRecItem[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<IAcctTrnRecItem>();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [search, setSearch] = useState('');
  const filterSheet = useToggle<{ prevScreen?: string }>(false);
  const transactionSheet = useToggle(false);
  const [filterParams, setFilterParams] = useState<TFilterParamsInit>(filterParamsInit);
  const TransactionDetailsScreen = isDesktopSize ? TransactionDetailsModal : TransactionDetailsSheet;

  const {
    filterBy: { fromDate, toDate, incoming, outgoing, minAmount, maxAmount },
    sortBy,
  } = filterParams;

  const accounts = useAccounts(ownerId);
  const { [EAccountType.STUFF]: stuffAccount, [EAccountType.SAVE]: saveAccount } = accounts;

  const availableBalance = useMemo(() => {
    if (!fiservAccountsData) {
      return null;
    }
    const accountId = accounts[viewedAccount]?.fiservAccountId;
    if (!accountId) {
      return null;
    }
    return getAvailableBalance(fiservAccountsData.partyAcctRelRec, accountId);
  }, [accounts, fiservAccountsData, viewedAccount]);

  const displayedAccountTransactions = useMemo(() => {
    let toDateNextDay: Date | null = null;
    if (toDate !== null) {
      toDateNextDay = new Date(toDate);
      toDateNextDay.setDate(toDateNextDay.getDate() + 1);
    }

    return selectedAccountTransactions
      .filter((transaction) => {
        if (!incoming && transaction.acctTrnInfo.drCrType === 'Credit') {
          return false;
        }

        if (!outgoing && transaction.acctTrnInfo.drCrType === 'Debit') {
          return false;
        }

        if (minAmount && transaction.acctTrnInfo.trnAmt.amt < +minAmount) {
          return false;
        }

        if (maxAmount && transaction.acctTrnInfo.trnAmt.amt > +maxAmount) {
          return false;
        }

        if (search) {
          const descriptionValue = transaction.acctTrnInfo?.desc[0]?.toLowerCase().trim();
          const searchValue = search.toLowerCase().trim();
          const regex = new RegExp(searchValue);
          const result = descriptionValue?.match(regex);

          return result !== null;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy.id) {
          case '1':
            return new Date(a.acctTrnInfo.trnDt).getTime() - new Date(b.acctTrnInfo.trnDt).getTime();
          case '2':
            return b.acctTrnInfo.trnAmt.amt - a.acctTrnInfo.trnAmt.amt;
          case '3':
            return a.acctTrnInfo.trnAmt.amt - b.acctTrnInfo.trnAmt.amt;
          case '0':
          default:
            return new Date(b.acctTrnInfo.trnDt).getTime() - new Date(a.acctTrnInfo.trnDt).getTime();
        }
      });
  }, [filterParams, selectedAccountTransactions]);

  const groupedByDateAccountTransactions = useMemo(() => {
    if (displayedAccountTransactions.length === 0) {
      return [];
    }
    const groups: IAcctTrnRecItem[][] = [[]];
    let currentGroupDate = new Date(displayedAccountTransactions[0].acctTrnInfo.trnDt);
    for (const transaction of displayedAccountTransactions) {
      const transactionDate = new Date(transaction.acctTrnInfo.trnDt);
      if (isSameDay(currentGroupDate, transactionDate)) {
        const currentGroup = groups.at(-1);
        assert(currentGroup !== undefined);
        currentGroup.push(transaction);
      } else {
        currentGroupDate = transactionDate;
        groups.push([transaction]);
      }
    }
    return groups;
  }, [displayedAccountTransactions]);

  const maxTransactionAmount = useMemo(() => {
    return maxBy(selectedAccountTransactions, (transaction) => transaction.acctTrnInfo.trnAmt.amt);
  }, [selectedAccountTransactions]);

  const openFilterSheet = (screen: string | undefined) => {
    filterSheet.show();
    filterSheet.setData({ prevScreen: screen ?? 'other' });
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchClose = () => {
    setIsSearchVisible(false);
    setSearch('');
  };

  const handleOpenDetails = (transaction: IAcctTrnRecItem) => {
    setSelectedTransaction(transaction);
    transactionSheet.show();
  };

  const onFilter = (formValues: TFilterParamsInit) => setFilterParams(formValues);

  const handleTagClose = (tagName: string) => {
    const value = filterParamsInit.filterBy[tagName as keyof typeof filterParamsInit.filterBy];
    let filterValue = { [tagName]: value };

    if (['incoming', 'outgoing'].includes(tagName)) {
      filterValue = { incoming: true, outgoing: true };
    }

    if (['minAmount', 'maxAmount'].includes(tagName)) {
      filterValue = { minAmount: '', maxAmount: '' };
    }

    if (['fromDate', 'toDate'].includes(tagName)) {
      filterValue = { fromDate: null, toDate: null };
    }

    setFilterParams({
      filterBy: { ...filterParams.filterBy, ...filterValue },
      sortBy: filterParams.sortBy,
    });
  };

  useEffect(() => {
    getFiservAccountsAPI();
  }, [getFiservAccountsAPI]);

  useEffect(
    () =>
      setFilterParams({
        filterBy: { ...filterParams.filterBy },
        sortBy: { ...filterParams.sortBy },
        search,
      }),
    [search]
  );

  useEffect(() => {
    (async function fetchViewedAccountTransactions() {
      const account = accounts[viewedAccount];
      const allAccounts = fiservAccountsData?.partyAcctRelRec;
      const fiservAccountType = account ? getFiservAccountType(allAccounts, account.fiservAccountId) : null;
      const dateFromDirty = filterParams.filterBy.fromDate;
      const dateToDirty = filterParams.filterBy.toDate;
      const dateFrom = dateFromDirty ? formatDate(dateFromDirty) : '';
      const dateTo = dateToDirty ? formatDate(dateToDirty) : '';

      if (account && fiservAccountType) {
        const { acctTrnRec: accountTransactions } = await getAccountTransactionsAPI({
          accountId: account.fiservAccountId,
          accountType: fiservAccountType,
          dateFrom,
          dateTo,
        }).unwrap();
        setSelectedAccountTransactions(accountTransactions);
      } else {
        setSelectedAccountTransactions([]);
      }
    })();
  }, [viewedAccount, accounts, fiservAccountsData, getAccountTransactionsAPI, toDate, fromDate]);

  if (getFiservAccountsAPIResult.isFetching) {
    return <Loader />;
  }

  return (
    <SPage isDesktopSize={isDesktopSize}>
      {isDesktopSize && <Slider filterParamsInit={filterParamsInit} filterParams={filterParams} search={search} setSearch={setSearch} onFilter={onFilter} amountUpperLimit={maxTransactionAmount} />}

      <SMainContent>
        {isDesktopSize ? (
          <CustomRow justifyContent="flex-start" extraStyles={{ paddingBottom: 32, borderBottom: `1.5px solid #ECE8DC` }}>
            <Icon name="arrowLeft" color="blue" onClick={() => navigate(-1)} marginLeft={34} marginRight={4} cursorPointer />
            <Title paddingLeft={6}>{t(`account.AccountTransactions`)}</Title>
          </CustomRow>
        ) : (
          <Title paddingLeft={6}>{t(`account.AccountTransactions`)}</Title>
        )}

        <CustomRow flexDirection="column" alignItems="stretch" extraStyles={{ padding: isDesktopSize ? '30px 17% 0' : '0' }}>
          <AccountSelector onSelectedAccount={setViewedAccount} stuffAccount={!!stuffAccount} saveAccount={!!saveAccount} selectedAccount={viewedAccount} isDesktopSize={isDesktopSize} />

          <CustomRow marginBottom={24}>
            <CustomRow flexDirection="column" alignItems="flex-start">
              <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70">
                {t(`account.AvailableBalance`)}:
              </BodyText>

              {availableBalance != null && (
                <CustomAmount
                  amount={availableBalance}
                  color={availableBalance < 0 ? 'red' : 'charcoal'}
                  size={isDesktopSize ? 'thin' : 'larger'}
                  isPoppins
                  multiSizable
                  remainingSize={isDesktopSize ? 'thin' : 'xl'}
                  remainingWeight={isDesktopSize ? 500 : 600}
                />
              )}
            </CustomRow>

            {!isDesktopSize && (
              <CustomRow marginTop={18}>
                <Icon name="filter" color="charcoal70" size="small" cursorPointer onClick={() => openFilterSheet('main')} marginRight={16} />
                <Icon name="search" color="charcoal70" size="small" cursorPointer onClick={() => setIsSearchVisible(true)} />
              </CustomRow>
            )}
          </CustomRow>

          <TagBar filterBy={filterParams.filterBy} tagNameList={tagNameList} onClose={handleTagClose} locale={locale} />

          <CustomRow flexDirection="column" alignItems="flex-start" justifyContent="center" marginBottom={20}>
            <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5}>
              {t('balancesTransactions.SortBy')}
            </BodyText>

            <BodyText textType="bodyText" fontWeight="B" size="N" color="charcoal" lineHeight={1.5}>
              {t(filterParams.sortBy.title)}
            </BodyText>
          </CustomRow>

          {isSearchVisible && (
            <BaseInput
              placeholder={t(`balancesTransactions.WhatAreYouLookingFor`)}
              suffix="close"
              value={search}
              onBeige
              onChange={handleSearchInputChange}
              suffixClick={handleSearchClose}
              marginBottom={15}
              suffixSize="smallest"
            />
          )}

          {getAccountTransactionsAPIResult.isLoading ? (
            <Loader />
          ) : (
            groupedByDateAccountTransactions.map((group, i) => (
              // can't use transaction dates for keys since they are not stable identifiers of transaction groups
              // eslint-disable-next-line react/no-array-index-key
              <section key={i} className="group">
                <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" marginBottom={16}>
                  {formatLocaleDate(new Date(group[0]?.acctTrnInfo?.trnDt), 'EEE, MMM dd', locale)}
                </BodyText>

                <ul>
                  {group.map((transaction, j) => (
                    // FIXME: couldn't find any kind of stable identifier for a transaction
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={j}>
                      <STransaction onClick={() => handleOpenDetails(transaction)}>
                        <Sign type={transaction.acctTrnInfo.drCrType === 'Debit' ? 'expense' : 'income'} />
                        <span className="description">{transaction.acctTrnInfo?.desc[0]}</span>
                        <div className="amount">
                          <BodyText textType="helperText" fontWeight="B" size="S" color="charcoal" nowrap>
                            {transaction.acctTrnInfo.drCrType === 'Debit' ? '- ' : '+ '}
                            {formatAutoSign(transaction.acctTrnInfo?.trnAmt?.amt)}
                          </BodyText>
                          <BodyText textType="helperText" fontWeight="R" size="S" color="charcoal40" marginTop="spacing-tiny" nowrap>
                            {formatAutoSign(transaction.acctTrnInfo?.stmtRunningBal?.[0]?.amt)}
                          </BodyText>
                        </div>
                      </STransaction>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}

          <SuttonDisclaimerNote marginTop={isDesktopSize ? 60 : 0} marginBottom={isDesktopSize ? 80 : 0} />
        </CustomRow>
      </SMainContent>

      <FilterDrawer
        isOpen={filterSheet.isActive}
        onOpen={openFilterSheet}
        onClose={filterSheet.hide}
        onFilter={onFilter}
        amountUpperLimit={maxTransactionAmount}
        filterParamsInit={filterParamsInit}
        filterParams={filterParams}
        prevScreen={filterSheet?.data?.prevScreen}
      />

      <TransactionDetailsScreen isOpen={transactionSheet.isActive} transaction={selectedTransaction} onClose={transactionSheet.hide} />
    </SPage>
  );
};
