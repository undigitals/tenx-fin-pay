import { TIconName } from 'components/general/Icon/Icon.types';
import { Loader } from 'components/general/Loader/Loader';
import i18next from 'i18next';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLazyGetAttuneResultsQuery } from 'store/user/attune/attune.api';
import { selectAttuneData } from 'store/user/attune/attune.slice';
import { selectCurrentAuthState } from 'store/user/authentication.slice';
import { TThemeColor } from 'styles/theme';
import { ROUTES } from 'vars/const/ROUTES';
import { BigCard } from 'views/Main/MainPage/Discover/BigCard/BigCard';

interface ICardData {
  description: string;
  iconName: TIconName;
  color: TThemeColor;
  bgColor: TThemeColor;
  buttonText: string;
}

export const MyMoneyJourneySection: React.FC = () => {
  const { t } = useTranslation();
  const { attuneQuizId } = useSelector(selectCurrentAuthState);
  const { quizState } = useSelector(selectAttuneData);
  const [getAttuneResultsAPI, getAttuneResultsAPIResult] = useLazyGetAttuneResultsQuery();

  const cardData: ICardData = useMemo(() => {
    /* Quiz reminder is needed */
    if (quizState === 'reminder') {
      return {
        description: i18next.t('myMoneyJourney.DescriptionReminder'),
        iconName: 'calendar',
        color: 'orange',
        bgColor: 'orange5',
        buttonText: i18next.t('myMoneyJourney.TakeQuiz'),
      };
    }

    /* Quiz is completed */
    if (quizState === 'finished') {
      return {
        description: i18next.t('myMoneyJourney.DescriptionCompleted'),
        iconName: 'security',
        color: 'green',
        bgColor: 'green10',
        buttonText: i18next.t('myMoneyJourney.SeeResults'),
      };
    }

    /* Quiz is not started */
    return {
      description: i18next.t('myMoneyJourney.DescriptionDefault'),
      iconName: 'myMoneyMilestones',
      color: 'blue',
      bgColor: 'blue5',
      buttonText: i18next.t('myMoneyJourney.TakeQuiz'),
    };
  }, [quizState]);

  useEffect(() => {
    getAttuneResultsAPI({ id: attuneQuizId ?? '' });
  }, []);

  if (getAttuneResultsAPIResult.isFetching) return <Loader />;

  return (
    <BigCard
      title={t('myMoneyJourney.Title')}
      iconName={cardData.iconName}
      iconColor={cardData.color}
      bgColor={cardData.bgColor}
      description={cardData.description}
      buttonText={cardData.buttonText}
      to={ROUTES.attune.path}
    />
  );
};
