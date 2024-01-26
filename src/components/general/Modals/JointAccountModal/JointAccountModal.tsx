import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { images } from 'assets';
import { SIconClose, SCustomButton } from './JoinAccountModal.styles';

interface IJointAccountModal {
  open: boolean;
  onClose: () => void;
  isFromStarterPage?: boolean;
}

export const JointAccountModal: React.FC<IJointAccountModal> = ({ open, onClose, isFromStarterPage = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnContinue = () => {
    if (isFromStarterPage) {
      navigate(ROUTES.enableThreeGreatFeatures.path);
    } else {
      navigate(ROUTES.home.path);
    }
    onClose();
  };

  return (
    <CustomModal open={open} onCancel={onClose} topPosition="5%" closeIcon={<SIconClose name="closeCircle" color="charcoal70" />}>
      <>
        <CustomRow marginBottom={32} alignItems="center" justifyContent="center">
          <img src={images.success} alt="Account holder has been notified" />
        </CustomRow>
        <Title size="M" fontWeight="M" justifyContent="start" marginBottom={16}>
          {t('cashAccount.JointNotified')}
        </Title>
        <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" marginBottom={32} justifyContent="start">
          {t('cashAccount.JointNotifiedDesc')}
        </BodyText>

        <SCustomButton preset="primary" onClick={handleOnContinue}>
          {t('cashAccount.Continue')}
        </SCustomButton>
      </>
    </CustomModal>
  );
};
