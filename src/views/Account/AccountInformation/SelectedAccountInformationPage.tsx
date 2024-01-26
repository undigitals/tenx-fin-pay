import React, { useEffect, useMemo, useState } from 'react';
import i18next from 'i18next';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText, Title } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { selectCurrentAuthState, selectCurrentUser, selectPolicies } from 'store/user/authentication.slice';
import { ROUTES } from 'vars/const/ROUTES';
import { usePennyJar } from 'utils/hooks/usePennyJar';
import { Loader } from 'components/general/Loader/Loader';
import { handleError } from 'utils/helpers/errorHelper';
import { IFeatureItem, IAccountItem } from 'store/user/accounts/accounts.types';
import { useLanguage } from 'utils/hooks/useLanguage';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { useToggle } from 'utils/hooks/useToggle';
import { DataListItem } from './DataListItem/DataListItem';
import { DebitCardItem } from './DebitCardItem/DebitCardItem';
import { GoalsHavingIssuesModal } from './modals/closingAccount/GoalsHavingIssuesModal/GoalsHavingIssuesModal';
import { GoalsUnableCloseModal } from './modals/closingAccount/GoalsUnableCloseModal/GoalsUnableCloseModal';
import { GoalsYouWantToCloseModal } from './modals/closingAccount/GoalsYouWantToCloseModal/GoalsYouWantToCloseModal';
import { GoalsAccountClosedModal } from './modals/closingAccount/GoalsAccountClosedModal/GoalsAccountClosedModal';
import { ProcessNames } from './constants';
import { ClosingAccountModal } from './modals/closingAccount/ClosingAccountModal/ClosingAccountModal';
import { PhoneLink } from './SelectedAccountInformationPage.styles';

