import React, { useEffect } from 'react';
import { PercPoints } from 'views/Wellness/PercPoints/PercPoints';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'utils/hooks/store';
import { setIsHelpAndSupportTab } from 'store/location.slice';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { BodyText, Title } from 'components/general/Typography';
import { setPreviousTab } from 'store/user/help.slice';
import { EarnPercPoints } from './EarnPercPoints/EarnPercPoints';
import { SWonderingAbout, SLearnAndPlay, SDisclosureContainer } from './LearnAndPlay.styles';

export const LearnAndPlay: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setIsHelpAndSupportTab({ isHelpAndSupportTab: false }));
    dispatch(setPreviousTab('learn-and-play'));
  }, []);

  return (
    <SLearnAndPlay>
      <PercPoints />

      <Title fontWeight="SB" size="S" justifyContent="start" marginBottom={16}>
        {t('learnPlay.Earn Tenx Points')}
      </Title>
      <EarnPercPoints />

      <SWonderingAbout />

      <SDisclosureContainer>
        <div className="disclosure-mobile">
          <SuttonDisclaimerNote marginBottom={25} />
        </div>
        <BodyText textType="bodyText" color="charcoal70" size="S" fontWeight="R" textAlign="start" className="disclosure-web">
          {t('learnPlay.Disclosure')}
        </BodyText>
      </SDisclosureContainer>
    </SLearnAndPlay>
  );
};
