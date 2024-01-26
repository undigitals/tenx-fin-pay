import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { SIconClose, SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';
import { useAppDispatch } from 'utils/hooks/store';
import { selectDisplayStuffSaveAccountErrorModal, setShowStuffSaveAccountErrorModal } from 'store/ui.slice';
import { useSelector } from 'react-redux';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { images } from 'assets';
import { useTranslation } from 'react-i18next';

export const StuffSaveAccountErrorModal: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isModalVisible = useSelector(selectDisplayStuffSaveAccountErrorModal);

  const handleOnContinue = () => {
    dispatch(setShowStuffSaveAccountErrorModal(false));
    navigate(ROUTES.home.path);
  };

  const handleOnCancel = () => {
    dispatch(setShowStuffSaveAccountErrorModal(false));
  };

  return (
    <CustomModal open={isModalVisible} centered onCancel={handleOnCancel} destroyOnClose footer={null} maskStyle={SMaskStyle} closeIcon={<SIconClose />} topPosition="0">
      <CustomRow marginBottom={32} justifyContent="center">
        <img src={images.failedVerification} alt="verification" />
      </CustomRow>

      <CustomRow flexDirection="column" justifyContent="flex-start" alignItems="center">
        <CustomText textColor="charcoal" size="xxl" marginBottom={24} font="Poppins">
          {t('addAccount.Error')}
        </CustomText>
        <CustomText textColor="charcoal" marginBottom={32}>
          {t('addAccount.Try again later')}
        </CustomText>
      </CustomRow>

      <CustomButton preset="primary" size="large" onClick={handleOnContinue} marginBottom={24} marginTop={24}>
        {t('addAccount.Back to Home')}
      </CustomButton>
    </CustomModal>
  );
};
