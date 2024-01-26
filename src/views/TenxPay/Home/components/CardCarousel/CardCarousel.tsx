import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { IAccount } from 'store/user/payments/payments.types';
import { getCardTypeFromApiResp, getOnlyNumbersFromString } from 'utils/helpers/stringFormatter';
import { BankAccountSmall } from 'views/Cards/BankAccountSmall/BankAccountSmall';
import { CreditCardSmall } from 'views/Cards/CreditCardSmall/CreditCardSmall';
import { SCreditCard } from 'views/TenxPay/Home/Home.styles';

interface ICardCarousel {
  className?: string;
  accounts: IAccount[];
  selectedAccount: number | null;
  handleSelectAccount: (accountId: number) => void;
  handleAddAccountClick: () => void;
}

export const CardCarousel: React.FC<ICardCarousel> = ({ className, accounts, selectedAccount, handleSelectAccount, handleAddAccountClick }) => {
  const { t } = useTranslation();

  const handleAccountClick = (accountId: number, e: any) => {
    handleSelectAccount(accountId);
    e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <CustomRow className={className} flexDirection="column" alignItems="flex-start" horizontalScroll>
      <CustomRow alignItems="flex-start" flexDirection="row" gap={16} horizontalScroll>
        {accounts
          ?.slice()
          ?.sort((a: IAccount, b: IAccount) => Number(b.primaryAccount) - Number(a.primaryAccount))
          ?.map((account: IAccount) => (
            <CustomRow flexDirection="column" alignItems="flex-start" key={uuidv4()}>
              {account.accountType === 'CARD' && <CreditCardSmall noCarousel onClick={(e) => handleAccountClick(account.id, e)} isSelected={selectedAccount === account.id} {...account} />}

              {account.accountType === 'BANK' && (
                <BankAccountSmall
                  bankName={account.accountDetails?.bankName}
                  accountNumber={account.accountDetails?.number}
                  onClick={(e) => handleAccountClick(account.id, e)}
                  isSelected={selectedAccount === account.id}
                />
              )}

              <CustomRow marginTop={14}>
                {account.primaryAccount && (
                  <BodyText color="blue" fontWeight="SB" size="T" textType="helperText" marginRight={14}>
                    {t('tenxPayHome.Default')}
                  </BodyText>
                )}

                <BodyText color="charcoal60" fontWeight="R" size="T" textType="helperText" marginRight={3}>
                  {`${getCardTypeFromApiResp(account.alias)} (${getOnlyNumbersFromString(account.details)})`}
                </BodyText>

                <BodyText color="blue" fontWeight="R" size="T" textType="helperText" cursorPointer onClick={handleAddAccountClick}>
                  • {t('tenxPayHome.See more')}
                </BodyText>
              </CustomRow>
            </CustomRow>
          ))}

        <CustomRow flexDirection="column" alignItems="flex-start">
          <CustomRow flexDirection="column" alignItems="flex-start" marginBottom={10}>
            <SCreditCard onClick={handleAddAccountClick}>
              <Icon name="circlePlus" color="charcoal40" />
            </SCreditCard>
          </CustomRow>
        </CustomRow>
      </CustomRow>
    </CustomRow>
  );
};
