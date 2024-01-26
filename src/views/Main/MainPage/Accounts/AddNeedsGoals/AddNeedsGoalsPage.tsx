import React, { useEffect, useState } from 'react';
import { images } from 'assets';
import { Loader } from 'components/general/Loader/Loader';
import { Title, BodyText } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { setShowStuffSaveAccountErrorModal } from 'store/ui.slice';
import { useAddAccountMutation } from 'store/user/accounts/accounts.api';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { ROUTES } from 'vars/const/ROUTES';
import { EAccountType, IAccountItem } from 'store/user/accounts/accounts.types';
import { Header } from 'views/Main/Header/Header';
import { Breadcrumbs } from 'views/Main/Header/Breadcrumbs/Breadcrumbs';
import { TBreadcrumbsPath } from 'views/OpenCashAccount/StarterPage/CashAccOpeningDesktopPage/CashAccOpeningDesktopPage';
import { Card } from './Card/Card';
import { SBodyText, SAddNeedsGoalsPage, SList, SListItem } from './AddNeedsGoals.styles';

export const AddNeedsGoalsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();
  const { addAccountType } = useSelector(selectAccountsData);
  const [isAccountExist, setIsAccountExist] = useState(false);
  const userProfileData = useSelector(selectCurrentUser);
  const [addAccountAPI, addAccountAPIResult] = useAddAccountMutation();

  // const addAccountType = 'goals';

  const pathList: TBreadcrumbsPath[] = [
    { id: 0, name: ROUTES.home.title, path: ROUTES.home.path },
    { id: 1, name: addAccountType === 'needs' ? t('addAccount.needs.ChainTitle') : t('addAccount.goals.ChainTitle') },
  ];

  const addAccount = async () => {
    const tenxAccountType = addAccountType === 'needs' ? EAccountType.STUFF : EAccountType.SAVE;

    await addAccountAPI({
      tenxAccountType,
    });
  };

  const handleOpenAccount = () => {
    addAccount();
  };

  useEffect(() => {
    if (addAccountAPIResult?.isSuccess) navigate(ROUTES.successAddNeedsGoalsAccount.path);
    if (addAccountAPIResult?.isError) {
      dispatch(setShowStuffSaveAccountErrorModal(true));
    }
  }, [addAccountAPIResult?.isSuccess, addAccountAPIResult?.isError]);

  useEffect(() => {
    if (userProfileData?.accounts) {
      const filteredAccountTypes = userProfileData.accounts.filter((accountType: IAccountItem) => accountType.type !== EAccountType.CASH);

      if (addAccountType === 'needs') setIsAccountExist(filteredAccountTypes?.length > 0 ? filteredAccountTypes.every((accountType: IAccountItem) => accountType.type === EAccountType.STUFF) : false);
      if (addAccountType === 'goals') setIsAccountExist(filteredAccountTypes?.length > 0 ? filteredAccountTypes.every((accountType: IAccountItem) => accountType.type === EAccountType.SAVE) : false);
    }
  }, []);

  if (addAccountAPIResult?.isLoading) return <Loader />;

  if (isDesktopSize) {
    return (
      <div>
        <Breadcrumbs paths={pathList} title={addAccountType === 'needs' ? t('addAccount.needs.Title') : t('addAccount.goals.Title')} />
        <Header headerTitle={addAccountType === 'needs' ? t('addAccount.needs.Title') : t('addAccount.goals.Title')} image={addAccountType === 'needs' ? images.addNeeds : images.addGoals}>
          <Title font="Poppins" fontWeight="R" size="sL" color="charcoal70" lineHeight={1.4} marginBottom={16} paddingRight={5}>
            {addAccountType === 'needs' ? t('addAccount.needs.Subtitle') : t('addAccount.goals.Subtitle')}
          </Title>
          <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal" lineHeight="24px">
            <Trans i18nKey={addAccountType === 'needs' ? 'addAccount.needs.Description' : 'addAccount.goals.Description'} />
          </BodyText>
        </Header>

        <Card
          title={t(addAccountType === 'needs' ? 'addAccount.needs.important.Title' : 'addAccount.goals.important.Title')}
          name="moneyTransferCircle"
          handleOpenAccount={handleOpenAccount}
          isAccountExist={isAccountExist}
          addAccountType={addAccountType}
          list={[
            <Trans i18nKey={addAccountType === 'needs' ? 'addAccount.needs.important.SetAside' : 'addAccount.goals.important.LongTerm'} />,
            <Trans i18nKey="addAccount.NotLinked" />,
            <Trans i18nKey="addAccount.TransferFunds" />,
            <Trans i18nKey="addAccount.FDIC" />,
          ]}
        />

        <SBodyText textType="bodyText" color="charcoal70" size="S" fontWeight="R" textAlign="start">
          {t('starter.legal')}
        </SBodyText>
      </div>
    );
  }

  return (
    <SAddNeedsGoalsPage flexDirection="column" minHeight="100%">
      <CustomRow flexDirection="column" width="100%">
        <CustomRow justifyContent="center" alignItems="center" paddingTop={14} marginBottom={30}>
          <img src={addAccountType === 'needs' ? images.addNeeds : images.addGoals} alt={addAccountType === 'needs' ? 'addNeeds' : 'addGoals'} />
        </CustomRow>
        <CustomRow flexDirection="column" alignItems="flex-start" width="100%">
          <Title color="charcoal" font="Poppins" fontWeight="SB" size="L" textAlign="start">
            {addAccountType === 'needs' ? t('addAccount.needs.Title') : t('addAccount.goals.Title')}
          </Title>

          <Title color="charcoal" font="Poppins" fontWeight="R" size="T" textAlign="start" marginTop="spacing-tiny">
            {addAccountType === 'needs' ? t('addAccount.needs.Subtitle') : t('addAccount.goals.Subtitle')}
          </Title>
        </CustomRow>

        <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal" marginTop="spacing-x-large" lineHeight="24px">
          <Trans i18nKey={addAccountType === 'needs' ? 'addAccount.needs.Description' : 'addAccount.goals.Description'} />
        </BodyText>
        <BodyText textType="bodyText" size="M" fontWeight="B" color="charcoal" marginTop="spacing-med" lineHeight="24px" extraStyles={{ width: '100%' }}>
          <Trans i18nKey={addAccountType === 'needs' ? 'addAccount.needs.important.Title' : 'addAccount.goals.important.Title'} />
        </BodyText>
        <SList>
          <SListItem>
            <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal70" lineHeight="24px">
              <Trans i18nKey={addAccountType === 'needs' ? 'addAccount.needs.important.SetAside' : 'addAccount.goals.important.LongTerm'} />
            </BodyText>
          </SListItem>
          <SListItem>
            <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal70" lineHeight="24px">
              <Trans i18nKey="addAccount.NotLinked" />
            </BodyText>
          </SListItem>
          <SListItem>
            <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal70" lineHeight="24px">
              <Trans i18nKey="addAccount.TransferFunds" />
            </BodyText>
          </SListItem>
          <SListItem>
            <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal70" lineHeight="24px">
              <Trans i18nKey="addAccount.FDIC" />
            </BodyText>
          </SListItem>
        </SList>
      </CustomRow>

      <CustomRow width="100%" marginBottom={34}>
        <CustomButton preset="primary" onClick={handleOpenAccount} disabled={isAccountExist}>
          {addAccountType === 'needs' ? t('addAccount.needs.Button') : t('addAccount.goals.Button')}
        </CustomButton>
      </CustomRow>

      <BodyText textType="bodyText" size="T" fontWeight="R" marginBottom="spacing-x-large" color="charcoal70" textAlign="start" lineHeight="16px">
        {t('addAccount.Disclosure')}
      </BodyText>
    </SAddNeedsGoalsPage>
  );
};
