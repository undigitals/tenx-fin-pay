import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select, { OptionProps, SingleValueProps } from 'react-select';
import { IPartyAcctRelRecItem } from 'store/user/accounts/accounts.types';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { useSelector } from 'react-redux';
import { getAccountsSortedByTypeAndOwnership, getMaskedAcctId } from 'utils/helpers/accounts/accountsHelper';
import { useCurrencyFormat } from 'utils/hooks/useCurrencyFormat';
import { getAccountName, getFiservBalance } from './internalTransferHelper';
import { TransferSelectorSheet } from './InternalTransferSheets/TransferSelectorSheet';

const AccountOption = ({ innerRef, innerProps, data }: OptionProps<IPartyAcctRelRecItem, false>) => {
  const { t } = useTranslation();

  const isDefaultAccount = data.partyAcctRelKeys.acctKeys.owner && data.partyAcctRelKeys.acctKeys.tenxAccountType === 'Cash';

  return (
    <div className="account-option" ref={innerRef} {...innerProps} data-type={data?.partyAcctRelKeys?.acctKeys?.tenxAccountType || ''}>
      {isDefaultAccount && <div className="badge">Default account</div>}
      <div className="details">
        <div className="name">{t(`account.${getAccountName(data)}`)}</div>
        <div className="id">{getMaskedAcctId(data)}</div>
      </div>
    </div>
  );
};

const AccountValue = ({ innerProps, data }: SingleValueProps<IPartyAcctRelRecItem, false>) => {
  const { t } = useTranslation();

  const { formatAutoSign } = useCurrencyFormat();

  const { fiservAccountsData } = useSelector(selectAccountsData);

  return (
    <div className="account-value" {...innerProps} data-type={data?.partyAcctRelKeys?.acctKeys?.tenxAccountType || ''}>
      <div>
        <span className="name">
          {t(`account.${getAccountName(data)}`)} {getMaskedAcctId(data)}
        </span>
        <span className="amount">{formatAutoSign(getFiservBalance(fiservAccountsData?.partyAcctRelRec, data.partyAcctRelKeys.acctKeys.acctId))}</span>
      </div>
    </div>
  );
};

export type IAccountSelectorProps = {
  account: IPartyAcctRelRecItem | null;
  options: IPartyAcctRelRecItem[];
  recipient?: boolean;
  onSelect: (account: IPartyAcctRelRecItem | null) => void;
  isDisabled?: boolean;
};

export const AccountSelector = ({ account, options, recipient, onSelect, isDisabled }: IAccountSelectorProps) => {
  const { t } = useTranslation();

  const { fiservAccountsData } = useSelector(selectAccountsData);

  const { formatAutoSign } = useCurrencyFormat();

  const [modalOpen, setModalOpen] = useState(false);

  const orderedAccounts = useMemo(() => getAccountsSortedByTypeAndOwnership(options), [options]);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleModalAccountSelect = (newAccount: IPartyAcctRelRecItem) => {
    setModalOpen(false);
    onSelect(newAccount);
  };

  return (
    <>
      <Select
        placeholder={t('internalTransfer.Select an Account')}
        className="select-account"
        classNamePrefix="select-account"
        isSearchable={false}
        options={orderedAccounts}
        components={{
          Option: AccountOption,
          SingleValue: AccountValue,
        }}
        value={account}
        onChange={onSelect}
        isDisabled={isDisabled}
      />
      <button
        type="button"
        className="account"
        data-selected={!!account || undefined}
        data-type={account?.partyAcctRelKeys?.acctKeys?.tenxAccountType || ''}
        onClick={handleButtonClick}
        disabled={isDisabled}
      >
        <div>
          <span className="action">{t('internalTransfer.Select an Account')}</span>
          {!!account && (
            <>
              <div className="details">
                <div className="name">{t(`account.${getAccountName(account)}`)}</div>
                <div className="id">{getMaskedAcctId(account)}</div>
              </div>
              <span className="amount">{formatAutoSign(getFiservBalance(fiservAccountsData?.partyAcctRelRec, account.partyAcctRelKeys.acctKeys.acctId))}</span>
            </>
          )}
        </div>
      </button>
      <TransferSelectorSheet isOpen={modalOpen} isFrom={!recipient} options={orderedAccounts} selectedOption={account} onClose={() => setModalOpen(false)} onSelect={handleModalAccountSelect} />
    </>
  );
};
