import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { ResultsPage } from 'views/OpenCashAccount/MyIdPage/ResultsPage/ResultsPage';
import { BodyText } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';

export const MyIdSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.enableThreeGreatFeatures.path);
  };

  return (
    <ResultsPage
      title={
        <span>
          {t('openAccountSuccess.Title')}
          <br />
          {t('openAccountSuccess.Subtitle')}
        </span>
      }
      btnTitle={t('openAccountSuccess.Button')}
      onClick={handleClick}
      image="congratulation"
    >
      <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" textAlign="center" lineHeight="24px">
        {t('openAccountSuccess.Description')}
      </BodyText>
    </ResultsPage>
  );
};
