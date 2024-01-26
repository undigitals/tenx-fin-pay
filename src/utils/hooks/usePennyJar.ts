import { useSelector } from 'react-redux';
import { setShowTransferToSheet } from 'store/ui.slice';
import { useChangeAccountFeatureMutation, useLazyGetAccountFeaturesQuery } from 'store/user/accounts/accounts.api';
import { resetPennyJarDestinationAccounts, selectAccountsData, setPennyJarDestinationAccount, setPennyJarDestinationAccounts } from 'store/user/accounts/accounts.slice';
import { IAccountItem } from 'store/user/accounts/accounts.types';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { useMemo } from 'react';
import { useAppDispatch } from './store';

// TODO: Fix page / sheet / switch logic when backend service work
export const usePennyJar = () => {
  const dispatch = useAppDispatch();
  const { selectedAccountInformation, pennyJarDestinationAccount, pennyJarDestinationAccounts } = useSelector(selectAccountsData);
  const { accounts, firstName, preferredName } = useSelector(selectCurrentUser) || {};
  const [getAccountFeatures, getAccountFeaturesResult] = useLazyGetAccountFeaturesQuery();
  const [changeAccountFeature, changeAccountFeatureResult] = useChangeAccountFeatureMutation();

  const filteredAccounts = useMemo(() => {
    if (!accounts) {
      return [];
    }
    return accounts.filter((account) => {
      const selectedAccountId = selectedAccountInformation.accountId;
      const selectedOwnerId = selectedAccountInformation.ownerId;
      return account.accountId !== selectedAccountId && account.type !== 'Cash' && account.ownerId === selectedOwnerId;
    });
  }, [accounts, selectedAccountInformation]);

  const isMultipleCashAccounts = useMemo(() => {
    if (!accounts) {
      return false;
    }
    const ownerIds = accounts.map((account) => account.ownerId);
    const uniqueOwnerIds = new Set(ownerIds);
    return uniqueOwnerIds.size > 1;
  }, [accounts]);

  const setPennyJarDestination = (account: IAccountItem) => {
    dispatch(setPennyJarDestinationAccount(account));
  };

  // For transfer to sheet
  const pushToDestinationAccounts = (account: IAccountItem) => {
    dispatch(resetPennyJarDestinationAccounts());
    dispatch(setPennyJarDestinationAccounts(account));
  };

  // For transfer to sheet
  const isAccountAlreadySelected = (accountId: string) => !!pennyJarDestinationAccounts.find((account: IAccountItem) => account.accountId === accountId);

  const getFeatures = async (id: string) => {
    await getAccountFeatures(id);
  };

  const changeFeature = async (cashAccountId: string, isEnabled: boolean, destinationAccountId: string) => {
    const data = [
      {
        type: 'RoundUp',
        isEnabled,
        roundUp: {
          accountId: destinationAccountId,
          amount: 1.0,
        },
      },
    ];

    await changeAccountFeature({ data, cashAccountId });
  };

  const showTransferToSheet = () => {
    dispatch(setShowTransferToSheet(true));
  };

  const closeTransferToSheet = () => {
    dispatch(setShowTransferToSheet(false));
  };

  const getAccountTitle = (accountType: string) => {
    switch (accountType) {
      case 'Cash':
        return 'Cash Account';
      case 'Save':
        return 'Goals Account';
      case 'Stuff':
        return 'Needs Account';
      default:
        return '';
    }
  };

  const getIconName = (accountType: string) => {
    switch (accountType) {
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

  const getAccountName = (account: IAccountItem) => {
    const name = preferredName || firstName;
    const fullName = account?.owner ? `${name}'s` : `${name}'s Joint`;

    switch (account?.type) {
      case 'Cash':
        return `${fullName} Cash Account`;
      case 'Save':
        return `${fullName} Goals Account`;
      case 'Stuff':
        return `${fullName} Needs Account`;
      default:
        return '';
    }
  };

  return {
    getFeatures,
    changeFeature,
    getAccountFeaturesResult,
    changeAccountFeatureResult,
    showTransferToSheet,
    accounts,
    setPennyJarDestination,
    filteredAccounts,
    getAccountTitle,
    getIconName,
    getAccountName,
    selectedAccountInformation,
    pennyJarDestinationAccount,
    isMultipleCashAccounts,
    pennyJarDestinationAccounts,
    pushToDestinationAccounts,
    isAccountAlreadySelected,
    closeTransferToSheet,
  };
};
