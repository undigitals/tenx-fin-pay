/* eslint-disable import/no-default-export */
import React from 'react';
import 'antd/dist/antd.min.css';
import { I18nextProvider } from 'react-i18next';
import { i18n } from 'i18n/i18n';
import { useWaitlistProducts } from 'utils/hooks/useWaitlistProducts';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SubscriptionsLayout } from './SubscriptionsLayout';

export default {
  title: 'SubscriptionsLayout',
  component: SubscriptionsLayout,
} as ComponentMeta<typeof SubscriptionsLayout>;

const Template: ComponentStory<typeof SubscriptionsLayout> = () => {
  const { areAllSubscriptionPagesActive, changeAlert, changeAllAlerts, isAlertChecked, showInfoModal } = useWaitlistProducts();

  const handleChange = (checked: boolean, productId: string) => {
    changeAlert(checked, productId);
  };

  const handleCheckAll = (checked: boolean) => {
    changeAllAlerts(checked);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <SubscriptionsLayout
        handleChange={handleChange}
        handleCheckAll={handleCheckAll}
        isAlertChecked={isAlertChecked}
        showInfoModal={showInfoModal}
        areAllSubscriptionPagesActive={areAllSubscriptionPagesActive}
      />
    </I18nextProvider>
  );
};

export const Default = Template.bind({});