export const SelectedAccountInformationPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const goalsHavingIssuesModal = useToggle();
  const goalsUnableCloseAccModal = useToggle();
  const goalsSureYouWantToCloseModal = useToggle();
  const goalsYourAccountClosedModal = useToggle();
  const cashClosingAccountModal = useToggle();
  const goalsCloseAccountModal = useToggle();
  const needsCloseAccountModal = useToggle();
  const { getFeatures, getAccountFeaturesResult } = usePennyJar();
  const { selectedAccountInformation } = useSelector(selectAccountsData);
  const { accounts, firstName, preferredName } = useSelector(selectCurrentUser) || {};
  const { systemProperties, user } = useSelector(selectCurrentAuthState);
  const policies = useSelector(selectPolicies);
  const hasSaveUserAccount = user?.accounts?.some(({ type }: IAccountItem) => type === 'Save');
  const hasStuffUserAccount = user?.accounts?.some(({ type }: IAccountItem) => type === 'Stuff');

  const [isRoundUpEnabled, setIsRoundUpEnabled] = useState(false);
  const [closingAccountType, setClosingAccountType] = useState('');

  const cashAccountNumber = selectedAccountInformation?.fiservAccountId;
  const goalsAccountData = accounts?.find((account: IAccountItem) => account.type === 'Save' && account.ownerId === selectedAccountInformation.ownerId);
  const goalsAccountNumber = goalsAccountData?.fiservAccountId;
  const isGoalsAccountBalance = Boolean(goalsAccountData?.balance);
  const needsAccountNumber = accounts?.find((account: IAccountItem) => account.type === 'Stuff' && account.ownerId === selectedAccountInformation.ownerId)?.fiservAccountId;

  const isOwner = selectedAccountInformation.owner;

  const title = useMemo(
    () =>
      isOwner
        ? i18next.t('accountInformation.OwnerAccountName', { name: preferredName || firstName })
        : i18next.t('accountInformation.JointAccountSubtitle', { accountNumber: cashAccountNumber?.slice(-4) }),
    [t, language, preferredName, firstName, cashAccountNumber, isOwner]
  );

  const subtitle = useMemo(
    () =>
      isOwner
        ? i18next.t('accountInformation.OwnerAccountSubTitle', { name: preferredName || firstName })
        : i18next.t('accountInformation.JointAccountSubtitle', { accountNumber: cashAccountNumber?.slice(-4) }),
    [t, language, preferredName, firstName, cashAccountNumber, isOwner]
  );

  const handleStartDeposit = () => {
    navigate(ROUTES.setUpDeposit.path);
  };

  const goalsAccountActions = {
    havingIssuesModal: {
      onConfirm: () => {
        goalsHavingIssuesModal.hide();

        if (isGoalsAccountBalance) {
          goalsUnableCloseAccModal.show();
        } else {
          goalsSureYouWantToCloseModal.show();
        }
      },
    },
    unableCloseModal: {
      transferBetweenAccountsHandler: () => {
        goalsUnableCloseAccModal.hide();

        navigate(ROUTES.internalTransfer.path, {
          state: {
            transferAccountType: closingAccountType,
            processType: ProcessNames.CLOSING_ACCOUNT,
          },
        });
      },
      onClose: () => {
        goalsUnableCloseAccModal.hide();
        goalsHavingIssuesModal.show();
      },
    },
    accountClosedModal: {
      onClose: () => {
        goalsYourAccountClosedModal.hide();
        navigate(ROUTES.home.path);
      },
    },
    youWantToCloseModal: {
      onCloseAccountClick: () => {
        goalsSureYouWantToCloseModal.hide();
        goalsYourAccountClosedModal.show();
      },
      onCancel: () => {
        goalsSureYouWantToCloseModal.hide();
        navigate(ROUTES.selectedAccountInformation.path);
      },
    },
    closeAccountModal: {
      onClose: () => goalsCloseAccountModal.hide(),
    },
  };

  const cashAccountActions = {
    closeAccountModal: {
      onClose: () => cashClosingAccountModal.hide(),
    },
  };

  const needsAccountActions = {
    closeAccountModal: {
      onClose: () => needsCloseAccountModal.hide(),
    },
  };

  const onClosingAccountClick = (accountType: string) => {
    setClosingAccountType(accountType);

    switch (accountType) {
      case 'Save':
        goalsCloseAccountModal.show();
        break;
      case 'Stuff':
        needsCloseAccountModal.show();
        break;
      case 'Cash':
      default:
        cashClosingAccountModal.show();
    }
  };

  useEffect(() => {
    getFeatures(selectedAccountInformation.accountId);
  }, []);

  useEffect(() => {
    if (getAccountFeaturesResult.isSuccess) {
      setIsRoundUpEnabled(getAccountFeaturesResult.data.find((item: IFeatureItem) => item.type === 'RoundUp')?.isEnabled);
    }

    if (getAccountFeaturesResult.isError) {
      handleError(getAccountFeaturesResult.error);
    }
  }, [getAccountFeaturesResult]);

  if (getAccountFeaturesResult.isFetching) return <Loader />;

  return (
    <div className="layout-space-between">
      <div>
        <CustomRow marginBottom={20}>
          <Title font="Poppins" color="charcoal" fontWeight="SB" size="S">
            {title}
          </Title>
        </CustomRow>

        <BodyText textType="bodyText" color="charcoal60" fontWeight="R" size="M" marginBottom={32} textAlign="start">
          {subtitle}
        </BodyText>

        <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="M" marginBottom={20} textAlign="start">
          {t('accountInformation.Account Details')}
        </BodyText>

        <CustomCard marginBottom={20}>
          <DataListItem title={t('accountInformation.Routing Number')} number={systemProperties?.routingNumber || ''} tooltip="routingNumber" />
          <CustomRow justifyContent="flex-end" marginBottom={26}>
            <BodyText textType="bodyText" fontWeight="M" size="N" color="charcoal70" marginRight={25} cursorPointer onClick={handleStartDeposit}>
              {t('accountInformation.Setup Direct Deposit')}
            </BodyText>
            <Icon name="chevronRight" color="charcoal" cursorPointer size="smaller" onClick={handleStartDeposit} />
          </CustomRow>
          {cashAccountNumber && <DataListItem title={t('accountInformation.Cash Account Number')} number={cashAccountNumber} tooltip="accountNumber" />}
          {goalsAccountNumber && <DataListItem title={t('accountInformation.Goals Account Number')} number={goalsAccountNumber} />}
          {needsAccountNumber && <DataListItem title={t('accountInformation.Needs Account Number')} number={needsAccountNumber} isLast />}
        </CustomCard>

        <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="M" marginBottom={20} textAlign="start">
          {t('accountInformation.Debit Card')}
        </BodyText>

        <CustomRow flexDirection="column" justifyContent="flex-start">
          <DebitCardItem title={t('accountInformation.Debit Cards')} subTitle={t('accountInformation.View Debit Cards')} to="cardHub" />

          {policies?.PennyJarEnabled && hasSaveUserAccount && hasStuffUserAccount && (
            <DebitCardItem
              title={t('accountInformation.Debit Round Up')}
              subTitle={isRoundUpEnabled ? t('accountInformation.View Penny Jar') : t('accountInformation.Set Up Penny Jar')}
              to={isRoundUpEnabled ? ROUTES.pennyJarActivate.path : ROUTES.pennyJarSetup.path}
            />
          )}

          {policies?.CashCushionEnabled && <DebitCardItem title={t('accountInformation.OptionToOverdraw')} subTitle={t('accountInformation.Cash Cushion')} isLast />}
        </CustomRow>

        {policies?.AccountClosingEnabled && (
          <>
            <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="M" marginBottom={20} textAlign="start">
              {t('accountInformation.CloseAccount')}
            </BodyText>

            <CustomRow flexDirection="column" justifyContent="flex-start" marginBottom={16}>
              <DebitCardItem title="" subTitle={t('accountInformation.RequestToCloseCashAccount')} prefix="cash" clickHandler={() => onClosingAccountClick('Cash')} />

              {hasStuffUserAccount && (
                <DebitCardItem title="" subTitle={t('accountInformation.RequestToCloseNeedsAccount')} prefix="needsAccount" clickHandler={() => onClosingAccountClick('Stuff')} />
              )}

              {hasSaveUserAccount && <DebitCardItem title="" subTitle={t('accountInformation.RequestToCloseGoalsAccount')} prefix="goal" clickHandler={() => onClosingAccountClick('Save')} />}
            </CustomRow>
          </>
        )}
      </div>

      <CustomRow>
        <SuttonDisclaimerNote />
      </CustomRow>

      {/* Modals */}
      {/* Goals */}
      <GoalsHavingIssuesModal open={goalsHavingIssuesModal.isActive} onClose={goalsHavingIssuesModal.hide} onConfirm={goalsAccountActions.havingIssuesModal.onConfirm} />

      <GoalsUnableCloseModal
        open={goalsUnableCloseAccModal.isActive}
        onClose={goalsAccountActions.unableCloseModal.onClose}
        transferHandler={goalsAccountActions.unableCloseModal.transferBetweenAccountsHandler}
      />

      <GoalsYouWantToCloseModal
        open={goalsSureYouWantToCloseModal.isActive}
        onClose={goalsSureYouWantToCloseModal.hide}
        onCloseMyGoalsAccountClick={goalsAccountActions.youWantToCloseModal.onCloseAccountClick}
        onCancel={goalsAccountActions.youWantToCloseModal.onCancel}
      />

      <GoalsAccountClosedModal open={goalsYourAccountClosedModal.isActive} onClose={goalsAccountActions.accountClosedModal.onClose} />
      <ClosingAccountModal
        open={cashClosingAccountModal.isActive}
        onClose={cashAccountActions.closeAccountModal.onClose}
        title={t('accountInformation.CloseCashAccount')}
        description={<Trans i18nKey="accountInformation.ToCloseYourCashAccountYouWillNeed" components={{ phone: <PhoneLink href="tel:(888) 302-5055">(888) 302-5055</PhoneLink> }} />}
      />
      <ClosingAccountModal
        open={goalsCloseAccountModal.isActive}
        onClose={goalsAccountActions.closeAccountModal.onClose}
        title={t('accountInformation.CloseGoalsAccount')}
        description={<Trans i18nKey="accountInformation.ToCloseYourGoalsAccountYouWillNeed" components={{ phone: <PhoneLink href="tel:(888) 302-5055">(888) 302-5055</PhoneLink> }} />}
      />
      <ClosingAccountModal
        open={needsCloseAccountModal.isActive}
        onClose={needsAccountActions.closeAccountModal.onClose}
        title={t('accountInformation.CloseNeedsAccount')}
        description={<Trans i18nKey="accountInformation.ToCloseYourNeedsAccountYouWillNeed" components={{ phone: <PhoneLink href="tel:(888) 302-5055">(888) 302-5055</PhoneLink> }} />}
      />
    </div>
  );
};
