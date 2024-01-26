import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { IModalCommonProps } from 'views/Account/Summary/InternalTransfer/InternalTransferPage.types';

export const GoalsAccountClosedModal: React.FC<IModalCommonProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <CustomModal open={open} onClose={onClose} topPosition="26%">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Title size="M" fontWeight="M" marginBottom={30}>
          {t('accountInformation.YourGoalsAccountIsNowClosed')}
        </Title>

        <CustomButton preset="primary" size="xl" onClick={onClose}>
          {t('accountInformation.GoToHomeScreen')}
        </CustomButton>
      </div>
    </CustomModal>
  );
};
