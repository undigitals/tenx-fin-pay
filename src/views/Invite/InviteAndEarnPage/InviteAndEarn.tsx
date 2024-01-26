import React from 'react';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { PercPoints } from 'views/Wellness/PercPoints/PercPoints';
import { useAnalytics } from 'utils/hooks/useAnalytics';
import { useAppDispatch } from 'utils/hooks/store';
import { setShowAdditionalInformationModal } from 'store/ui.slice';
import { useTranslation } from 'react-i18next';
import { SGoalsAndTools } from 'views/Wellness/GoalsAndTools/GoalsAndTools.styles';
import { BodyText, Title } from 'components/general/Typography';
import { images } from 'assets';
import { InviteAndEarnForm } from './InviteAndEarnForm/InviteAndEarnForm';
import { SIconTooltip } from './InviteAndEarnPage.styles';

export const InviteAndEarnPage: React.FC = () => {
  const { track } = useAnalytics();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleTooltipClick = () => {
    dispatch(
      setShowAdditionalInformationModal({
        displayAdditionalInformationModal: true,
        additionalInformationModalType: 'invite',
      })
    );
    track('navigate', '/invite/additional-info');
  };

  return (
    <SGoalsAndTools>
      <PercPoints />

      <Title font="Poppins" size="M" fontWeight="SB" marginBottom={16} textAlign="start">
        {t('inviteEarn.Invite&Earn')}
      </Title>

      <CustomCard marginBottom={15} padding="24px 28px">
        <div className="center-image" style={{ marginBottom: '30px' }}>
          <img src={images.invite} alt="invite" height={155} width="175px" />
        </div>

        <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" paddingRight={15}>
          {t('inviteEarn.InviteFriends&FamilyJoinTenxCommunity')}
          <BodyText textType="bodyText" size="N" color="charcoal" fontWeight="B" display="inline">
            {t('inviteEarn.20TenxPoints')}
          </BodyText>{' '}
          {t('inviteEarn.ForEachReferral!')}
          <SIconTooltip display="inline-block" cursorPointer onClick={handleTooltipClick} />
        </BodyText>

        <BodyText textType="bodyText" font="Poppins" size="M" fontWeight="SB" color="charcoal" marginBottom={32} marginTop={30} paddingRight={50} textAlign="start">
          {t('inviteEarn.LetThemKnowWhoSendingInvitation')}
        </BodyText>

        <InviteAndEarnForm />
      </CustomCard>
    </SGoalsAndTools>
  );
};
