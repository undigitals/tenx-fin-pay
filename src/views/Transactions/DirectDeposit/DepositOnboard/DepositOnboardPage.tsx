import { BodyText, Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { images } from 'assets';
import { FeatureCard } from './FeatureCard';

interface IFeatureCardDataItem {
  id: number;
  index: string;
  img: string;
  title: string;
  description: string;
  to: string;
  buttonTitle: string;
}

export const DepositOnboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [FEATURE_CARD_DATA] = useState<IFeatureCardDataItem[]>(() => [
    {
      id: 0,
      index: '1',
      img: images.startDeposit,
      title: t('onboardDeposit.DirectDeposit'),
      description: t('onboardDeposit.DirectDepositDescription'),
      to: ROUTES.startDeposit.path,
      buttonTitle: t('onboardDeposit.DirectDepositButton'),
    },
    {
      id: 1,
      index: '2',
      img: images.addMoneyNow,
      title: t('onboardDeposit.AddMoney'),
      description: t('onboardDeposit.AddMoneyDescription'),
      to: ROUTES.addMoney.path,
      buttonTitle: t('onboardDeposit.AddMoneyButton'),
    },
    {
      id: 2,
      index: '3',
      img: images.mobileWallet,
      title: t('onboardDeposit.MobileWallet'),
      description: t('onboardDeposit.MobileWalletDescription'),
      to: ROUTES.home.path,
      buttonTitle: t('onboardDeposit.MobileWalletButton'),
    },
  ]);

  const handleGoHome = () => {
    navigate(ROUTES.home.path);
  };

  return (
    <>
      <Title fontWeight="SB" size="M" marginBottom={32}>
        {t('onboardDeposit.Title')}
      </Title>

      {FEATURE_CARD_DATA.map((item: IFeatureCardDataItem) => (
        <FeatureCard index={item.index} img={item.img} key={item.id} title={item.title} description={item.description} to={item.to} buttonTitle={item.buttonTitle} />
      ))}

      <BodyText textType="bodyText" color="charcoal70" justifyContent="center" fontWeight="R" size="T" marginBottom={32}>
        {t('onboardDeposit.Setup')}
      </BodyText>

      <CustomButton preset="primary" onClick={handleGoHome} marginBottom={32}>
        {t('onboardDeposit.GoToHome')}
      </CustomButton>

      <SuttonDisclaimerNote marginBottom={68} />
    </>
  );
};
