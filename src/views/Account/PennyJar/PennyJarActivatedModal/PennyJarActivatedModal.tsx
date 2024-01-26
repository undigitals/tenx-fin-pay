import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { images } from 'assets';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { PennyJarActivatedImage } from 'views/Account/PennyJar/PennyJarPage.styles';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { SModalButton } from 'views/Account/PennyJar/PennyJarSetup.styles';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';

interface IPennyJarActivatedModal {
  open: boolean;
  onClose: () => void;
  isClosable?: boolean;
}

export const PennyJarActivatedModal: React.FC<IPennyJarActivatedModal> = ({ open, onClose, isClosable = true }) => {
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();

  return (
    <CustomModal open={open} onCancel={onClose} topPosition="18%" closable={isClosable} padding="20px 24px 24px" closeIconColor="charcoal70">
      <div style={{ ...PennyJarActivatedImage }}>
        <img src={images.congratulation} alt="inviteFinished" width="165px" />
      </div>
      <div>
        <Title font="Poppins" size="M" fontWeight="M" color="charcoal" marginTop={32} marginBottom={16}>
          {t('pennyJar.SuccessfullyActivated')}
        </Title>

        <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" lineHeight={1.5}>
          {t('pennyJar.IfWantChangeThisFeature')}
        </BodyText>

        {isDesktopSize && (
          <CustomRow justifyContent="center">
            <SModalButton preset="primary" onClick={onClose} marginTop={32}>
              {t('pennyJar.Continue')}
            </SModalButton>
          </CustomRow>
        )}
      </div>
    </CustomModal>
  );
};
