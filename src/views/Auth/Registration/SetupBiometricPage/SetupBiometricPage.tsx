import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { Title, BodyText } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BiometricCard } from './BiometricCard/BiometricCard';

export const SetupBiometricPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [faceIdSelected, setFaceIdSelected] = useState(true);
  const [touchIdSelected, setTouchIdSelected] = useState(false);
  const [faceIdSetUp, setFaceIdSetUp] = useState(false);
  const [touchIdSetUp, setTouchIdSetUp] = useState(false);

  const handleSelectFaceId = () => {
    setFaceIdSelected(true);
    setTouchIdSelected(false);
    setTouchIdSetUp(false);
  };

  const handleSelectTouch = () => {
    setFaceIdSelected(false);
    setTouchIdSelected(true);
    setFaceIdSetUp(false);
  };

  const handleSetUpOption = () => {
    if (faceIdSelected) {
      setFaceIdSetUp(true);
      setTouchIdSetUp(false);
    } else {
      setFaceIdSetUp(false);
      setTouchIdSetUp(true);
    }
  };

  const handleSkip = () => {
    if (faceIdSelected) {
      handleSelectTouch();
    } else {
      navigate(ROUTES.onboarding.path);
    }
  };

  return (
    <>
      <Title size="M" fontWeight="M" marginBottom={48}>
        {t('verification.SetupBiometricTitle')}
      </Title>

      <BodyText textType="bodyText" fontWeight="R" size="M" color="charcoal70" marginBottom="spacing-large">
        {t('verification.SetupBiometricDesctiption')}
      </BodyText>

      <CustomRow>
        <BiometricCard handleSelect={handleSelectFaceId} isSetUp={faceIdSetUp} color={faceIdSelected ? 'blue' : 'charcoal40'} title="Face ID" iconName="faceIdBig" />
        <BiometricCard handleSelect={handleSelectTouch} isSetUp={touchIdSetUp} color={touchIdSelected ? 'blue' : 'charcoal40'} title="Touch ID" iconName="touchIdBig" />
      </CustomRow>

      {!faceIdSetUp && !touchIdSetUp ? (
        <>
          <CustomButton preset="primary" onClick={handleSetUpOption} marginTop={45} marginBottom={35}>
            {t(faceIdSelected ? 'verification.SetUpFaceID' : 'verification.SetUpTouchID')}
          </CustomButton>
          <CustomRow justifyContent="center" gap={5} flexWrap="wrap">
            <BodyText textType="bodyText" color="blue" size="N" fontWeight="M" onClick={handleSkip} cursorPointer>
              {t('verification.Skip')}
            </BodyText>
          </CustomRow>
        </>
      ) : (
        <CustomButton preset="primary" marginTop={45} marginBottom={35} onClick={() => navigate(ROUTES.onboarding.path)}>
          {t('verification.Continue')}
        </CustomButton>
      )}
    </>
  );
};
