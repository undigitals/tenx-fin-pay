import React, { useEffect } from 'react';
import { images } from 'assets';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { setSelectedAccountInformation } from 'store/user/accounts/accounts.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { usePennyJar } from 'utils/hooks/usePennyJar';
import { ROUTES } from 'vars/const/ROUTES';
import { Icon } from 'components/general/Icon/Icon';
import CashAccount from './Images/CashAccount.svg';
import { SLayout } from './PennyJarPage.styles';

export const PennyJarPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { accounts } = usePennyJar();

  const hasAccount = !!accounts && accounts.length > 0;

  const handleOnContinue = () => {
    if (hasAccount) {
      navigate(ROUTES.pennyJarSetup.path);
    } else {
      navigate(ROUTES.openAccountMain.path);
    }
  };

  const handleBack = () => {
    navigate(ROUTES.home.path);
  };

  // Set basic cash account for Penny Jar
  useEffect(() => {
    const account = accounts?.find((acct) => acct.type === 'Cash' && acct.owner);
    if (account) {
      dispatch(setSelectedAccountInformation(account));
    }
  }, []);

  return (
    <SLayout>
      <div>
        <div className="header">
          <Icon name="arrowLeft" cursorPointer color="blue" onClick={handleBack} className="back" />
          <span className="title">{t('pennyJar.Title')}</span>
        </div>

        <div className="title-container">
          <span className="subtitle">{t('pennyJar.SubTitle')}</span>
          <span className="description">{t('pennyJar.Description')}</span>
        </div>

        {hasAccount ? (
          <div className="center">
            <div className="info-card">
              <div className="logo-container">
                <img src={images.pennyJarMainLogo} className="logo" alt="Penny Jar" />
              </div>

              <div className="text-container">
                <span className="title">{t(`pennyJar.CarouselTitle1`)}</span>
                <span className="description">{t(`pennyJar.CarouselSubtitle1`)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="center">
            <div className="info-card">
              <div className="logo-container">
                <img src={CashAccount} className="logo" alt="Cash Account" />
              </div>

              <div className="text-container">
                <span className="title">{t('pennyJar.CashAccountTitle')}</span>
                <span className="description">{t('pennyJar.CashAccountSubtitle')}</span>
              </div>
            </div>
          </div>
        )}

        <div className="btn-container">
          <CustomButton preset="primary" onClick={handleOnContinue} marginBottom={20} marginTop={20}>
            {hasAccount ? t('pennyJar.SetUp') : t('pennyJar.OpenCash')}
          </CustomButton>
        </div>
      </div>

      <div className="disclosure-container">
        <span>{t('pennyJar.WhatIsTenx')}</span>
      </div>
    </SLayout>
  );
};
