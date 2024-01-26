import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePennyJar } from 'utils/hooks/usePennyJar';
import { useSelector } from 'react-redux';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { Loader } from 'components/general/Loader/Loader';
import { Switcher } from 'components/general/Switcher/Switcher';
import { IFeatureItem } from 'store/user/accounts/accounts.types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { Icon } from 'components/general/Icon/Icon';
import { SLayout } from './PennyJarActivate.styles';

export const PennyJarActivatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getFeatures, getAccountFeaturesResult, changeAccountFeatureResult, changeFeature } = usePennyJar();
  const { selectedAccountInformation } = useSelector(selectAccountsData);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    getFeatures(selectedAccountInformation.accountId);
  }, []);

  useEffect(() => {
    if (getAccountFeaturesResult.isSuccess && getAccountFeaturesResult.currentData) {
      setIsEnabled(getAccountFeaturesResult.currentData.find((item: IFeatureItem) => item.type === 'RoundUp')?.isEnabled);
    }
  }, [getAccountFeaturesResult]);

  const handleSwitchChange = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLInputElement;
    if (!target.checked) return;
    setIsEnabled(!target.checked);
    await changeFeature(selectedAccountInformation.accountId, !target.checked, selectedAccountInformation.accountId);
  };

  const handleBack = () => {
    navigate(ROUTES.selectedAccountInformation.path);
  };

  if (getAccountFeaturesResult.isFetching || changeAccountFeatureResult.isLoading) return <Loader />;

  return (
    <SLayout>
      <div>
        <div className="header">
          <Icon name="arrowLeft" cursorPointer color="blue" onClick={handleBack} className="back" />
          <span className="title">{t('pennyJar.SetUpTitle')}</span>
        </div>

        <div className="title-container">
          <span className="subtitle">{t('pennyJar.Title')}</span>
          <span className="description">{t('pennyJar.SetupDescription')}</span>
        </div>

        {getAccountFeaturesResult.isSuccess && (
          <div className="center">
            <div className="activate-card">
              <span>{t('pennyJar.Title')}</span>
              <Switcher onClick={handleSwitchChange} checked={isEnabled} />
            </div>
          </div>
        )}
      </div>

      <div className="disclosure-container">
        <span>{t('pennyJar.WhatIsTenx')}</span>
      </div>
    </SLayout>
  );
};
