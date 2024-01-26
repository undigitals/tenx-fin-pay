import React from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from 'assets';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Title } from 'components/general/Typography';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { SArrowRight, SButtonContentWrapper } from './AccountApprovedPage.styles';

export const AccountApprovedPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOnComplete = () => {
    navigate(ROUTES.tenxPayHome.path);
  };

  return (
    <CustomRow flexDirection="column" alignItems="inherit" minHeight="100%">
      <div>
        <CustomRow justifyContent="center" marginBottom={32} marginTop={103}>
          <img src={images.congratulation} alt="enroll" />
        </CustomRow>

        <CustomRow flexDirection="column">
          <Title size="M" fontWeight="M" font="Poppins" textAlign="center">
            {t('enrollAccountApproved.Congrats!')}
          </Title>
          <Title size="M" fontWeight="M" font="Poppins" textAlign="center">
            {t("enrollAccountApproved.You've been enrolled for Tenx Pay.")}
          </Title>
        </CustomRow>
      </div>

      <div>
        <CustomButton preset="primary" onClick={handleOnComplete} marginBottom={34} marginTop={34}>
          <SButtonContentWrapper>
            {t('enrollAccountApproved.Continue')} <SArrowRight />
          </SButtonContentWrapper>
        </CustomButton>
      </div>
    </CustomRow>
  );
};
