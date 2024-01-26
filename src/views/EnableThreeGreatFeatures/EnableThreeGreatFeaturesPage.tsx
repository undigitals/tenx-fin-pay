import React from 'react';
import { BodyText, Title } from 'components/general/Typography';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { images } from 'assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectPolicies } from 'store/user/authentication.slice';
import { FeatureItem } from './FeatureItem/FeatureItem';
import { SLayout, SCustomButton, SWrapper, SFeaturesList } from './EnableThreeGreatFeaturesPage.styles';

export const EnableThreeGreatFeaturesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const policies = useSelector(selectPolicies);
  const { t } = useTranslation();

  const handleNavigateTo = (path: string) => {
    navigate(path, { state: { backPage: location.pathname } });
  };

  return (
    <SLayout>
      <SWrapper>
        <Title size="M" marginBottom={28} justifyContent="start">
          {t('startDeposit.GetStarted')}
        </Title>
        <SFeaturesList>
          <FeatureItem
            index={1}
            title={t('enableThreeGreatFeatures.AddMoneyNow')}
            subTitle={t('enableThreeGreatFeatures.RequiredTime2Minute')}
            description={t('enableThreeGreatFeatures.DontWaitForDirectDeposit')}
            image={images.transferSvg}
            button={{
              text: t('enableThreeGreatFeatures.FundMyAccountNow'),
              onClick: () => navigate(ROUTES.addMoney.path),
            }}
          />

          <FeatureItem
            index={2}
            title={t('enableThreeGreatFeatures.DirectDeposit')}
            subTitle={t('enableThreeGreatFeatures.RequiredTime2Minute')}
            description={t('enableThreeGreatFeatures.SetUpDirectDepositToHaveYourPayroll')}
            image={images.startDeposit}
            button={{
              text: t('enableThreeGreatFeatures.SetUpDirectDeposit'),
              onClick: () => handleNavigateTo(ROUTES.setUpDeposit.path),
            }}
          />

          {policies?.JointAccountEnabled && (
            <FeatureItem
              index={3}
              title={t('enableThreeGreatFeatures.AddAccountholder')}
              subTitle={t('enableThreeGreatFeatures.RequiredTime2Minute')}
              description={t('enableThreeGreatFeatures.AddAccountholderToCashAccount')}
              image={images.jointAccountholder}
              button={{
                text: t('enableThreeGreatFeatures.AddJointAccountholder'),
                onClick: () => handleNavigateTo(ROUTES.myAccountJointAccounts.path),
              }}
            />
          )}
        </SFeaturesList>

        <BodyText justifyContent="center" textType="bodyText" fontWeight="R" size="T" color="charcoal70" marginBottom={30}>
          {t('enableThreeGreatFeatures.YouCanSetupAnyOfTheseFeatures')}
        </BodyText>

        <SCustomButton preset="primary" onClick={() => navigate(ROUTES.home.path)} marginBottom={30}>
          {t('enableThreeGreatFeatures.GoToHomeScreen')}
        </SCustomButton>
      </SWrapper>

      <div className="disclaimer">
        <SuttonDisclaimerNote />
      </div>
    </SLayout>
  );
};
