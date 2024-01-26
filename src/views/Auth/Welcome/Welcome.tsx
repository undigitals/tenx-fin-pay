import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Title } from 'components/general/Typography';
import { ROUTES } from 'vars/const/ROUTES';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { selectCurrentAuthState } from 'store/user/authentication.slice';

import handsOnLaptop from './CustomImage/images/handsOnLaptop.png';
import peopleOnChair from './CustomImage/images/peopleOnChair.png';
import peopleSmile from './CustomImage/images/peopleSmile.png';
import tenxPhoneCard from './CustomImage/images/tenxPhoneCard.png';
import { CustomImage } from './CustomImage/CustomImage';

import { SWelcomeLayout, SWelcomeContainer, SWelcomeBackgroundImage, SWelcomeParagraph, SCustomButton, STenxLogo } from './Welcome.styles';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();
  const { isProspectOnly } = useSelector(selectCurrentAuthState);

  return (
    <SWelcomeLayout>
      <SWelcomeBackgroundImage>
        <SWelcomeContainer>
          <STenxLogo height={50} width={170} isWhite={!isDesktopSize} />

          {isDesktopSize && (
            <>
              <CustomImage img={handsOnLaptop} position="topRight" width="35%" />
              <CustomImage img={peopleOnChair} position="topLeft" width="20%" />
              <CustomImage img={tenxPhoneCard} position="bottomLeft" width="20%" />
              <CustomImage img={peopleSmile} position="bottomRight" width="20%" />
            </>
          )}

          <SWelcomeParagraph>
            {isDesktopSize ? (
              <Title color="charcoal" fontWeight="M" size="XXXL" lineHeight={1.3} textAlign="center">
                {t('preRegOnboarding.Welcome')} {t('preRegOnboarding.ToTenx')}
              </Title>
            ) : (
              <div className="welcomeTitleWrapper">
                <Title color="cream" fontWeight="M" size="M" lineHeight={1.3}>
                  {t('preRegOnboarding.Welcome')}
                </Title>
                <Title color="cream" fontWeight="M" size="M" lineHeight={1.3}>
                  {t('preRegOnboarding.ToTenx')}
                </Title>
              </div>
            )}

            <Title
              color={isDesktopSize ? 'charcoal70' : 'cream'}
              fontWeight={isDesktopSize ? 'M' : 'R'}
              size={isDesktopSize ? 'S' : 'T'}
              font={isDesktopSize ? 'DM Sans' : 'Poppins'}
              marginTop={33}
              justifyContent={isDesktopSize ? 'center' : 'start'}
            >
              {t("preRegOnboarding.We're so glad you're here")}
            </Title>
          </SWelcomeParagraph>

          <SCustomButton preset={isDesktopSize ? 'primary' : 'secondary'} size="large" onClick={() => navigate(isProspectOnly ? ROUTES.home.path : ROUTES.onboardingFirstSteps.path)}>
            {t("preRegOnboarding.Let's Get Started")}
          </SCustomButton>
        </SWelcomeContainer>
      </SWelcomeBackgroundImage>
    </SWelcomeLayout>
  );
};
