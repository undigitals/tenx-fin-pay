import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { images } from 'assets';
import { BodyText, Title } from 'components/general/Typography';
import { SArrowRight, SCircle, SLayout } from './StartDepositPage.styles';

export const StartDepositPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGetStarted = () => {
    navigate(ROUTES.directDeposit.path);
  };

  const handleCompleteLater = () => {
    navigate(ROUTES.home.path);
  };

  return (
    <SLayout>
      <>
        <div className="deposit-header">
          <div className="center-image" style={{ marginBottom: '20px', marginTop: '16px' }}>
            <img src={images.startDeposit} alt="startDeposit" />
          </div>

          <Title font="Poppins" fontWeight="M" size="M" color="charcoal" marginBottom={32} textAlign="start">
            {t('startDeposit.HavePaycheckDepositedIntoAccount!')}
          </Title>
        </div>

        <BodyText className="heading" textType="bodyText" fontWeight="B" size="M" textAlign="start" color="charcoal" marginBottom={30}>
          {t('startDeposit.GetStartedIn3Steps')}
        </BodyText>

        <div className="steps-list">
          <div className="steps">
            <SCircle>
              <BodyText textType="bodyText" color="blue" size="M" fontWeight="B">
                1
              </BodyText>
            </SCircle>
            <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="R" lineHeight={1.3}>
              {t('startDeposit.EnterAmountYouLikeDepositedIntoAccount')}
            </BodyText>
          </div>

          <div className="steps">
            <SCircle>
              <BodyText textType="bodyText" color="blue" size="M" fontWeight="B">
                2
              </BodyText>
            </SCircle>
            <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="R" lineHeight={1.3}>
              {t('startDeposit.CheckEmailForPreFilledDirectDepositForm')}
            </BodyText>
          </div>

          <div className="steps">
            <SCircle>
              <BodyText textType="bodyText" color="blue" size="M" fontWeight="B">
                3
              </BodyText>
            </SCircle>
            <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="R" lineHeight={1.3}>
              {t('startDeposit.ForwardFormToYourEmployerOrHR')}
            </BodyText>
          </div>
        </div>
      </>

      <div className="footer">
        <CustomButton onClick={handleGetStarted} preset="primary" marginBottom={25}>
          {t('startDeposit.GetStarted')} <SArrowRight />
        </CustomButton>

        <BodyText textType="bodyText" color="blue" size="N" fontWeight="M" cursorPointer onClick={handleCompleteLater}>
          {t('startDeposit.CompleteLater')}
        </BodyText>
      </div>
    </SLayout>
  );
};
