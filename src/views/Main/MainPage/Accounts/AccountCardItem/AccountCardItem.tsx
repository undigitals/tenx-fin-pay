import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CardLink } from 'views/Main/MainPage/Accounts/CardLink/CardLink';
import { CardItem } from 'views/Main/MainPage/Accounts/CardItem/CardItem';
import { ROUTES } from 'vars/const/ROUTES';
import { EAccountType } from 'store/user/accounts/accounts.types';
import { PrimaryCashAmount } from './components/PrimaryCachAmount/PrimaryCashAmount';
import { SIcon, SItemsWrapper, STransferBetweenAccounts, STransferButtonContainer } from './AccountCardItem.styles';
import { CombinedBalance } from './CombinedBalance/CombinedBalance';

interface IAccountData {
  ownerId?: string;
  owner?: boolean;
  balance?: number;
  id?: string;
  debitCardNumber?: string | null;
}

interface AccountCardItemProps {
  isAccCollapsed?: boolean | null;
  ownerId: string;
  accounts?: {
    [key: string]: IAccountData;
  };
}

export const AccountCardItem = ({ isAccCollapsed, ownerId, accounts }: AccountCardItemProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cashAccount = accounts?.Cash;
  const stuffAccount = accounts?.Stuff;
  const saveAccount = accounts?.Save;

  const combinedAmount = () =>
    accounts
      ? Object.values(accounts).reduce((sum, item) => {
          if (item.balance) {
            return sum + item.balance;
          }
          return sum;
        }, 0)
      : 0;

  const handleTransferBetweenTenxAccounts = () => {
    navigate(ROUTES.internalTransfer.path);
  };

  const handleCardClick = (accountType: EAccountType) => {
    navigate(ROUTES.balancesTransactions.path, { state: { ownerId, accountType } });
  };

  return (
    <CustomCard marginTop={0} padding="30px 20px 20px" marginBottom={10}>
      <PrimaryCashAmount cashAmount={cashAccount?.balance} combinedAmount={combinedAmount()} debitCardNumber={cashAccount?.debitCardNumber} ownerId={ownerId} />

      {!isAccCollapsed && (
        <>
          <SItemsWrapper>
            {cashAccount && (
              <CardLink
                onClick={() => handleCardClick(EAccountType.CASH)}
                title={t('homeScreen.Cash Account')}
                amount={cashAccount?.balance}
                startIcon={<SIcon name="cash" color="orange" cursorPointer />}
                className="cash-account-link"
              />
            )}

            {stuffAccount ? (
              <CardLink
                onClick={() => handleCardClick(EAccountType.STUFF)}
                title={t(`homeScreen.Needs Account`)}
                amount={stuffAccount?.balance}
                startIcon={<SIcon name="needsAccount" color="orange" cursorPointer />}
              />
            ) : (
              <CardItem
                title={t(`homeScreen.Needs Account`)}
                type="needs"
                description={t(`addAccount.Set aside money intended for your monthly expenses.`)}
                startIcon={<SIcon name="needsAccount" color="charcoal70" cursorPointer />}
              />
            )}

            {saveAccount ? (
              <CardLink
                onClick={() => handleCardClick(EAccountType.SAVE)}
                title={t(`homeScreen.Goals Account`)}
                amount={saveAccount?.balance}
                startIcon={<SIcon name="goal" color="orange" cursorPointer />}
              />
            ) : (
              <CardItem
                title={t(`homeScreen.Goals Account`)}
                type="goals"
                description={t(`depositAccounts.Set aside money for future financial goals - or just for a rainy day.`)}
                startIcon={<SIcon name="goal" color="charcoal70" cursorPointer />}
              />
            )}

            <CombinedBalance balance={combinedAmount()} className="combined-balance-mobile" />
          </SItemsWrapper>

          <STransferButtonContainer>
            <STransferBetweenAccounts preset="primary" onClick={handleTransferBetweenTenxAccounts}>
              {t(`homeScreen.Transfer Between Tenx Accounts`)}
            </STransferBetweenAccounts>
          </STransferButtonContainer>
        </>
      )}
    </CustomCard>
  );
};
