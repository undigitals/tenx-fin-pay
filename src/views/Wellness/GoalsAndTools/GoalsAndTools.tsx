import React, { useEffect } from 'react';
import { useAppDispatch } from 'utils/hooks/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectCurrentAuthState } from 'store/user/authentication.slice';
import { ROUTES } from 'vars/const/ROUTES';
import { PercPoints } from 'views/Wellness/PercPoints/PercPoints';
import { Loader } from 'components/general/Loader/Loader';
import { useLazyGetZogoTokenQuery } from 'store/user/zogo/zogo.api';
import { images } from 'assets';
import { setIsHelpAndSupportTab, setWaitlistLocation } from 'store/location.slice';
import { BodyText, Title } from 'components/general/Typography';
import { selectZogoData } from 'store/user/zogo/zogo.slice';
import { MyMoneyJourneySection } from 'views/Main/MainPage/Discover/MyMoneyJourneySection/MyMoneyJourneySection';
import { setPreviousTab } from 'store/user/help.slice';
import { ToolCard } from './ToolCard/ToolCard';
import { SGoalsAndTools, SCustomRow } from './GoalsAndTools.styles';

export const GoalsAndTools: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { zogoUserId } = useSelector(selectCurrentAuthState);
  const { primaryPoints } = useSelector(selectZogoData);
  const hasntPlayed = !zogoUserId || primaryPoints === 0;
  const [getZogoTokenAPI, getZogoTokenAPIResult] = useLazyGetZogoTokenQuery();

  useEffect(() => {
    dispatch(setWaitlistLocation(ROUTES.wellness.path));
    dispatch(setIsHelpAndSupportTab({ isHelpAndSupportTab: false }));
    dispatch(setPreviousTab('goals-and-tools'));
    getZogoTokenAPI();
  }, []);

  if (getZogoTokenAPIResult.isLoading) return <Loader />;

  return (
    <SGoalsAndTools>
      <PercPoints />

      <Title fontWeight="SB" size="S" justifyContent="start" marginBottom={16} marginTop={16}>
        {t('goalsTools.MyMoneyJourney')}
      </Title>

      <MyMoneyJourneySection />

      <Title fontWeight="SB" size="S" justifyContent="start" marginBottom={16} marginTop={30}>
        {t('learnPlay.Earn Tenx Points')}
      </Title>

      <SCustomRow>
        <ToolCard
          imgSrc={images.earnPercPointsGoals}
          buttonPreset="primary"
          description={
            hasntPlayed ? (
              <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" display="inline" justifyContent="start">
                {t('homeScreen.TenxPlayDefaultDescription')}
              </BodyText>
            ) : (
              <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" display="inline" justifyContent="start">
                {t('goalsTools.EarnPercPointsDescription1')}

                <BodyText textType="bodyText" size="N" fontWeight="B" color="charcoal" display="inline" justifyContent="start">
                  {t('goalsTools.TenxPlays')}
                </BodyText>

                {t('goalsTools.EarnPercPointsDescription2')}
              </BodyText>
            )
          }
          buttonText={t('goalsTools.Play Now!')}
          tooltip
          to={ROUTES.playPercUp.path}
          isTenxPlay
        />

        <ToolCard imgSrc={images.inviteFriends} description={t('goalsTools.InviteFriendsAndFamily')} buttonText={t('goalsTools.Invite a Friend')} to={ROUTES.invite.path} />
      </SCustomRow>
    </SGoalsAndTools>
  );
};
