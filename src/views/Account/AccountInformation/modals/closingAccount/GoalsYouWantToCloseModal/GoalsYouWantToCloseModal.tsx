import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import React from 'react';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { cantOpenAccount } from 'assets/images';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { IModalCommonProps } from 'views/Account/Summary/InternalTransfer/InternalTransferPage.types';

interface IModalProps extends IModalCommonProps {
  onCloseMyGoalsAccountClick?: () => void;
  onCancel?: () => void;
}

export const GoalsYouWantToCloseModal: React.FC<IModalProps> = ({ open, onClose, onCloseMyGoalsAccountClick, onCancel }) => {
  const { t } = useTranslation();

  return (
    <CustomModal open={open} onClose={onClose} closable={false} topPosition="10%">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img src={cantOpenAccount} alt="having-issues" style={{ width: 119, alignSelf: 'center', marginBottom: 28 }} />

        <Title size="M" fontWeight="M" marginBottom={14}>
          {t('accountInformation.AreYouSureYouWantToClose')}
        </Title>

        <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5} marginBottom={32}>
          {t('accountInformation.YourGoalsAccountBalanceIs0')}
        </BodyText>

        <CustomRow flexDirection="column">
          <CustomButton preset="primary-red" size="xl" marginBottom={18} onClick={onCloseMyGoalsAccountClick}>
            {t('accountInformation.YesCloseMyGoalsAccount')}
          </CustomButton>

          <CustomButton preset="red" size="xl" onClick={onCancel}>
            {t('accountInformation.Cancel')}
          </CustomButton>
        </CustomRow>
      </div>
    </CustomModal>
  );
};
