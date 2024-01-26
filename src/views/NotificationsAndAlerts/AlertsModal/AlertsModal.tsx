import React, { FC, useState, useEffect } from 'react';
import { BodyText } from 'components/general/Typography';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { IAlertItem } from 'views/NotificationsAndAlerts/NotificationsAndAlertsPage.types';
import { useTranslation } from 'react-i18next';
import { getPositiveNumberFromString } from 'utils/helpers/stringFormatter';
import { SCustomButton } from './AlertsModal.styles';

interface IModalProps {
  open: boolean;
  closeModal: () => void;
  alertData: IAlertItem | null;
  updateUserAllAlerts: (updatedAlerts: IAlertItem[]) => void;
}

export const AlertsModal: FC<IModalProps> = ({ open, closeModal, alertData, updateUserAllAlerts }) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'notificationsAlerts' });
  const [parameterValue, setParameterValue] = useState('');

  const handleChange = ({ target: { value } }: { target: HTMLInputElement }) => {
    setParameterValue(getPositiveNumberFromString(value));
  };

  const applyInputChanges = () => {
    updateUserAllAlerts([{ ...alertData, parameterValue, value: parameterValue }] as IAlertItem[]);
    closeModal();
  };

  useEffect(() => {
    setParameterValue(alertData?.value || '');
  }, [alertData]);

  return (
    <CustomSheet
      isOpen={open}
      onClose={closeModal}
      header
      headerStyle={{ minHeight: 75, padding: 25, paddingBottom: 0, background: 'white' }}
      wrapperPadding={false}
      title={alertData?.title || ''}
      contentWrapperStyle={{ borderRadius: '24px 24px 0px 0px' }}
    >
      <BodyText textType="bodyText" display="flex" textAlign="start" size="M" fontWeight="R" color="charcoal" font="DM Sans" marginBottom="spacing-normal">
        {alertData?.subTitle || ''}
      </BodyText>
      <BaseInput
        min={0}
        data-id={alertData?.alertId}
        name={alertData?.alertId}
        prefix="budgetIcon"
        prefixColor="charcoal"
        type="number"
        placeholder={t('Type amount')}
        value={parameterValue}
        onChange={handleChange}
      />
      <SCustomButton onClick={applyInputChanges} marginTop={32} size="middle" preset="primary">
        {t('Apply')}
      </SCustomButton>
    </CustomSheet>
  );
};
