import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { ExitIcon } from 'views/OpenCashAccount/MyInfo/ExitIcon';
import { setHeaderTitle } from 'store/ui.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { useLazyGetCurrentUserQuery, usersApi } from 'store/user/users.api';
import { useAddAccountMutation } from 'store/user/accounts/accounts.api';
import { Loader } from 'components/general/Loader/Loader';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { EKycFlowStatusType, useKYC } from 'utils/hooks/useKYC';
import { EAccountType } from 'store/user/accounts/accounts.types';
import { selectSystemProperties } from 'store/user/authentication.slice';
import { API_RESPONSE_CODES } from 'vars/const/API_CODES';
import { STableOfContentPage } from './TableOfContentPage.styles';
import { Step } from './Step/Step';

export interface IListText {
  text: string;
  description: string;
}

const myInfoList: IListText[] = [
  {
    text: 'Review and accept electronic consent',
    description: '',
  },
  {
    text: 'Provide personal information',
    description: '',
  },
];

const myAccountList: IListText[] = [
  {
    text: 'Provide additional information',
    description: '',
  },
  {
    text: 'Add a joint accountholder (if applicable)',
    description: '',
  },
  {
    text: 'Review and accept terms and conditions',
    description: '',
  },
];

const myIdList: IListText[] = [
  {
    text: 'Review photo ID requirements',
    description: '',
  },
  {
    text: 'Submit ID document(s)',
    description: '',
  },
];

// TODO: Completed and laoding state
export const TableOfContentPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { openingAccountData } = useCashAccountOpening();
  const { pii, document, KYCStatus, isLoading: isKycLoading } = useKYC();
  const [addAccount, addAccountResult] = useAddAccountMutation();
  const [getCurrentUser, getCurrentUserResult] = useLazyGetCurrentUserQuery();
  const { myDetailsStatus } = openingAccountData;
  const isMyDetailsCompleted = myDetailsStatus === EKycFlowStatusType.DONE;
  const isLoading = isKycLoading || addAccountResult?.isLoading || getCurrentUserResult?.isLoading;
  const { supportPhoneNumber } = useSelector(selectSystemProperties);
  const invalidateMenuData = useCallback(() => dispatch(usersApi.util.invalidateTags(['Menu'])), [dispatch]);

  const handleOpenAccount = () => {
    addAccount({
      tenxAccountType: EAccountType.CASH,
      nickname: '',
    })
      .unwrap()
      .then(() => {
        getCurrentUser()
          .unwrap()
          .then(() => {
            navigate(ROUTES.home.path);
          });
      })
      .catch((error) => {
        if (error.data?.Code === API_RESPONSE_CODES.FISERV_ADD_CARD_ERROR || error.data?.Code === API_RESPONSE_CODES.PARTY_ID_CREATED_FAILED_TO_OPEN_ACCOUNT) {
          invalidateMenuData();
          navigate(ROUTES.home.path);
        }
      });
  };

  useEffect(() => {
    dispatch(setHeaderTitle(t('accountOpening.Cash Account Opening')));
  }, []);

  return (
    <STableOfContentPage>
      {isLoading && <Loader />}
      <CustomRow alignItems="flex-start" marginBottom={32}>
        <Title font="Poppins" textAlign="start" fontWeight="SB" size="M">
          {t('accountOpening.Complete 3 easy steps')}
        </Title>
        <ExitIcon />
      </CustomRow>
      <CustomRow alignItems="flex-start">
        <CustomRow flexDirection="column" alignItems="stretch" width="100%" paddingLeft={47}>
          <Step
            title="My Info"
            iconName="myInfo"
            stepNumber={1}
            listingText={myInfoList}
            color="purple"
            bgColor="purple10"
            to={ROUTES.myInfoEConsent.path}
            minute={`1 ${t('accountOpening.minute')}`}
            navText={t('accountOpening.Go to My Info')}
            status={pii.flowStatus}
          />

          <Step
            title="My Details"
            iconName="depositAccount"
            stepNumber={2}
            listingText={myAccountList}
            color="orange"
            bgColor="orange10"
            to={ROUTES.myAccountAccounts.path}
            minute={`4 ${t('accountOpening.minutes')}`}
            navText={t('accountOpening.Go to My Details')}
            isDisabled={!pii.status}
            status={myDetailsStatus}
          />

          <Step
            title="My ID"
            iconName="myInfo"
            stepNumber={3}
            listingText={myIdList}
            color="bluePurple"
            bgColor="bluePurple10"
            to={ROUTES.myId.path}
            isDisabled={!pii.status || !isMyDetailsCompleted}
            minute={`3 ${t('accountOpening.minute')}`}
            navText={t('accountOpening.Go to My ID')}
            status={document.flowStatus}
            isLast
          />
        </CustomRow>
      </CustomRow>

      <CustomButton preset="primary" disabled={!KYCStatus} marginBottom={28} onClick={handleOpenAccount}>
        {t('accountOpening.Open My Account')}
      </CustomButton>

      <CustomRow flexDirection="column" justifyContent="space-between" alignItems="center" marginBottom={20} marginTop={35}>
        <BodyText textType="bodyText" textAlign="center" size="L" fontWeight="B" color="charcoal" font="DM Sans">
          {t('accountOpening.Need help?')}
        </BodyText>

        <Icon name="telephone" size="normal" color="blue" marginTop={20} marginBottom={15} />

        <BodyText textType="bodyText" textAlign="center" size="N" fontWeight="B" color="charcoal" font="DM Sans">
          {supportPhoneNumber}
        </BodyText>
      </CustomRow>

      <CustomRow marginBottom={20} marginTop={24}>
        <BodyText textType="bodyText" size="T" fontWeight="R" color="charcoal70" marginLeft={15}>
          {t('accountOpening.We save your progress along the way so that you can finish setting up your account at any point.')}
        </BodyText>
      </CustomRow>

      <CustomRow justifyContent="center" marginBottom={20} paddingBottom={10}>
        <BodyText textType="helperText" textAlign="start" color="charcoal50" size="N" fontWeight="R" marginLeft={15}>
          {t(
            'accountOpening.Tenx Group, Inc., is a digital company that provides access to products and services to help improve financial wellness. Tenx deposit accounts are provided by Sutton Bank, Member FDIC'
          )}
        </BodyText>
      </CustomRow>
    </STableOfContentPage>
  );
};
