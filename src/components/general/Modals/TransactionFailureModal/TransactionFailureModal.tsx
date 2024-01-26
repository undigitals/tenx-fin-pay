import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'utils/hooks/store';
import { useTranslation } from 'react-i18next';
import { selectShowTransactionFailureDrawer, setShowTransactionFailureDrawer } from 'store/ui.slice';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Title, BodyText } from 'components/general/Typography';
import { images } from 'assets';
import { SIconClose, SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';

export const TransactionFailureModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isModalVisible = useSelector(selectShowTransactionFailureDrawer);
  const { t } = useTranslation();

  const handleOnCancel = () => {
    dispatch(setShowTransactionFailureDrawer(false));
  };

  return (
    <CustomModal open={isModalVisible} centered onCancel={handleOnCancel} destroyOnClose footer={null} maskStyle={SMaskStyle} closeIcon={<SIconClose />} topPosition="25%">
      <CustomRow marginBottom={32} justifyContent="center">
        <img src={images.errorExclamationMarkImage} alt="exclamationMark" />
      </CustomRow>

      <CustomRow flexDirection="column">
        <Title size="S" fontWeight="SB" font="Poppins" color="charcoal" marginBottom={20}>
          {t(`moveMoney.Cancelled`)}
        </Title>
        <BodyText textType="bodyText" fontWeight="M" size="N" color="charcoal60" marginBottom={32}>
          {t(`moveMoney.Something went wrong...`)}
        </BodyText>
      </CustomRow>

      <CustomButton preset="primary" onClick={handleOnCancel}>
        {t(`moveMoney.Back to Move Money`)}
      </CustomButton>
    </CustomModal>
  );
};
