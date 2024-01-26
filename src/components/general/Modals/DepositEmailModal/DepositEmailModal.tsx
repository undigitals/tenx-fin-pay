import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Title, BodyText } from 'components/general/Typography';
import { SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';
import { images } from 'assets';
import { useTranslation } from 'react-i18next';

interface IDepositEmailModal {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export const DepositEmailModal: React.FC<IDepositEmailModal> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnHome = () => {
    navigate(ROUTES.home.path);
    onClose();
  };

  const handleOnCancel = () => {
    onClose();
  };

  return (
    <CustomModal open={isOpen} centered onCancel={handleOnCancel} destroyOnClose footer={null} maskStyle={SMaskStyle} topPosition="17%" closeIconColor="charcoal70" padding="10px 24px 24px">
      <div className="center-image" style={{ marginBottom: '25px' }}>
        <img src={images.congratulation} alt="successfulEmailSent" style={{ position: 'relative', left: '13px', width: '45%' }} />
      </div>

      <div style={{ marginBottom: '5px' }}>
        <Title color="charcoal" size="M" fontWeight="M" marginBottom={24} font="Poppins" textAlign="start">
          {t(`myInfo.Email sent successfully`)}
        </Title>
        <BodyText textType="bodyText" size="N" fontWeight="R" font="DM Sans" color="charcoal70" textAlign="start">
          {t(`myInfo.checkYourInboxDirectDepositForm`)}
        </BodyText>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
        <CustomButton preset="secondary" size="middleAlt" onClick={handleOnHome} marginRight={15}>
          {t(`myInfo.Go to Home`)}
        </CustomButton>
        <CustomButton preset="primary" size="middleAlt" onClick={handleOnHome}>
          {t(`myInfo.Continue`)}
        </CustomButton>
      </div>
    </CustomModal>
  );
};
