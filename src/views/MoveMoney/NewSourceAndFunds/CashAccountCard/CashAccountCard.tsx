import React, { useState } from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { InternalAccountItem } from 'views/MoveMoney/NewSourceAndFunds/InternalAccountItem/InternalAccountItem';
import { FundsSheet } from 'views/MoveMoney/NewSourceAndFunds/FundsModal/FundsSheet';
import { BodyText } from 'components/general/Typography';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { useTranslation } from 'react-i18next';
import { getAccountTitle } from 'utils/helpers/accounts/accountsHelper';
import { useLanguage } from 'utils/hooks/useLanguage';
import { IAccountItem } from 'store/user/accounts/accounts.types';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { SIcon } from './CashAccountCard.style';

interface CashAccountCardProps {
  items?: IAccountItem[];
  selectedAccount?: IAccountItem;
  modalTitle: string;
  onSelect: (account: string) => void;
}

export const CashAccountCard: React.FC<CashAccountCardProps> = ({ items, selectedAccount, onSelect, modalTitle }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { firstName, preferredName } = useSelector(selectCurrentUser) || {};
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!items && !selectedAccount) {
    return <CustomCard>{t('externalTransfer.NotFound')}</CustomCard>;
  }

  const onCancelHandler = () => {
    setIsModalVisible(false);
  };

  const handleChooseCard = () => {
    setIsModalVisible(true);
  };

  const changeAccount = (account: IAccountItem) => {
    onSelect(account.accountId);
    onCancelHandler();
  };

  return (
    <>
      <CustomCard borderRadius={16} onClick={handleChooseCard} cursorPointer padding="18px 24px">
        <CustomRow>
          {selectedAccount ? (
            <>
              <CustomRow>
                <SIcon name="cash" size="big" color="orange" cursorPointer />
                <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal" cursorPointer>
                  {getAccountTitle(language, selectedAccount, firstName, preferredName)}
                </BodyText>
              </CustomRow>
              <CustomRow justifyContent="flex-end">
                {selectedAccount.balance !== undefined && <CustomAmount size="smaller" color="charcoal" amount={selectedAccount.balance} />}
                <Icon name="chevronDown" size="smallest" color="charcoal" cursorPointer marginLeft={16} />
              </CustomRow>
            </>
          ) : (
            <>
              <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R">
                {t('externalAccount.NotSelected')}
              </BodyText>
              <CustomRow>
                <Icon name="chevronDown" size="smallest" color="charcoal" marginTop={6} cursorPointer />
              </CustomRow>
            </>
          )}
        </CustomRow>
      </CustomCard>

      {items && (
        <FundsSheet isVisible={isModalVisible} title={modalTitle} onCancelHandler={onCancelHandler}>
          <>
            {items.map((item: IAccountItem) => (
              <InternalAccountItem key={item.accountId} item={item} onChange={changeAccount} isSelected={selectedAccount?.accountId === item.accountId} />
            ))}
          </>
        </FundsSheet>
      )}
    </>
  );
};
