import { Icon } from 'components/general/Icon/Icon';
import { RadioButton } from 'components/general/RadioButton/RadioButton';
import { BodyText } from 'components/general/Typography';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { IPartyAcctRelRecItem } from 'store/user/accounts/accounts.types';
import { useTheme } from 'styled-components';
import { getMaskedAcctId } from 'utils/helpers/accounts/accountsHelper';
import { getAccountName, getFiservBalance, getIconName } from 'views/Account/Summary/InternalTransfer/internalTransferHelper';
import { SAccountBadge } from 'views/Account/Summary/InternalTransfer/InternalTransferPage.styles';

type ISelectableItemProps = {
  account: IPartyAcctRelRecItem;
  handleSelection: (account: IPartyAcctRelRecItem) => void;
  isLast?: boolean;
  selected: boolean;
};

export const SelectableItem = ({ handleSelection, account, isLast, selected }: ISelectableItemProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { fiservAccountsData } = useSelector(selectAccountsData);

  const isCashPrimary = account?.partyAcctRelKeys.acctKeys.owner && account.partyAcctRelKeys?.acctKeys?.tenxAccountType === 'Cash';
  const accountBalance = getFiservBalance(fiservAccountsData?.partyAcctRelRec, account.partyAcctRelKeys.acctKeys.acctId);

  const handleSelectAccount = () => {
    handleSelection(account);
  };

  return (
    <CustomCard border={selected ? `2px solid ${theme.blue}` : `2px solid ${theme.charcoal5}`} borderRadius={16} padding="36px 24px 28px" onClick={handleSelectAccount} marginBottom={isLast ? 30 : 0}>
      {isCashPrimary && <SAccountBadge>{t(`account.DefaultAccount`)}</SAccountBadge>}
      <CustomRow>
        <RadioButton checked={selected}>
          <>
            <Icon name={getIconName(account)} color="orange" marginLeft={5} />
            <CustomRow flexDirection="column" alignItems="flex-start" marginLeft={13}>
              <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" marginLeft={10}>
                {t(`account.${getAccountName(account)}`)}
              </BodyText>
              <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginLeft={10}>
                {getMaskedAcctId(account)}
              </BodyText>
            </CustomRow>
          </>
        </RadioButton>
        {accountBalance !== undefined && <CustomAmount amount={accountBalance} size="xs" />}
      </CustomRow>
    </CustomCard>
  );
};
