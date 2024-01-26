import React from 'react';
import { images } from 'assets';
import { useTranslation } from 'react-i18next';
import { SWrapper, SContentLayout } from 'components/general/Modals/SubscriptionsModal/SubscriptionsModal.styles';
import { ProductDisclosure } from 'components/general/ProductDisclosure/ProductDisclosure';
import { BodyText, Title } from 'components/general/Typography';

export const ConnectAndShareContent = () => {
  const { t } = useTranslation();

  return (
    <SContentLayout>
      <div>
        <div className="connect-and-share center-image">
          <img src={images.connectAndShare} alt="connectAndShareModal" />
        </div>

        <Title fontWeight="SB" size="S" font="Poppins" textAlign="start" color="charcoal" marginBottom={8}>
          {t('connectShare.Connect & Share')}
        </Title>

        <SWrapper>
          <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="N" color="charcoal70" marginTop={10} marginBottom={20}>
            {t('connectShare.The Tenx Community Q&A!')}
          </BodyText>
          <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="N" color="charcoal70" marginBottom={20}>
            {t('connectShare.Share your financial knowledge and experiences and learn from others in the Tenx community.')}
          </BodyText>
          <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="N" color="charcoal70">
            {t('connectShare.Stay tuned for our 2023 launch date!')}
          </BodyText>
        </SWrapper>
      </div>

      <ProductDisclosure margin="40px 0 0 0" alignSelf="flex-end" extraStyles={{ paddingRight: '15px' }} />
    </SContentLayout>
  );
};
