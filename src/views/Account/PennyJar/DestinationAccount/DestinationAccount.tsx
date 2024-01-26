import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IAccountItem } from 'store/user/accounts/accounts.types';
import { getSlicedAccountId } from 'utils/helpers/accounts/accountsHelper';
import { usePennyJar } from 'utils/hooks/usePennyJar';
import { SDestinationAccount } from './DestinationAccount.styles';

interface IDestinationAccount {
  destinationAccount: IAccountItem;
}

export const DestinationAccount: React.FC<IDestinationAccount> = ({ destinationAccount }) => {
  const { showTransferToSheet, getIconName, getAccountTitle } = usePennyJar();
  const { t } = useTranslation();

  return (
    <SDestinationAccount onClick={showTransferToSheet}>
      <div className="information-container">
        {destinationAccount?.type && <Icon name={getIconName(destinationAccount?.type)} color="orange" size="small" cursorPointer />}
        <BodyText textType="bodyText" color={destinationAccount.type ? 'charcoal' : 'charcoal40'} fontWeight="R" size="M" cursorPointer marginLeft={11}>
          {destinationAccount?.type ? `${getAccountTitle(destinationAccount?.type)} ${getSlicedAccountId(destinationAccount.fiservAccountId)}` : t('pennyJar.SelectAnAccount')}
        </BodyText>
      </div>

      <Icon name="chevronDown" color="charcoal" size="smaller" cursorPointer />
    </SDestinationAccount>
  );
};
