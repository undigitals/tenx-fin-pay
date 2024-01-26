import React, { useState } from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { IThirdParty } from 'store/user/accounts/accounts.types';
import { getThirdPatryAccountById } from 'utils/helpers/accounts/accountsHelper';
import { ExternalAccountItem } from 'views/MoveMoney/NewSourceAndFunds/ExternalAccountItem/ExternalAccountItem';
import { FundsSheet } from 'views/MoveMoney/NewSourceAndFunds/FundsModal/FundsSheet';
import { BodyText } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { FundCardProps } from './FundCard.type';
import { SIcon } from './FundCard.style';

export const FundCard: React.FC<FundCardProps> = ({ items, onSelect, selected = '', modalTitle }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const selectedAccount = getThirdPatryAccountById(items, selected);

  const onCancelHandler = () => {
    setIsModalVisible(false);
  };

  const handleChooseCard = () => {
    setIsModalVisible(true);
  };

  const changeAccount = (id: string) => {
    onSelect(id);
    onCancelHandler();
  };

  if (!items) {
    return (
      <CustomCard>
        <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R">
          {t('externalTransfer.NotFound')}
        </BodyText>
      </CustomCard>
    );
  }

  return (
    <>
      <CustomCard
        onClick={handleChooseCard}
        padding="18px 24px"
        cursorPointer
        borderRadius={16}
        extraStyles={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <CustomRow flex={1} marginRight={10} justifyContent="flex-start">
          {selectedAccount ? (
            <>
              <SIcon name="creditCard" size="normal" color="charcoal" cursorPointer />
              <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" extraStyles={{ flex: 1 }}>
                {selectedAccount.externalDisplayAccountName}
              </BodyText>
            </>
          ) : (
            <BodyText textType="bodyText" color="charcoal40" size="N" fontWeight="R">
              {t('externalTransfer.SelectAccount')}
            </BodyText>
          )}
        </CustomRow>
        <CustomRow>
          {selectedAccount && (
            <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginRight={16}>
              {selectedAccount.externalDisplayAccountNumber ? `(${selectedAccount.externalDisplayAccountNumber})` : selectedAccount.issuingNetwork}
            </BodyText>
          )}
          <Icon name="chevronDown" size="smallest" color="charcoal" cursorPointer />
        </CustomRow>
      </CustomCard>

      <FundsSheet isVisible={isModalVisible} title={modalTitle} onCancelHandler={onCancelHandler}>
        <>
          {items.map((item: IThirdParty) => (
            <ExternalAccountItem key={item.id} item={item} onChange={changeAccount} isSelected={selected === item.id} />
          ))}
        </>
      </FundsSheet>
    </>
  );
};
