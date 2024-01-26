import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { Title } from 'components/general/Typography';
import { selectDisplayDestinationAccountDrawer, setShowDestinationAccountDrawer, setShowHistoryFilterDrawer } from 'store/ui.slice';
import { selectHistoryFilterParameters, setDestinationAccount } from 'store/historyFilter/historyFilter.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { useGetUserProfileDataMutation } from 'store/user/users.api';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { SContentWrapperStyle } from 'components/general/BottomDrawers/HistoryFilterSheet/HistoryFilterSheet.styles';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { selectPaymentsAccountsData } from 'store/user/payments/payments.slice';
import { DestinationAccount } from './DestinationAccount/DestinationAccount';

export const DestinationAccountSheet: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isDrawerVisible = useSelector(selectDisplayDestinationAccountDrawer);
  const historyFilterParams = useSelector(selectHistoryFilterParameters);
  const destinationAccount = historyFilterParams?.destinationAccount;
  const { accounts } = useSelector(selectPaymentsAccountsData);
  const [unAppliedDestinationAccount, setUnAppliedDestinationAccount] = useState(destinationAccount);
  const [getUserProfileData] = useGetUserProfileDataMutation();
  const userProfileData = useSelector(selectCurrentUser);
  const userId = userProfileData?.userId;

  const handleOnClose = () => {
    dispatch(setShowDestinationAccountDrawer(false));
    dispatch(setShowHistoryFilterDrawer(true));
  };

  const handleApplyClick = () => {
    dispatch(setDestinationAccount(unAppliedDestinationAccount));
    dispatch(setShowDestinationAccountDrawer(false));
    dispatch(setShowHistoryFilterDrawer(true));
  };

  const handleDestinationAccountChanged = (id: number, title: string, alias: string, iconName: string) => {
    setUnAppliedDestinationAccount({ id, title, alias, iconName });
  };

  useEffect(() => {
    if (isDrawerVisible) {
      setUnAppliedDestinationAccount(destinationAccount);

      if (userId) getUserProfileData({ userId });
    }
  }, [isDrawerVisible]);

  return (
    <CustomSheet isOpen={isDrawerVisible} onClose={handleOnClose} header headerStyle={{ minHeight: 0, padding: 0 }} wrapperPadding={false} height="61%" contentWrapperStyle={SContentWrapperStyle}>
      <CustomRow minHeight="100%" flexDirection="column" paddingTop={10}>
        <CustomRow flexDirection="column" width="100%" justifyContent="flex-start" alignItems="flex-start">
          <CustomRow justifyContent="flex-start" alignItems="center" marginBottom={30}>
            <Icon name="arrowLeft" color="charcoal" cursorPointer size="small" onClick={handleOnClose} />

            <Title size="S" fontWeight="SB" font="Poppins" marginLeft={15}>
              {t(`tenxPayHome.Destination Account`)}
            </Title>
          </CustomRow>

          {accounts?.map(({ id, alias, details, accountType, name, accountTypeDetails, primaryAccount }) => (
            <DestinationAccount
              id={id}
              key={id}
              name={name}
              alias={alias}
              details={details}
              accountType={accountType}
              primaryAccount={primaryAccount}
              accountTypeDetails={accountTypeDetails}
              onChange={handleDestinationAccountChanged}
              unAppliedDestinationAccount={unAppliedDestinationAccount}
            />
          ))}
        </CustomRow>

        <CustomButton preset="primary" size="middleStretch" onClick={handleApplyClick} marginTop={26}>
          {t('tenxPayHome.Select Account')}
        </CustomButton>
      </CustomRow>
    </CustomSheet>
  );
};
