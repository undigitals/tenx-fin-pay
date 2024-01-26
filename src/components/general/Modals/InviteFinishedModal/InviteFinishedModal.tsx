import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { images } from 'assets';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';

interface IInviteFinishedModal {
  open: boolean;
  onClose: () => void;
  isClosable?: boolean;
}

export const InviteFinishedModal: React.FC<IInviteFinishedModal> = ({ open, onClose, isClosable = true }) => {
  const { t } = useTranslation();

  return (
    <CustomModal open={open} onCancel={onClose} topPosition="18%" closable={isClosable} padding="20px 24px 24px">
      <div className="center-image">
        <img src={images.success} alt="inviteFinished" width="120px" />
      </div>
      <div>
        <Title font="Poppins" size="M" fontWeight="M" color="charcoal" marginTop={32} marginBottom={16}>
          {t('inviteEarn.ThankYou!')}
        </Title>

        <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
          {t('inviteEarn.YourInviteHasBeenSent')} <br />
          {t('inviteEarn.YouEarned20TenxPoints!')}
        </BodyText>
      </div>
      <CustomButton marginTop={32} size="large" preset="primary" onClick={onClose}>
        {t(`myInfo.Continue`)}
      </CustomButton>
    </CustomModal>
  );
};
