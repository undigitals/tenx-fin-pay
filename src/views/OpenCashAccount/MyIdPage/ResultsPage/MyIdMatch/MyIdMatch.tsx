import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from 'vars/const/ROUTES';
import { ResultsPage } from 'views/OpenCashAccount/MyIdPage/ResultsPage/ResultsPage';
import { BodyText } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { useAddAccountMutation } from 'store/user/accounts/accounts.api';
import { EAccountType } from 'store/user/accounts/accounts.types';
import { selectPolicies } from 'store/user/authentication.slice';
import { API_RESPONSE_CODES } from 'vars/const/API_CODES';
import { useLazyGetCurrentUserQuery, usersApi } from 'store/user/users.api';
import { useAppDispatch } from 'utils/hooks/store';
import { Loader } from 'components/general/Loader/Loader';
import { useProperties } from 'utils/hooks/useProperties';
import { ErrorModal } from './ErrorModal';

const JOINT_TYPES = ['Joint', 'JointOwner'];

export const MyIdMatch: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { getProperty } = useProperties();
  const [addAccount, addAccountResult] = useAddAccountMutation();
  const [getCurrentUser, getCurrentUserResult] = useLazyGetCurrentUserQuery();
  const invalidateMenuData = useCallback(() => dispatch(usersApi.util.invalidateTags(['Menu'])), [dispatch]);
  const policies = useSelector(selectPolicies);

  const handleGoToMain = () => {
    navigate(ROUTES.home.path);
  };

  const handleOpenAccount = async () => {
    const caoType = await getProperty('CAOType').unwrap();

    addAccount({
      tenxAccountType: EAccountType.CASH,
      nickname: '',
      jointInviteType: JOINT_TYPES.includes(caoType) ? caoType : '',
    })
      .unwrap()
      .then(() => {
        getCurrentUser()
          .unwrap()
          .then(() => {
            navigate(ROUTES.myIdSuccess.path);
          });
      })
      .catch((error) => {
        if (error.data?.Code === API_RESPONSE_CODES.FISERV_ADD_CARD_ERROR || error.data?.Code === API_RESPONSE_CODES.PARTY_ID_CREATED_FAILED_TO_OPEN_ACCOUNT) {
          invalidateMenuData();
          navigate(ROUTES.home.path);
        }
      });
  };

  return (
    <>
      {(addAccountResult?.isLoading || getCurrentUserResult?.isLoading) && <Loader />}
      <ResultsPage
        image="success"
        title={t('preRegOnboarding.ThankYou')}
        btnTitle={t(policies?.AccountOpeningEnabled ? 'accountOpening.Open My Account' : 'accountOpening.GoToMainPage')}
        onClick={policies?.AccountOpeningEnabled ? handleOpenAccount : handleGoToMain}
      >
        <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="M" justifyContent="center" lineHeight="24px">
          {t('accountOpening.IDVerified')}
        </BodyText>
        <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="M" textAlign="center" lineHeight="24px">
          {t('accountOpening.SubmitYourApplication')}
        </BodyText>
      </ResultsPage>
      <ErrorModal open={addAccountResult.isError} />
    </>
  );
};
