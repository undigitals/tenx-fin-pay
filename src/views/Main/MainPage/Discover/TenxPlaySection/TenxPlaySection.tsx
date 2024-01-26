import { Loader } from 'components/general/Loader/Loader';
import { BodyText } from 'components/general/Typography';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCurrentAuthState } from 'store/user/authentication.slice';
import { useLazyGetZogoPointsQuery } from 'store/user/zogo/zogo.api';
import { selectZogoData } from 'store/user/zogo/zogo.slice';
import { ROUTES } from 'vars/const/ROUTES';
import { BigCard } from 'views/Main/MainPage/Discover/BigCard/BigCard';

interface ITenxPlaySection {
  isLoading: boolean;
}

export const TenxPlaySection: React.FC<ITenxPlaySection> = ({ isLoading }) => {
  const { t } = useTranslation();
  const [getZogoPointsAPI, getZogoPointsAPIResult] = useLazyGetZogoPointsQuery();
  const { primaryPoints } = useSelector(selectZogoData);
  const { zogoUserId } = useSelector(selectCurrentAuthState);

  const hasntPlayed = !zogoUserId || primaryPoints === 0;

  useEffect(() => {
    getZogoPointsAPI({ zogoUserId: zogoUserId ?? '' });
  }, []);

  if (getZogoPointsAPIResult.isFetching || isLoading) return <Loader />;

  return (
    <BigCard
      title={hasntPlayed ? 'homeScreen.TenxPlayDefaultTitle' : 'homeScreen.TenxPlayTitle'}
      iconName="tenxPlay"
      iconColor="blue"
      bgColor="blue5"
      description={
        <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" display="inline" justifyContent="start">
          {hasntPlayed ? t('homeScreen.TenxPlayDefaultDescription') : t('homeScreen.TenxPlayDescription')}
        </BodyText>
      }
      buttonText={t('home.Play Now')}
      to={ROUTES.playPercUp.path}
      tooltip
      showPoints={primaryPoints > 0}
      boldText={!hasntPlayed ? t('homeScreen.TenxPlayDescriptionBold') : ''}
    />
  );
};
