import React, { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'vars/const/ROUTES';
import { images } from 'assets';
import { Title, BodyText } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { SSuccessImageBorder } from 'views/Auth/SuccessPage/SuccessPage.styles';

interface ISuccessPage {
  state?: {
    navPath?: string;
  };
}

export const SuccessPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation() as ISuccessPage;
  const navPath = location?.state?.navPath || ROUTES.login.path;

  const initTimer = useCallback(() => setTimeout(() => navigate(String(navPath)), 3000), [navigate]);

  const handleContinueClick = () => navigate(ROUTES.login.path, { state: { navigateToLogin: true } });

  useEffect(() => {
    initTimer();
  }, [initTimer]);

  return (
    <SSuccessImageBorder>
      <img src={images.congratulation} className="success-image" alt="success" />
      <Title font="Poppins" fontWeight="M" size="M" textAlign="center" marginBottom={15}>
        {t(`preRegOnboarding.SuccessfullRegistration.Title`)}
      </Title>
      <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="M" textAlign="center" color="charcoal">
        {t(`preRegOnboarding.SuccessfullRegistration.Subtitle`)}
      </BodyText>
      <CustomButton size="large" preset="primary" onClick={handleContinueClick}>
        {t(`preRegOnboarding.SuccessfullRegistration.Continue`)}
      </CustomButton>
    </SSuccessImageBorder>
  );
};
