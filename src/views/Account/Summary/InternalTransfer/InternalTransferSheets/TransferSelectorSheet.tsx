import React, { useState } from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { useTranslation } from 'react-i18next';
import { IPartyAcctRelRecItem } from 'store/user/accounts/accounts.types';
import { SelectableItem } from 'views/Account/Summary/InternalTransfer/SelectableItem/SelectableItem';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';

type ITransferSelectorSheetProps = {
  isOpen: boolean;
  isFrom: boolean;
  options: IPartyAcctRelRecItem[];
  selectedOption: IPartyAcctRelRecItem | null;
  onClose: () => void;
  onSelect: (option: IPartyAcctRelRecItem) => void;
};

export const TransferSelectorSheet = ({ isOpen, isFrom, options, selectedOption, onClose, onSelect }: ITransferSelectorSheetProps) => {
  const { t } = useTranslation();
  const [senderAccount, setSenderAccount] = useState<IPartyAcctRelRecItem | null>(selectedOption);

  const handleSelection = (newAccount: IPartyAcctRelRecItem) => {
    setSenderAccount(newAccount);
  };

  const handleButtonClick = () => {
    onSelect(senderAccount as IPartyAcctRelRecItem);
  };

  return (
    <CustomSheet isOpen={isOpen} header={false} wrapperPadding={false} height="auto" onClose={onClose}>
      <CustomRow marginBottom={16} justifyContent="flex-start">
        <Icon name="arrowLeft" color="charcoal" onClick={onClose} cursorPointer size="small" />
        <Title size="S" font="Poppins" color="charcoal" fontWeight="SB" marginLeft={15}>
          {isFrom ? t('internalTransfer.Transfer From') : t('internalTransfer.Transfer To')}
        </Title>
      </CustomRow>

      {options.map((account, index) => (
        <SelectableItem account={account} key={account.partyAcctRelKeys.acctKeys.acctId} handleSelection={handleSelection} isLast={index === options.length - 1} selected={senderAccount === account} />
      ))}

      <CustomButton preset="primary" size="middleStretch" marginBottom={25} marginTop={32} onClick={handleButtonClick}>
        {t('internalTransfer.Select')}
      </CustomButton>

      <SuttonDisclaimerNote />
    </CustomSheet>
  );
};
