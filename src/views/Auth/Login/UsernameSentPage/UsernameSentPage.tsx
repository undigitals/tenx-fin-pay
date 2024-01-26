import React from 'react';
import { images } from 'assets';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { SLayout } from './UsernameSentPage.styles';

export const UserDataSentPage: React.FC<{ type?: string }> = ({ type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let title = '';

  switch (type) {
    case 'username':
      title = t('loginScreen.UsernameHasBeenSent');
      break;
    case 'information':
    default:
      title = t('loginScreen.InformationHasBeenSent');
      break;
  }

  const handleFinish = () => navigate(ROUTES.login.path, { state: { navigateToLogin: true } });

  return (
    <SLayout>
      <div className="center-image success-image">
        <img src={images.success} alt="success" />
      </div>

      <Title size="M" justifyContent="center" textAlign="center" marginBottom={16}>
        {title}
      </Title>

      <BodyText textType="bodyText" fontWeight="R" size="M" color="charcoal70" justifyContent="center" textAlign="center" marginBottom={46}>
        {t('loginScreen.CheckYourRegisteredEmailOrPhone')}
      </BodyText>

      <CustomButton preset="primary" onClick={handleFinish}>
        {t('loginScreen.GoToLogin')}
      </CustomButton>
    </SLayout>
  );
};
