import React from 'react';
import Card from 'assets/images/card.svg';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { useTranslation } from 'react-i18next';
import { Box } from 'views/Main/MainPage/MainPage.styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { lsGetItem } from 'utils/helpers/storage';
import { mobileApiCall } from 'services/mobileService';
import { setShowAddMoneySheet, setShowCardHubModal } from 'store/ui.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { BodyText } from 'components/general/Typography';
import { VisaLogo } from 'assets/logos';
import { EAccountType } from 'store/user/accounts/accounts.types';
import { Icon } from 'components/general/Icon/Icon';
import { SAddMoneyButton, SCashAccountCard, SCashAccountCardMini, SContainer } from './PrimaryCashAmount.styles';

interface PrimaryCashAmountProps {
  cashAmount?: number;
  combinedAmount: number;
  ownerId: string;
  debitCardNumber?: string | null;
}

export const PrimaryCashAmount = ({ cashAmount = 0, combinedAmount, ownerId, debitCardNumber }: PrimaryCashAmountProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const openCardHub = () => {
    const isMobileApp = lsGetItem('isMobileApp');

    if (isMobileApp) {
      mobileApiCall('cardHubRequest');
    } else {
      dispatch(setShowCardHubModal(true));
    }
  };

  const handleBoxClick = () => {
    navigate(ROUTES.balancesTransactions.path, { state: { ownerId, accountType: EAccountType.CASH } });
  };

  const handleAddMoney = () => {
    dispatch(setShowAddMoneySheet(true));
  };

  return (
    <SContainer>
      <div className="web-view-container">
        <Box changeDirection>
          <Box changeDirection>
            <div onClick={handleBoxClick}>
              <BodyText size="N" fontWeight="R" color="charcoal70" cursorPointer textType="bodyText">
                {t('homeScreen.Combined Account Balance')}
              </BodyText>
              <CustomAmount
                className="combined-balance"
                lineHeight={1.2}
                isPoppins
                amount={combinedAmount}
                multiSizable
                remainingSize="xl"
                remainingWeight={600}
                color={combinedAmount < 0 ? 'red' : 'charcoal'}
                size="largest"
                cursorPointer
                align="left"
              />
            </div>

            <SAddMoneyButton onClick={handleAddMoney}>{t('addMoney.Button')}</SAddMoneyButton>
          </Box>
        </Box>

        <SCashAccountCard onClick={openCardHub}>
          <div className="card-top">
            <div>
              <BodyText textType="bodyText" color="charcoal" fontWeight="R" size="N">
                {t('homeScreen.Available')}
              </BodyText>
              {cashAmount !== undefined && <CustomAmount amount={cashAmount} remainingWeight={600} remainingSize="xl" color="charcoal" size="larger" multiSizable cursorPointer />}
            </div>

            <div className="see-more">
              <BodyText textType="bodyText" color="blue" fontWeight="R" size="N" cursorPointer>
                {t('tenxPayHome.See more')}
              </BodyText>
            </div>
          </div>

          <div className="card-number">
            <BodyText textType="bodyText" color="charcoal" fontWeight="R" size="N">
              **** **** **** {debitCardNumber?.slice(-4) ?? '0000'}
            </BodyText>
            <VisaLogo className="visa" />
          </div>
        </SCashAccountCard>
      </div>

      <div className="mobile-view-container">
        <div className="available-container" onClick={handleBoxClick}>
          <div className="text">
            <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B">
              {t('homeScreen.Cash Account')}
            </BodyText>
            <BodyText textType="bodyText" color="charcoal70" size="T" fontWeight="R">
              {t('homeScreen.AvailableToSpend')}
            </BodyText>
          </div>

          <div className="amount">
            {cashAmount !== undefined && (
              <CustomAmount isPoppins amount={cashAmount} multiSizable remainingSize="smaller" remainingWeight={600} color="charcoal" size="xl" cursorPointer align="left" />
            )}
            <Icon name="chevronRight" cursorPointer size="smaller" color="blue" />
          </div>
        </div>

        <div className="add-money-container">
          <SAddMoneyButton onClick={handleAddMoney}>
            {t('addMoney.Button')} <Icon className="plus-icon" color="green" name="circlePlus" size="small" />
          </SAddMoneyButton>

          <div className="mini-card">
            <SCashAccountCardMini onClick={openCardHub}>
              <img src={Card} width="58px" alt="card" />
            </SCashAccountCardMini>
            <Icon name="chevronRight" color="blue" size="smaller" cursorPointer />
          </div>
        </div>
      </div>
    </SContainer>
  );
};
