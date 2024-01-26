import React from 'react';
import { ROUTES } from 'vars/const/ROUTES';
import { useNavigate } from 'react-router-dom';
import { TenxPayMain } from 'components/general/TenxPayMain/TenxPayMain';
import { useTranslation } from 'react-i18next';
import { StyledCustomButton, StyledLink, StyledTenxPayContainer, StyledTenxyBox } from './TenxPay.styles';

interface TenxlPayProps {
  isEnrollDisplay: boolean;
  isCollapsed: boolean;
}

export const TenxPay = ({ isEnrollDisplay, isCollapsed }: TenxlPayProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (isEnrollDisplay) {
    return (
      <StyledTenxyBox>
        <StyledLink to={ROUTES.enroll.path}>
          <StyledCustomButton preset="primary" size="small" marginBottom={3}>
            {t('tenxPayHome.Enroll')}
          </StyledCustomButton>
        </StyledLink>
      </StyledTenxyBox>
    );
  }

  return (
    <StyledTenxPayContainer>
      <TenxPayMain
        onPrimaryButtonClick={() => navigate(ROUTES.tenxPayHome.path)}
        primaryButtonText={t('tenxPayHome.Go to Tenx Pay')}
        secondaryButtonText={t('tenxPayHome.See Time Card')}
        isCollapsed={isCollapsed}
      />
    </StyledTenxPayContainer>
  );
};
