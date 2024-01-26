import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { SBodyStyle, SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';
import { SModalCloseButton, SStatusImage } from 'views/TenxPay/Home/Home.styles';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { images } from 'assets';
import { Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';

interface IPaymentErrorModalProps {
  paymentSucceed: boolean;
  handleCloseStatusModal: () => void;
}

export const PaymentSuccessModal: React.FC<IPaymentErrorModalProps> = ({ paymentSucceed, handleCloseStatusModal }) => {
  const { t } = useTranslation();

  return (
    <CustomModal
      open={paymentSucceed}
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
      <div className="center-image">
        <SStatusImage src={images.congratulation} alt="payment succeed" />

        <Title font="Poppins" fontWeight="M" color="charcoal" size="M" marginBottom={25}>
          {t(`tenxPayHome.Your Tenx Pay Transaction was Successful`)}!
        </Title>

        <CustomButton preset="primary" size="middleStretch" onClick={handleCloseStatusModal}>
          {t(`tenxPayHome.Continue`)}
        </CustomButton>
      </div>
    </CustomModal>
  );
};
