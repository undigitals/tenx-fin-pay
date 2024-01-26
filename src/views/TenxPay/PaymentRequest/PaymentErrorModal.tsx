import React from 'react';
import { SBodyStyle, SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';
import { SModalCloseButton, SStatusImage } from 'views/TenxPay/Home/Home.styles';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { errorExclamationMarkImage } from 'assets/images';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { SPaymentErrorModal } from './PaymentErrorModal.styles';

interface IPaymentErrorModalProps {
  hasError: boolean;
  handleCloseStatusModal: () => void;
  handleTransferHistory: () => void;
}

export const PaymentErrorModal: React.FC<IPaymentErrorModalProps> = ({ hasError, handleCloseStatusModal, handleTransferHistory }) => {
  const { t } = useTranslation();

  return (
    <SPaymentErrorModal
      open={hasError}
      centered
      onCancel={handleCloseStatusModal}
      destroyOnClose
      footer={null}
      maskStyle={SMaskStyle}
      bodyStyle={SBodyStyle}
      closeIcon={<SModalCloseButton cursorPointer color="charcoal70" />}
      padding="24px"
      topPosition="10%"
    >
      <CustomRow flexDirection="column" alignItems="center" justifyContent="center">
        <SStatusImage src={errorExclamationMarkImage} alt="payment failed" />

        <CustomRow marginBottom={16} justifyContent="center">
          <Title font="Poppins" fontWeight="M" color="charcoal" size="M" textAlign="center">
            {t('tenxPayHome.We sorry, but we were unable to receive ...')}
          </Title>
        </CustomRow>

        <CustomRow marginBottom={32} justifyContent="center">
          <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" textAlign="center" lineHeight={1.5}>
            {t('tenxPayHome.Please check your recent payment history ...')}
          </BodyText>
        </CustomRow>

        <CustomRow gap={8} justifyContent="flex-end" width="100%">
          <CustomButton size="middleAlt" onClick={handleTransferHistory}>
            {t('tenxPayHome.Transfer History')}
          </CustomButton>

          <CustomButton preset="primary" size="middleAlt" onClick={handleCloseStatusModal}>
            {t('tenxPayHome.Try Again')}
          </CustomButton>
        </CustomRow>
      </CustomRow>
    </SPaymentErrorModal>
  );
};
