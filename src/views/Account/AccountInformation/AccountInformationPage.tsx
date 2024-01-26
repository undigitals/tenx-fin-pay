import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Title } from 'components/general/Typography';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { setSelectedAccountInformation } from 'store/user/accounts/accounts.slice';
import { IAccountItem } from 'store/user/accounts/accounts.types';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { ROUTES } from 'vars/const/ROUTES';
import { AccountListItem } from './AccountListItem/AccountListItem';

export const AccountInformationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { accounts } = useSelector(selectCurrentUser) || {};

  const cashAccounts = accounts?.filter((account) => account.type === 'Cash').sort((a, b) => Number(b.owner) - Number(a.owner));

  useEffect(() => {
    if (location?.state?.isByBack && (!cashAccounts || cashAccounts.length <= 1)) {
      navigate(ROUTES.mainMenu.path);
    } else if (cashAccounts?.length === 1 && !location?.state?.isByBack) {
      dispatch(setSelectedAccountInformation(cashAccounts[0]));
      navigate(ROUTES.selectedAccountInformation.path);
    }
  }, [cashAccounts, dispatch, location?.state?.isByBack, navigate]);

  const handleAccountClick = (account: IAccountItem) => {
    dispatch(setSelectedAccountInformation(account));
    navigate(ROUTES.selectedAccountInformation.path);
  };

  return (
    <>
      <Title font="Poppins" color="charcoal" fontWeight="SB" size="S" marginBottom={25}>
        {t('accountInformation.title')}
      </Title>

      <CustomRow flexDirection="column">
        {!cashAccounts?.length ? (
          <CustomText textColor="charcoal40">{t('accountInformation.noAccounts')}</CustomText>
        ) : (
          cashAccounts.map((account) => <AccountListItem account={account} onClick={() => handleAccountClick(account)} key={account.accountId} />)
        )}
      </CustomRow>
    </>
  );
};
