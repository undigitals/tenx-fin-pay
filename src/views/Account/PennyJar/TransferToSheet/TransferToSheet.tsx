import { Icon } from 'components/general/Icon/Icon';
import { BodyText, Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectDisplayTransferToSheet } from 'store/ui.slice';
import { IAccountItem } from 'store/user/accounts/accounts.types';
import { usePennyJar } from 'utils/hooks/usePennyJar';
import { AccountItem } from './AccountItem/AccountItem';

interface ITransferToSheet {
  handleAccountSelect: (account: IAccountItem) => void;
}

// TODO: Fix page / sheet / switch logic when backend service work
export const TransferToSheet: React.FC<ITransferToSheet> = ({ handleAccountSelect }) => {
  const { t } = useTranslation();
  const isOpen = useSelector(selectDisplayTransferToSheet);
  const [currentlySelectedAccount, setCurrentlySelectedAccount] = useState({} as IAccountItem);

  const { filteredAccounts, getAccountName, selectedAccountInformation, isMultipleCashAccounts, closeTransferToSheet } = usePennyJar();

  const handleOnSelect = (account: IAccountItem) => {
    setCurrentlySelectedAccount(account);
  };

  const handleOnBack = () => {
    closeTransferToSheet();
  };

  const handleSelectAccount = () => {
    closeTransferToSheet();
    handleAccountSelect(currentlySelectedAccount);
  };

  return (
    <CustomSheet isOpen={isOpen} header={false} wrapperPadding={false} height="auto" onClose={handleOnBack} className="transferToSheet">
      <div className="transferToSheetHeader">
        <Icon name="arrowLeft" color="charcoal" onClick={handleOnBack} cursorPointer size="small" />
        <Title size="S" font="Poppins" color="charcoal" fontWeight="SB" marginLeft={15}>
          {t('pennyJar.TransferTo')}
        </Title>
      </div>

      {isMultipleCashAccounts && (
        <>
          <div className="transferToSheetMultipleRow">
            <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B">
              {t('pennyJar.From')}
            </BodyText>
            <BodyText textType="bodyText" color="charcoal60" size="N" fontWeight="R">
              {t('pennyJar.DebitCard')}
            </BodyText>
          </div>

          <div className="transferToSheetMultipleRow">
            <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B">
              {t('pennyJar.LinkedTo')}
            </BodyText>
            {selectedAccountInformation && (
              <BodyText textType="bodyText" color="charcoal60" size="N" fontWeight="R">
                {`${getAccountName(selectedAccountInformation)} (${selectedAccountInformation.fiservAccountId.slice(-4)})`}
              </BodyText>
            )}
          </div>

          <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginTop={20} textAlign="start">
            {t('pennyJar.ChooseLinked')}
          </BodyText>
        </>
      )}

      {filteredAccounts?.map((account: IAccountItem) => (
        <AccountItem account={account} key={account.accountId} selected={currentlySelectedAccount?.accountId === account.accountId} handleSelection={() => handleOnSelect(account)} />
      ))}

      <CustomButton preset="primary" marginBottom={15} marginTop={32} onClick={handleSelectAccount} disabled={!filteredAccounts?.length || !currentlySelectedAccount?.accountId}>
        {t('pennyJar.SelectAccount')}
      </CustomButton>
    </CustomSheet>
  );
};
