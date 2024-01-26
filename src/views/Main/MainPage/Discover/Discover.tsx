import React from 'react';
import { ROUTES } from 'vars/const/ROUTES';
import { useTranslation } from 'react-i18next';
import { Title } from 'components/general/Typography';
import { BigCard } from './BigCard/BigCard';
import { SCardsContainer, SDiscoverContainer } from './Discover.styles';
import { TenxPlaySection } from './TenxPlaySection/TenxPlaySection';
import { MyMoneyJourneySection } from './MyMoneyJourneySection/MyMoneyJourneySection';

interface IDiscover {
  isZogoLoading: boolean;
}

export const Discover: React.FC<IDiscover> = ({ isZogoLoading }) => {
  const { t } = useTranslation();

  return (
    <SDiscoverContainer>
      <Title justifyContent="start" marginBottom="spacing-med">
        {t('homeScreen.Discover')}
      </Title>

      <SCardsContainer>
        <MyMoneyJourneySection />
        <TenxPlaySection isLoading={isZogoLoading} />
        <BigCard
          title="goalsTools.Goals & Tools"
          iconName="goalsAndTools"
          iconColor="blue"
          bgColor="blue5"
          description={t('goalsTools.See your financial health quiz results and set, track, and update your financial goals.')}
          buttonText="goalsTools.Show Details"
          to={ROUTES.wellness.path}
        />
      </SCardsContainer>
    </SDiscoverContainer>
  );
};
