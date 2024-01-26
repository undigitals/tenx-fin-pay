import { Icon } from 'components/general/Icon/Icon';
import { RadioButton } from 'components/general/RadioButton/RadioButton';
import { BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { IAccountItem } from 'store/user/accounts/accounts.types';
import React, { useEffect, useState } from 'react';
import { usePennyJar } from 'utils/hooks/usePennyJar';
import { getSlicedAccountId } from 'utils/helpers/accounts/accountsHelper';

interface IAccountItemProps {
  account: IAccountItem;
  handleSelection: (accountId: string) => void;
  isLast?: boolean;
  selected: boolean;
}

export const AccountItem: React.FC<IAccountItemProps> = ({ handleSelection, account, isLast, selected }) => {
  const { getAccountTitle, getIconName, getAccountName, isAccountAlreadySelected } = usePennyJar();
  const [isSelected, setIsSelected] = useState(() => isAccountAlreadySelected(account.accountId));

  const handleSelectAccount = (accountId: string) => {
    handleSelection(accountId);
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <CustomCard
      border={isSelected ? '2px solid #3E4FE5' : '2px solid #F5F4F4'}
      borderRadius={16}
      padding="36px 24px 28px"
      onClick={() => handleSelectAccount(account.fiservAccountId)}
      marginBottom={isLast ? 30 : 0}
    >
      <CustomRow>
        <RadioButton checked={isSelected}>
          <>
            <Icon name={getIconName(account.type)} color="orange" marginLeft={5} />
            <CustomRow flexDirection="column" alignItems="flex-start" marginLeft={13}>
              <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" marginLeft={10}>
                {getAccountTitle(account.type)}
              </BodyText>
              <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginLeft={10}>
                {`${getAccountName(account)} ${getSlicedAccountId(account.fiservAccountId)}`}
              </BodyText>
            </CustomRow>
          </>
        </RadioButton>
      </CustomRow>
    </CustomCard>
  );
};
