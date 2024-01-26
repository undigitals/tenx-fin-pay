/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { usePennyJar } from 'utils/hooks/usePennyJar';
import { Icon } from 'components/general/Icon/Icon';
import { IAccountItem } from 'store/user/accounts/accounts.types';
import { getSlicedAccountId } from 'utils/helpers/accounts/accountsHelper';
import { BodyText } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { SContent, SSelector } from './AccountSelector.styles';

interface IAccountSelector {
  destinationAccount: IAccountItem;
  handleAccountSelect: (account: IAccountItem) => void;
}

export const AccountSelector: React.FC<IAccountSelector> = ({ destinationAccount, handleAccountSelect }) => {
  const { getIconName, getAccountTitle } = usePennyJar();
  const { filteredAccounts, getAccountName, selectedAccountInformation, isMultipleCashAccounts } = usePennyJar();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (filteredAccounts?.length) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (account: IAccountItem) => {
    setIsOpen(false);
    handleAccountSelect(account);
  };

  return (
    <SSelector onClick={handleClick}>
      <div className="content">
        {destinationAccount?.type && <Icon name={getIconName(destinationAccount?.type)} color="orange" size="small" cursorPointer />}
        <BodyText textType="bodyText" color={destinationAccount.type ? 'charcoal' : 'charcoal40'} fontWeight="R" size="M" cursorPointer marginLeft={11}>
          {destinationAccount?.type ? `${getAccountTitle(destinationAccount?.type)} ${getSlicedAccountId(destinationAccount.fiservAccountId)}` : t('pennyJar.SelectAnAccount')}
        </BodyText>
      </div>
      <Icon name="chevronDown" color="charcoal" size="smallest" cursorPointer />

      {isOpen && (
        <SContent onClick={() => setIsOpen(!isOpen)}>
          {filteredAccounts?.map((account: IAccountItem) => (
            <div className="item" key={account.accountId} onClick={() => handleSelect(account)}>
              <Icon name={getIconName(account.type)} color="orange" size="small" cursorPointer />

              <div className="name-container">
                <span className="account-name">{getAccountTitle(account.type)}</span>
                <span className="account-nickname">{`${getAccountName(account)} ${getSlicedAccountId(account.fiservAccountId)}`}</span>
              </div>
            </div>
          ))}
        </SContent>
      )}
    </SSelector>
  );
};
