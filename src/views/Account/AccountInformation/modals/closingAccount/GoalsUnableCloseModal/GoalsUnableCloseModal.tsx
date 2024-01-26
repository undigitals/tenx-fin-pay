import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { sandClock } from 'assets/images';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { IModalCommonProps } from 'views/Account/Summary/InternalTransfer/InternalTransferPage.types';

interface TModalProps extends IModalCommonProps {
  transferHandler: () => void;
}

export const GoalsUnableCloseModal: React.FC<TModalProps> = ({ open, onClose, transferHandler }) => {
  const { t } = useTranslation();

  return (
    <CustomModal open={open} onClose={onClose} topPosition="12%">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img src={sandClock} alt="sand-clock" style={{ width: 113, alignSelf: 'center', marginBottom: 32 }} />

        <Title size="M" fontWeight="M" marginBottom={18}>
          {t('accountInformation.WeAreUnableToClose')}
        </Title>

        <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5} marginBottom={32}>
          {t('accountInformation.YouHaveRemainingBalance')}
        </BodyText>

        <CustomButton preset="primary" size="xl" onClick={transferHandler}>
          {t('accountInformation.TransferBetweenAccounts')}
        </CustomButton>
      </div>
    </CustomModal>
  );
};
