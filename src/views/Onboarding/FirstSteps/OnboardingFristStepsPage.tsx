import { Title } from 'components/general/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'vars/const/ROUTES';
import { generatePath, useNavigate } from 'react-router-dom';
import { SubscriptionsModal } from 'components/general/Modals/SubscriptionsModal/SubscriptionsModal';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { WELLNESS_TABS } from 'views/Wellness/WellnessPage';
import { useToggle } from 'utils/hooks/useToggle';
import { CashAccountModal } from 'views/Onboarding/CashAccountModal/CashAccountModal';
import cashAndDebitImg from './images/cashAndDebitImg.png';
import tenxPayImg from './images/tenxPayImg.png';
import gamesAndMoreImg from './images/gamesAndMoreImg.png';

import onboardingMan from './images/onboardingMan.png';
import enrollPayPeriod from './images/enrollPayPeriod.png';
import onboardingWay from './images/onboardingWay.png';

import { SLayout, SCustomRow, SCustomButton, SButtonWrapper } from './OnboardingFirstStepsPage.styles';
import { StepCard } from './StepCard';

/* This page appears after "Let's get started" clicked on the Onboarding page */
export const OnboardingFristStepsPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();
  const { isActive: isCashSheetOpen, show: onCashSheetShow, hide: onCashSheetClose } = useToggle(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(ROUTES.home.path);
  };

  return (
    <>
      <SLayout>
        <Title size="M" fontWeight="M" marginBottom={16} justifyContent={isDesktopSize ? 'center' : 'start'}>
          {t('onboardingFirstSteps.Title')}
        </Title>

        <SCustomRow>
          <StepCard
            title={t('onboardingFirstSteps.CashAndDebit')}
            description={t('onboardingFirstSteps.CashAndDebitDescription')}
            buttonText={t('onboardingFirstSteps.Open')}
            img={isDesktopSize ? onboardingMan : cashAndDebitImg}
            onClick={() => (isDesktopSize ? onCashSheetShow() : navigate(ROUTES.starter.path))}
            className="cash-account"
          />
          <StepCard
            title={t('onboardingFirstSteps.TenxPay')}
            description={t('onboardingFirstSteps.TenxPayDescription')}
            buttonText={t('onboardingFirstSteps.Enroll')}
            img={isDesktopSize ? enrollPayPeriod : tenxPayImg}
            onClick={() => navigate(ROUTES.enroll.path)}
          />
          <StepCard
            title={t('onboardingFirstSteps.GamesAndMore')}
            description={t('onboardingFirstSteps.GamesAndMoreDescription')}
            buttonText={t('onboardingFirstSteps.Play')}
            img={isDesktopSize ? onboardingWay : gamesAndMoreImg}
            onClick={() => navigate(generatePath(ROUTES.wellness.path, { tab: WELLNESS_TABS.goalsAndTools, questionName: '' }))}
          />
        </SCustomRow>

        <SButtonWrapper>
          <SCustomButton onClick={handleHomeClick} marginTop={32} marginBottom={16} size="large" preset={isDesktopSize ? '' : 'primary'}>
            {t('onboardingFirstSteps.GoToHome')}
          </SCustomButton>
        </SButtonWrapper>
      </SLayout>

      <CashAccountModal isOpen={isCashSheetOpen} onClose={onCashSheetClose} />
      <SubscriptionsModal />
    </>
  );
};
