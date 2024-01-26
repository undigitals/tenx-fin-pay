import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Loader } from 'components/general/Loader/Loader';
import { Icon } from 'components/general/Icon/Icon';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { BodyText, Title } from 'components/general/Typography';
import { SAlertSourceItem, SCard } from 'views/NotificationsAndAlerts/NotificationsAndAlertsPage.styles';
import { useGetUserProfileDataMutation } from 'store/user/users.api';
import { selectCurrentUser, selectPolicies } from 'store/user/authentication.slice';
import { securityNotificationSettings } from 'store/user/alerts/alerts.slice';
import { IBaseSelectOption } from 'components/general/BaseSelect/BaseSelect.types';
import { useSubscriptions } from 'utils/hooks/useSubscriptions';
import { IAlertItem } from 'views/NotificationsAndAlerts/NotificationsAndAlertsPage.types';
import { AlertsModal } from 'views/NotificationsAndAlerts/AlertsModal/AlertsModal';
import { areEqualUsers, USER_PROFILE_IDS } from 'vars/const/USER_PROFILE_IDS';
import { options } from './constants';
import { useAlertInput } from './helpers';
import { BalanceSetting } from './BalanceSetting';
import { WaitlistSetting } from './WaitlistSetting';

export const NotificationsTab = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'notificationsAlerts' });

  const { balanceSettings, waitlistSettings, getUserAllAlerts, getUserAllAlertsResult, editAlerts, updateUserAllAlerts } = useSubscriptions();
  const { hasAccount } = useAlertInput();
  const [getUserProfileData, getUserProfileDataResult] = useGetUserProfileDataMutation();
  const securitySettings = useSelector(securityNotificationSettings);
  const policies = useSelector(selectPolicies);
  const user = useSelector(selectCurrentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAlert, setEditedAlert] = useState<IAlertItem | null>(null);
  const [alertsEditable, setAlertsEditable] = useState(Boolean(user?.isNotifyByEmail) || Boolean(user?.isNotifyBySms) || Boolean(user?.isNotifyByPush));
  const isClient = areEqualUsers(user?.systemProfileId ?? '', USER_PROFILE_IDS.CLIENT_ccc);

  const memoizedFilteredUpdatedAlerts = useMemo(() => {
    if (balanceSettings) {
      const filteredUpdatedAlerts: IAlertItem[] = balanceSettings.filter((alert: IAlertItem) => !alert.isReadOnly && !(!alert.isNotifyBySms && !alert.isNotifyByEmail));
      return filteredUpdatedAlerts;
    }
    return balanceSettings;
  }, [balanceSettings]);

  const memoizedSecuritySettings = useMemo(
    () =>
      securitySettings?.map((alert: IAlertItem) => (
        <div className="settings-security-outer" style={{ marginBottom: '20px' }} key={alert.alertId}>
          <div className="settings-security-inner" style={{ marginBottom: '14px' }}>
            <Checkbox checked disabled />
            <BodyText textType="bodyText" display="flex" textAlign="center" size="N" fontWeight="R" color="charcoal40" font="DM Sans">
              {alert.title}
            </BodyText>
          </div>
        </div>
      )),
    [securitySettings]
  );

  const setCheckedAllAlerts = (isNotifyByEmailChecked?: boolean, isNotifyBySmsChecked?: boolean) => {
    const updatedSettings = balanceSettings?.map((settings) => ({
      ...settings,
      isNotifyByEmail: isNotifyByEmailChecked,
      isNotifyBySms: isNotifyBySmsChecked,
    }));

    updateUserAllAlerts(updatedSettings as IAlertItem[]);
  };

  const toggleCheckedEmail = (isNotifyByEmail: boolean) => {
    const updatedSettings = {
      isNotifyByEmail,
    };

    if (memoizedFilteredUpdatedAlerts) {
      const updatedAlerts: IAlertItem[] = memoizedFilteredUpdatedAlerts.map((alert: IAlertItem) => ({
        ...alert,
        ...updatedSettings,
      }));

      updateUserAllAlerts(updatedAlerts);
    }
    editAlerts(updatedSettings);

    if (!alertsEditable && updatedSettings.isNotifyByEmail) {
      setCheckedAllAlerts(updatedSettings.isNotifyByEmail);
      setAlertsEditable(true);
    }

    if (alertsEditable && !updatedSettings.isNotifyByEmail && !user?.isNotifyBySms) {
      setAlertsEditable(false);
    }
  };

  const toggleCheckedSms = (isNotifyBySms: boolean) => {
    const updatedSettings = {
      isNotifyBySms,
    };

    if (memoizedFilteredUpdatedAlerts) {
      const updatedAlerts: IAlertItem[] = memoizedFilteredUpdatedAlerts.map((alert: IAlertItem) => ({
        ...alert,
        ...updatedSettings,
      }));

      updateUserAllAlerts(updatedAlerts);
    }
    editAlerts(updatedSettings);

    if (!alertsEditable && updatedSettings.isNotifyBySms) {
      setCheckedAllAlerts(updatedSettings.isNotifyBySms);
      setAlertsEditable(true);
    }

    if (alertsEditable && !updatedSettings.isNotifyBySms && !user?.isNotifyByEmail) {
      setAlertsEditable(false);
    }
  };

  const toggleCheckedPush = (isNotifyByPush: boolean) => {
    const updatedSettings = {
      isNotifyByPush,
    };

    if (memoizedFilteredUpdatedAlerts) {
      const updatedAlerts: IAlertItem[] = memoizedFilteredUpdatedAlerts.map((alert: IAlertItem) => ({
        ...alert,
        ...updatedSettings,
      }));

      updateUserAllAlerts(updatedAlerts);
    }
    editAlerts(updatedSettings);

    if (!alertsEditable && updatedSettings.isNotifyByPush) {
      setCheckedAllAlerts(updatedSettings.isNotifyByPush);
      setAlertsEditable(true);
    }

    if (alertsEditable && !user?.isNotifyBySms && !user?.isNotifyByEmail && !updatedSettings?.isNotifyByPush) {
      setAlertsEditable(false);
    }
  };

  const handleEditClick = (alert: IAlertItem) => {
    setIsModalOpen(true);
    setEditedAlert(alert);
  };

  const onNotificationToggle = (checked: boolean, alert: IAlertItem) => {
    updateUserAllAlerts([
      {
        ...alert,
        isNotifyBySms: checked ? user?.isNotifyBySms : false,
        isNotifyByEmail: checked ? user?.isNotifyByEmail : false,
        isNotifyByPush: checked ? user?.isNotifyByPush : false,
      },
    ]);
  };

  const handleApply = (alert: IAlertItem, newValue: unknown) => {
    updateUserAllAlerts([
      {
        ...alert,
        value: (newValue as IBaseSelectOption).value,
        parameterValue: (newValue as IBaseSelectOption).value,
      },
    ]);
  };

  useEffect(() => {
    if (user) {
      const { userId } = user;
      getUserProfileData({ userId });
      getUserAllAlerts({});
    }
  }, []);

  const selectOptions = useMemo(
    () =>
      options.map((option) => ({
        value: option,
        label: t(option),
      })),
    [t]
  );

  return (
    <>
      <Title textAlign="start" size="sS" marginBottom="spacing-med" fontWeight="SB">
        {t('AlertDelivery')}
      </Title>
      <CustomCard padding="32px 24px 16px">
        <BodyText textType="bodyText" display="flex" size="N" fontWeight="R" color="charcoal70" marginBottom="spacing-x-large">
          {t('SelectHowToReceiveBalanceAndTransactionNotifications')}
        </BodyText>
        <div className="settings-alert-source-items">
          {getUserProfileDataResult.isLoading && <Loader />}
          <SAlertSourceItem onClick={() => toggleCheckedEmail(!user?.isNotifyByEmail)}>
            <Icon name="envelope" color={user?.isNotifyByEmail ? 'blue' : 'charcoal20'} size="xl" marginRight={8} marginBottom={13} cursorPointer />
            <BodyText textType="bodyText" display="flex" textAlign="center" size="M" fontWeight="R" color="charcoal" marginRight={8} marginBottom={8} cursorPointer>
              {t('Email')}
            </BodyText>
            <Checkbox checked={user?.isNotifyByEmail} />
          </SAlertSourceItem>
          {policies?.PushNotificationsEnabled && (
            <SAlertSourceItem onClick={() => toggleCheckedPush(!user?.isNotifyByPush)}>
              <Icon name="mobile" color={user?.isNotifyByPush ? 'blue' : 'charcoal20'} size="xl" marginRight={8} marginBottom={13} cursorPointer />
              <BodyText textType="bodyText" display="flex" textAlign="center" size="M" fontWeight="R" color="charcoal" marginRight={8} marginBottom={8} cursorPointer>
                {t('InApp')}
              </BodyText>
              <Checkbox checked={user?.isNotifyByPush} />
            </SAlertSourceItem>
          )}
          <SAlertSourceItem onClick={() => toggleCheckedSms(!user?.isNotifyBySms)}>
            <Icon name="comment" color={user?.isNotifyBySms ? 'blue' : 'charcoal20'} size="xl" marginRight={8} marginBottom={13} cursorPointer />
            <BodyText textType="bodyText" display="flex" textAlign="center" size="M" fontWeight="R" color="charcoal" marginRight={8} marginBottom={8} cursorPointer>
              {t('Text')}
            </BodyText>
            <Checkbox checked={user?.isNotifyBySms} />
          </SAlertSourceItem>
        </div>
      </CustomCard>

      <BodyText textType="bodyText" size="T" fontWeight="R" color="charcoal70" marginTop="spacing-med" marginBottom="spacing-x-large">
        {t('MessageAndData')}
      </BodyText>

      {isClient ? (
        <>
          <Title textAlign="start" size="sS" marginBottom="spacing-med" fontWeight="SB">
            {t('Balances&Transactions')}
          </Title>

          <CustomCard extraStyles={{ minHeight: '200px' }}>
            {getUserAllAlertsResult.isLoading && <Loader />}
            {!hasAccount && (
              <BodyText textType="errorText" color="red" fontWeight="R" size="T" marginBottom="spacing-small" icon={<Icon name="triangleWarning" color="red40" size="xs" />}>
                {t('DoNotHaveAccountSetUpNotifications')}
              </BodyText>
            )}

            {balanceSettings?.map((alert) => (
              <BalanceSetting
                alert={alert}
                alertsEditable={alertsEditable}
                hasAccount={hasAccount}
                selectOptions={selectOptions}
                onCheck={onNotificationToggle}
                onEditClick={handleEditClick}
                onApply={handleApply}
              />
            ))}
          </CustomCard>

          <Title textAlign="start" size="sS" marginBottom={20} fontWeight="SB" marginTop="spacing-x-large">
            {t('SecurityAlerts')}
          </Title>
          <SCard marginTop={10} marginBottom={64} extraStyles={{ minHeight: '200px', paddingBottom: '8px' }}>
            <div style={{ marginBottom: '20px' }}>
              <BodyText textType="bodyText" icon={<Icon name="triangleWarning" color="red70" size="smaller" />} display="flex" justify-content="flex-start" size="N" fontWeight="R" color="charcoal70">
                {t('YouCanNotDisableTheseNotifications')}
              </BodyText>
            </div>

            {securitySettings ? memoizedSecuritySettings : <Loader noPadding />}
          </SCard>
        </>
      ) : (
        <>
          <Title textAlign="start" size="sL" marginBottom="spacing-x-large" fontWeight="M">
            {t('WaitlistNotifications')}
          </Title>

          <CustomCard marginTop={32} extraStyles={{ minHeight: '200px' }} marginBottom={30}>
            {waitlistSettings?.map((alert) => (
              <WaitlistSetting alert={alert} alertsEditable={alertsEditable} hasAccount={hasAccount} onCheck={onNotificationToggle} />
            ))}
          </CustomCard>
        </>
      )}
      <AlertsModal open={isModalOpen} closeModal={() => setIsModalOpen(false)} alertData={editedAlert} updateUserAllAlerts={updateUserAllAlerts} />
    </>
  );
};
