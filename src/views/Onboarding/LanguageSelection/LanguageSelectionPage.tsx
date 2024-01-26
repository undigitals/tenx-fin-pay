import React from 'react';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from 'utils/hooks/useLanguage';
import { ROUTES } from 'vars/const/ROUTES';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import tenxLogo from './images/tenxLogo.svg';
import { SLanguageButton, SLayout, SActions, SImage } from './LanguageSelectionPage.styles';

export const LanguageSelectionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isDesktopSize } = useDeviceDimension();
  const { changeLanguage } = useLanguage();

  const handleLanguageChange = (languageKey: string) => {
    changeLanguage(languageKey).then(() => navigate(ROUTES.onboardingHome.path));
  };

  return (
    <SLayout>
      <SImage src={tenxLogo} alt="Tenx Logo" />

      <SActions>
        {isDesktopSize ? (
          <>
            <Title color="white" size="XL" fontWeight="M" justifyContent="center" textAlign="center" marginBottom={16}>
              {t('preRegOnboarding.ChooseYourLanguage')}
            </Title>
            <Title color="white" font="DM Sans" size="S" fontWeight="M" justifyContent="center" textAlign="center">
              {t("preRegOnboarding.We're so glad you're here")}
            </Title>
          </>
        ) : (
          <BodyText textType="bodyText" color="white" font="Poppins" size="M" fontWeight="SB" justifyContent="center" textAlign="center">
            {t('preRegOnboarding.ChooseYourLanguage')}
          </BodyText>
        )}

        <div className="languageSelectionFooter">
          <SLanguageButton onClick={() => handleLanguageChange('en')}>English</SLanguageButton>
          <SLanguageButton onClick={() => handleLanguageChange('es')}>Español</SLanguageButton>
        </div>
      </SActions>
    </SLayout>
  );
};
