import React from 'react';
import { images } from 'assets';
import { useTranslation, Trans } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useSetUIPreferenceMutation } from 'store/user/properties/userProperties.api';
import { SPennyJarCloseModal } from './PennyJarCloseModal.styles';

interface IPennyJarCloseModal {
  open: boolean;
  onClose: () => void;
}

export const PennyJarCloseModal: React.FC<IPennyJarCloseModal> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [setUIPreference] = useSetUIPreferenceMutation();

  const handleContinue = () => {
    const data = {
      value: {
        isPennyJarDismissed: true,
      },
    };
    setUIPreference(data);
    onClose();
  };

  return (
    <SPennyJarCloseModal open={open} onCancel={onClose} topPosition="11%" closeIconColor="charcoal70">
      <CustomRow marginBottom={28} justifyContent="center">
        <img src={images.pennyJarMainLogo} alt="pennyJarMain" />
      </CustomRow>

      <Title textAlign="start" marginBottom={16} fontWeight="M" size="M" marginTop={10}>
        {t('pennyJar.CloseModalTitle')}
      </Title>

      <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" lineHeight={1.5}>
        <Trans i18nKey="pennyJar.CloseModalDescription" />
      </BodyText>

      <CustomButton size="middle" onClick={handleContinue}>
        {t('pennyJar.CloseModalButtonText')}
      </CustomButton>
    </SPennyJarCloseModal>
  );
};
