import React from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'vars/const/ROUTES';
import { useNavigate, useLocation } from 'react-router-dom';
import { Title, BodyText } from 'components/general/Typography';
import { Card } from 'views/MoveMoney/NewSourceAndFunds/Card/Card';
import { useSelector } from 'react-redux';
import { selectPolicies } from 'store/user/authentication.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { setShowComingSoonModal } from 'store/ui.slice';
import { SCustomCard } from './AddNewSourceSection.style';

interface IAddNewSourceSection {
  noAccounts: boolean;
}

export const AddNewSourceSection: React.FC<IAddNewSourceSection> = ({ noAccounts }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const policies = useSelector(selectPolicies);

  const openComingSoonModal = (): void => {
    dispatch(setShowComingSoonModal(true));
  };

  const handleAddNewDebitCard = () => {
    if (policies?.ExternalDebitCardTransferEnabled) {
      navigate(ROUTES.addNewSourceDebit.path, {
        state: {
          fundingDestination: 'debit',
        },
      });
    } else {
      openComingSoonModal();
    }
  };

  const handleAddNewBankAccount = () => {
    if (policies?.ExternalACHTransferEnabled) {
      navigate(ROUTES.addNewBankAccount.path, {
        state: {
          pathBack: location.pathname,
        },
      });
    } else {
      openComingSoonModal();
    }
  };

  return (
    <>
      <Title size="S" fontWeight="SB" color="charcoal" marginBottom={15} marginTop={noAccounts ? 0 : 65} className="add-account-title">
        {noAccounts ? t('moveMoney.AddExternalAccount') : t('moveMoney.AddAnotherExternalAccount')}
      </Title>
      <BodyText textType="bodyText" color="charcoal60" fontWeight="SM" size="M" font="DM Sans" marginBottom={32}>
        {t('moveMoney.ChooseTypeAccount')}
      </BodyText>
      <SCustomCard cursorPointer>
        <Card title={t('moveMoney.AddNewDebitCard')} subtitle={t('moveMoney.AddDebitCardNumberToTransfer')} onClick={handleAddNewDebitCard} showNext={noAccounts} iconName="creditCard" />
      </SCustomCard>
      <SCustomCard cursorPointer>
        <Card
          title={t('moveMoney.BankAccount')}
          subtitle={t('moveMoney.BankAccountNumberViaACH')}
          subtitleInline={t(`moveMoney.ComingSoon`)}
          onClick={handleAddNewBankAccount}
          showNext={false}
          iconName="bank"
        />
      </SCustomCard>
    </>
  );
};
