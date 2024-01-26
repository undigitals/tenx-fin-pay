import React from 'react';
import { useTranslation } from 'react-i18next';
import { Title, BodyText } from 'components/general/Typography';
import { IconSign } from 'components/general/Icon/IconSign';
import { SSystemNotAvailable } from './SystemIsNotAvailable.styles';

export const SystemIsNotAvailable: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SSystemNotAvailable>
      <Title marginBottom={16}>{t('homeScreen.My Accounts')}</Title>
      <div className="content">
        <IconSign iconName="triangleWarning" bgColor="orange10" iconColor="goldOrange" />
        <div>
          <BodyText textType="bodyText" fontWeight="SB" color="charcoal" size="L" font="Poppins" marginBottom={7}>
            {t('homeScreen.UnavailableSystem')}
          </BodyText>
          <BodyText textType="bodyText" fontWeight="R" color="charcoal70" size="N">
            {t('homeScreen.TryAgainLater')}
          </BodyText>
        </div>
      </div>
    </SSystemNotAvailable>
  );
};
