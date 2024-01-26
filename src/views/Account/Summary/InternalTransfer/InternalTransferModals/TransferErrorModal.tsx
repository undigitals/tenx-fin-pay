import React from 'react';
import { SIconClose, SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { images } from 'assets';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { SModal } from './TransferErrorModal.styles';

interface ITransferErrorModal {
  isOpen: boolean;
  handleTryAgain: () => void;
  handleClose: () => void;
}

export const TransferErrorModal: React.FC<ITransferErrorModal> = ({ isOpen, handleTryAgain, handleClose }) => {
  const { t } = useTranslation();

  return (
    <SModal open={isOpen} centered onCancel={handleClose} destroyOnClose footer={null} maskStyle={SMaskStyle} closeIcon={<SIconClose />} topPosition="0">
      <CustomRow marginBottom={32} justifyContent="center" flexDirection="column">
        <img src={images.errorExclamationMarkImage} alt="transferError" />

        <Title font="Poppins" size="M" fontWeight="M" marginTop={32} marginBottom={16}>
          {t('internalTransfer.We have a technical issue')}
        </Title>

        <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" textAlign="center">
          {t(
            'internalTransfer.Sorry, we have a technical problem to get confirmation of the transaction. Can you, please, check the history of your recent transaction and if it is not there please try to initiate transfer once again.'
          )}
        </BodyText>
      </CustomRow>

      <CustomRow justifyContent="flex-end" gap={8}>
        <CustomButton onClick={handleClose}>{t('internalTransfer.Cancel')}</CustomButton>
        <CustomButton preset="primary" onClick={handleTryAgain}>
          {t('internalTransfer.Try Again')}
        </CustomButton>
      </CustomRow>
    </SModal>
  );
};
