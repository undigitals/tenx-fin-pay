import { images } from 'assets';
import { BodyText } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { useToggle } from 'utils/hooks/useToggle';
import { SAdd, SCloseIcon, SPennyJarCard, SPennyJarDots, SPennyJarLogo } from './PennyJar.styles';
import { PennyJarCloseModal } from './PennyJarCloseModal/PennyJarCloseModal';

export const PennyJar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);
  const pennyJarCloseModal = useToggle(false);

  const handleClose = () => {
    pennyJarCloseModal.show();
  };

  const handleModalClose = () => {
    pennyJarCloseModal.hide();
    setIsClosed(true);
  };

  const handleAdd = () => {
    navigate(ROUTES.pennyJar.path);
  };

  return (
    <>
      {!isClosed && (
        <SPennyJarCard background="creamSS1" borderRadius={20} marginTop={24} marginBottom={48}>
          <SCloseIcon name="close" color="charcoal" size="smallest" cursorPointer onClick={handleClose} />
          <CustomRow flexDirection="column" gap={16} alignItems="flex-start" marginLeft={90} marginBottom={25}>
            <BodyText font="Poppins" color="charcoal" textType="bodyText" onClick={handleAdd} size="M" fontWeight="SB">
              {t('pennyJar.Title')}
            </BodyText>
            <BodyText color="charcoal" textType="bodyText" onClick={handleAdd} size="T" fontWeight="R">
              {t('pennyJar.MainDescription')}
            </BodyText>
          </CustomRow>

          <SAdd color="blue" cursorPointer textType="bodyText" onClick={handleAdd} size="N" fontWeight="B">
            {t('pennyJar.Add')}
          </SAdd>

          <SPennyJarLogo src={images.pennyJarLogo} />
          <SPennyJarDots src={images.pennyJarDots} />
        </SPennyJarCard>
      )}

      <PennyJarCloseModal open={pennyJarCloseModal.isActive} onClose={handleModalClose} />
    </>
  );
};
