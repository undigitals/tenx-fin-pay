import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { Trans, useTranslation } from 'react-i18next';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText } from 'components/general/Typography';
import { OnboardingSlide } from 'views/Onboarding/OnboardingSlide/OboardingSlide';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { StepCard } from 'views/Onboarding/FirstSteps/StepCard';
import cashAccountImg from './images/cashAccountImg.png';
import tenxPayImg from './images/tenxPayImg.png';
import boostFinancialWellnessImg from './images/boostFinancialWellnessImg.png';
import { SActions, Top, SCarouselWrapper, SContinueBtnWrapper, SLayout, SLearnMoreTextWrapper, SCustomRow, SButtonWrapper, SCustomButton } from './OnboardingPage.styles';

export const OnboardingPage = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isDesktopSize } = useDeviceDimension();
  const navigate = useNavigate();

  const afterChangeHandler = (index: number) => {
    setCurrentSlide(index);
  };

  if (isDesktopSize) {
    return (
      <>
        <SCustomRow marginTop={70}>
          <StepCard title={t('preRegOnboarding.CashAccount')} description={t('preRegOnboarding.CashAccountDescription')} img={cashAccountImg} />
          <StepCard title={t('preRegOnboarding.TenxPay')} description={t('preRegOnboarding.TenxPayDescription')} img={tenxPayImg} />
          <StepCard title={t('preRegOnboarding.BoostFinancialWellness')} description={t('preRegOnboarding.BoostFinancialWellnessDescription')} img={boostFinancialWellnessImg} />
        </SCustomRow>

        <SButtonWrapper>
          <SCustomButton size="large" preset="primary" onClick={() => navigate(ROUTES.registration.path)}>
            {t('preRegOnboarding.Register')}
          </SCustomButton>
        </SButtonWrapper>
      </>
    );
  }

  return (
    <SLayout>
      <Top>
        <SCarouselWrapper infinite={false} afterChange={afterChangeHandler} slidesToShow={1} centerMode centerPadding="1%" arrows={false}>
          <OnboardingSlide
            img={cashAccountImg}
            title={t('preRegOnboarding.CashAccountAndDebitCard')}
            description={
              <Trans i18nKey="preRegOnboarding.CashAccountDescriptionWithStrong">
                The Tenx Cash Account makes <strong>managing your everyday spending</strong> and getting cash easy with the Tenx Visa® Debit Card, over 40,000+surcharge-free ATMs and{' '}
                <strong>round-the-clock digital access</strong>.
              </Trans>
            }
            className="cash-account"
          />
          <OnboardingSlide
            img={tenxPayImg}
            title={t('preRegOnboarding.TenxPay')}
            subtitle={t('preRegOnboarding.PoweredBy')}
            boldText={t('preRegOnboarding.Immediate')}
            description={
              <Trans i18nKey="preRegOnboarding.TenxPayDescriptionWithStrong">
                View and access a portion of the wages you`&apos;`ve <strong>already earned</strong> to help with cash emergencies <strong>in between pay cycles</strong> for a small per-transaction
                fee.
              </Trans>
            }
            className="tenx-pay"
          />
          <OnboardingSlide
            img={boostFinancialWellnessImg}
            title={t('preRegOnboarding.BoostFinancialWellness')}
            description={
              <Trans i18nKey="preRegOnboarding.BoostFinancialWellnessDescriptionWithStrong">
                Start with the MyMoney Journey quiz to see <strong>your financial strengths</strong>. Then build on those skills by playing our <strong>interactive game</strong> about money matters,
                Tenx Plays.
              </Trans>
            }
            className="financial-wellness"
          />
        </SCarouselWrapper>
        {currentSlide === 0 && (
          <SLearnMoreTextWrapper
            initial={{ translateX: '0px' }}
            animate={{ translateX: '7px' }}
            transition={{
              repeatType: 'reverse',
              repeat: Infinity,
              delay: 5,
              duration: 0.5,
              repeatDelay: 1,
            }}
          >
            <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" font="Poppins">
              {t('preRegOnboarding.Swipe')}
            </BodyText>
          </SLearnMoreTextWrapper>
        )}
      </Top>
      <SActions>
        {currentSlide === 2 && (
          <SContinueBtnWrapper>
            <CustomButton marginBottom={56} marginTop={28} size="large" preset="primary" onClick={() => navigate(ROUTES.registration.path)}>
              {t('preRegOnboarding.Register')}
            </CustomButton>
          </SContinueBtnWrapper>
        )}
        {currentSlide !== 2 && (
          <Link to={ROUTES.registration.path}>
            <BodyText cursorPointer textType="bodyText" color="blue" fontWeight="M" size="N" font="DM Sans" marginTop={currentSlide === 0 ? 60 : 100} marginBottom={20}>
              {t('preRegOnboarding.Skip')}
            </BodyText>
          </Link>
        )}
        {currentSlide === 0 && (
          <BodyText
            textType="bodyText"
            fontWeight="R"
            font="DM Sans"
            color="charcoal70"
            size="T"
            textAlign="start"
            lineHeight={1.4}
            marginTop={10}
            marginBottom={10}
            paddingLeft={12}
            paddingRight={12}
          >
            {t(`preRegOnboarding.Disclosure`)}
          </BodyText>
        )}
      </SActions>
    </SLayout>
  );
};
