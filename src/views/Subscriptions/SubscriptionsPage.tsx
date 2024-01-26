import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from 'components/general/Loader/Loader';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { SubscriptionsLayout } from 'components/layouts/SubscriptionsLayout/SubscriptionsLayout';
import { useWaitlistProducts } from 'utils/hooks/useWaitlistProducts';
import { BodyText, Title } from 'components/general/Typography';
import { SLayout } from './SubscriptionsPage.styled';

export const SubscriptionsPage = () => {
  const { t } = useTranslation();
  const {
    getAllAlertsAPIResult,
    areAllSubscriptionPagesActive,
    filterWaitlistProductsPreferences,
    saveAlerts,
    getAllAlerts,
    isDefaultProductsStateChanged,
    saveAllAlertsAPIResult,
    saveUnsubscribedProducts,
    changeAlert,
    changeAllAlerts,
    isAlertChecked,
    showInfoModal,
  } = useWaitlistProducts();

  const handleSave = () => {
    if (areAllSubscriptionPagesActive && !isDefaultProductsStateChanged) {
      saveUnsubscribedProducts();
    } else {
      saveAlerts();
    }
  };

  const handleChange = (checked: boolean, productId: string) => {
    changeAlert(checked, productId);
  };

  const handleCheckAll = (checked: boolean) => {
    changeAllAlerts(checked);
  };

  useEffect(() => {
    getAllAlerts();
    filterWaitlistProductsPreferences();
  }, []);

  if (getAllAlertsAPIResult?.isLoading || saveAllAlertsAPIResult?.isLoading) return <Loader />;

  return (
    <SLayout>
      <div>
        <Title fontWeight="SB" size="S" marginBottom={8} textAlign="start">
          {t('mySubscriptions.Subscriptions')}
        </Title>

        <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="M" marginBottom={32} textAlign="start" lineHeight={1.5}>
          {t('mySubscriptions.SelectProductsAndServices')}
        </BodyText>

        {getAllAlertsAPIResult.isSuccess && (
          <CustomCard marginBottom={30}>
            <SubscriptionsLayout
              handleChange={handleChange}
              handleCheckAll={handleCheckAll}
              isAlertChecked={isAlertChecked}
              showInfoModal={showInfoModal}
              areAllSubscriptionPagesActive={areAllSubscriptionPagesActive}
            />
          </CustomCard>
        )}
      </div>

      <CustomButton size="large" preset="primary" marginTop={30} marginBottom={30} onClick={handleSave}>
        {areAllSubscriptionPagesActive && !isDefaultProductsStateChanged ? t('mySubscriptions.Unsubscribe') : t('mySubscriptions.Update')}
      </CustomButton>
    </SLayout>
  );
};
