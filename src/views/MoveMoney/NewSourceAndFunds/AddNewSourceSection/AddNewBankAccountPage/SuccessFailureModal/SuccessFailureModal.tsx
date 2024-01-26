import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { SIconClose, SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { images } from 'assets';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';

interface IAddNewSourceModal {
  isSuccess: boolean;
  navPath: string;
  open: boolean;
  onClose: () => void;
}

export const SuccessFailureModal: React.FC<IAddNewSourceModal> = ({ isSuccess, navPath, open, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnCancel = () => {
    onClose();
    navigate(navPath);
  };

  return (
    <CustomModal open={open} centered onCancel={handleOnCancel} destroyOnClose footer={null} maskStyle={SMaskStyle} closeIcon={<SIconClose />} topPosition="10%">
      <CustomRow marginBottom={32} justifyContent="center">
        {isSuccess ? <img src={images.congratulation} alt="paymentSucceed" /> : <img src={images.errorExclamationMarkImage} alt="failureMark" />}
      </CustomRow>

      <CustomRow flexDirection="column" justifyContent="flex-start" alignItems="start">
        <CustomTitle size="bigger" fontWeight="light" marginBottom="small" textAlign="start">
          {t(isSuccess ? 'addNewSource.BankAccountAddedSuccessfully' : 'addNewSource.We were not able to confirm your new outside account')}
        </CustomTitle>
        <CustomText textColor="charcoal60" marginBottom={32}>
          {t(isSuccess ? 'moveMoney.YouCanUseAccountForExternal' : 'addNewSource.PleaseGoBack')}
        </CustomText>
      </CustomRow>

      <CustomButton preset="primary" onClick={handleOnCancel} size="middleStretch">
        {t(isSuccess ? 'addNewSource.Continue' : 'homeScreen.TryAgain')}
      </CustomButton>
    </CustomModal>
  );
};
