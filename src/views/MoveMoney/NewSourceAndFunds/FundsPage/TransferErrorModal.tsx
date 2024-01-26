import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { images } from 'assets';
import { BodyText, Title } from 'components/general/Typography';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';

interface IErrorData {
  message: string | React.ReactElement;
  title: string;
  isIngoError: boolean;
}

interface ITransferErrorModal {
  isOpen: boolean;
  errorData?: IErrorData;
  handleClose: () => void;
  handleCloseConfirmationModal: () => void;
  isSendType?: boolean;
}

export const TransferErrorModal: FC<ITransferErrorModal> = ({ isOpen, isSendType, errorData, handleClose, handleCloseConfirmationModal }) => {
  const { t } = useTranslation();
  const transferErrorMsg = t(`moveMoney.Transfer${isSendType ? 'To' : 'From'}ExternalError`);
  const handleOnCancel = () => {
    handleCloseConfirmationModal();
    handleClose();
  };

  return (
    <CustomModal open={isOpen} onCancel={handleOnCancel} destroyOnClose centered footer={null} closeIconColor="charcoal70" topPosition="10%">
      <CustomRow marginBottom={32} justifyContent="center">
        <img src={images.errorExclamationMarkImage} alt="Transfer Error" />
      </CustomRow>

      <CustomRow flexDirection="column">
        <Title size="M" fontWeight="R" marginBottom="spacing-normal" textAlign="center">
          {errorData?.isIngoError ? errorData.title : transferErrorMsg}
        </Title>
        <BodyText textType="helperText" color="charcoal60" marginBottom={32} size="N" fontWeight="R" textAlign="center" lineHeight={1.5}>
          {errorData?.message}
        </BodyText>
      </CustomRow>

      <CustomButton preset="primary" onClick={handleOnCancel}>
        {t('addNewSource.Continue')}
      </CustomButton>
    </CustomModal>
  );
};
