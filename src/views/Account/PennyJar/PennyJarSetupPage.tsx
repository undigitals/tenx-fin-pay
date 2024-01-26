import React, { useEffect, useState } from 'react';
import { Loader } from 'components/general/Loader/Loader';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { handleError } from 'utils/helpers/errorHelper';
import { IAccountItem } from 'store/user/accounts/accounts.types';
import { usePennyJar } from 'utils/hooks/usePennyJar';
import { ROUTES } from 'vars/const/ROUTES';
import { useSelector } from 'react-redux';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { useToggle } from 'utils/hooks/useToggle';
import { PennyJarActivatedModal } from 'views/Account/PennyJar/PennyJarActivatedModal/PennyJarActivatedModal';
import { Icon } from 'components/general/Icon/Icon';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { DestinationAccount } from './DestinationAccount/DestinationAccount';
import { SLayout } from './PennyJarSetup.styles';
import { TransferToSheet } from './TransferToSheet/TransferToSheet';
import { AccountSelector } from './AccountSelector/AccountSelector';

export const PennyJarSetupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pennyJarActivatedModal = useToggle();
  const { isDesktopSize } = useDeviceDimension();

  const { selectedAccountInformation } = useSelector(selectAccountsData);
  const { changeFeature, changeAccountFeatureResult, pushToDestinationAccounts } = usePennyJar();
  const [destinationAccount, setDestinationAccount] = useState({} as IAccountItem);

  const handleOnActivate = () => {
    changeFeature(selectedAccountInformation.accountId, true, destinationAccount.accountId);
  };

  const handleAccountSelection = (account: IAccountItem) => {
    setDestinationAccount(account);
    pushToDestinationAccounts(account);
  };

  const handleOnClose = () => {
    pennyJarActivatedModal.hide();
    navigate(ROUTES.pennyJarActivate.path);
  };

  const handleBack = () => {
    navigate(ROUTES.pennyJar.path);
  };

  useEffect(() => {
    if (changeAccountFeatureResult.isSuccess) {
      pennyJarActivatedModal.show();
    }

    if (changeAccountFeatureResult.isError) {
      handleError(changeAccountFeatureResult?.error);
    }
  }, [changeAccountFeatureResult, navigate]);

  if (changeAccountFeatureResult.isLoading) return <Loader />;

  return (
    <>
      <SLayout>
        <div>
          <div className="header">
            <Icon name="arrowLeft" cursorPointer color="blue" onClick={handleBack} className="back" />
            <span className="title">{t('pennyJar.SetupTitle')}</span>
          </div>

          <div>
            <div className="title-container">
              {!isDesktopSize && <span className="title">{t('pennyJar.SetupTitle')}</span>}
              <span className="subtitle">{t('pennyJar.SetupSubTitle')}</span>
              <span className="description"> {t('pennyJar.SetupDescription')}</span>
            </div>
            {isDesktopSize ? (
              <div className="center">
                <div className="select-card">
                  <AccountSelector destinationAccount={destinationAccount} handleAccountSelect={handleAccountSelection} />
                  <div className="btn-container">
                    <CustomButton preset="primary" onClick={handleOnActivate} marginTop={25} disabled={!destinationAccount.type}>
                      {t('pennyJar.Activate')}
                    </CustomButton>
                  </div>
                </div>
              </div>
            ) : (
              <DestinationAccount destinationAccount={destinationAccount} />
            )}
          </div>
        </div>

        <div>
          {!isDesktopSize && (
            <CustomButton preset="primary" onClick={handleOnActivate} marginTop={25} marginBottom={25} disabled={!destinationAccount.type}>
              {t('pennyJar.Activate')}
            </CustomButton>
          )}

          <div className="disclosure-container">
            <span>{t('pennyJar.WhatIsTenx')}</span>
          </div>
        </div>
      </SLayout>

      <TransferToSheet handleAccountSelect={handleAccountSelection} />
      <PennyJarActivatedModal open={pennyJarActivatedModal.isActive} onClose={handleOnClose} isClosable />
    </>
  );
};
