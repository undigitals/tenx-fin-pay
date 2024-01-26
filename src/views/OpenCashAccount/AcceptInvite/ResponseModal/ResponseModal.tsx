import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { SIconClose, SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { images } from 'assets';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';

interface IResponseModalProps {
  isSuccess: boolean;
  navPath: string;
  open: boolean;
  onClose: () => void;
}

export const ResponseModal: React.FC<IResponseModalProps> = ({ isSuccess, navPath, open, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnCancel = () => {
    onClose();
    navigate(navPath);
  };

  return (
    <CustomModal open={open} centered onCancel={handleOnCancel} destroyOnClose footer={null} maskStyle={SMaskStyle} closeIcon={<SIconClose />} topPosition="10%">
      <CustomRow marginBottom={32} justifyContent="center">
        {isSuccess ? <img src={images.congratulation} alt="succeed" /> : <img src={images.errorExclamationMarkImage} alt="failureMark" />}
      </CustomRow>

      <CustomTitle size="bigger" fontWeight="light" marginBottom="small" textAlign="start">
        {t(isSuccess ? 'prepPage.ResponseSuccess' : 'prepPage.ResponseError')}
      </CustomTitle>

      {isSuccess && (
        <CustomButton onClick={handleOnCancel} size="middleStretch">
          {t('prepPage.GoToAccountHome')}
        </CustomButton>
      )}
    </CustomModal>
  );
};
