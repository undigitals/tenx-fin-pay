import { images } from 'assets';
import React from 'react';
import { SContentLayout, SIList, SWrapper } from 'components/general/Modals/SubscriptionsModal/SubscriptionsModal.styles';
import { useTranslation } from 'react-i18next';
import { ProductDisclosure } from 'components/general/ProductDisclosure/ProductDisclosure';
import { BodyText, Title } from 'components/general/Typography';

export const InternationalTransferContent = () => {
  const { t } = useTranslation();

  return (
    <SContentLayout>
      <div>
        <div className="international-transfer center-image">
          <img src={images.internationalTransferModal} alt="internationalTransferModal" />
        </div>

        <Title fontWeight="SB" size="S" font="Poppins" textAlign="start" color="charcoal" marginBottom={20}>
          {t('internationalTransfer.Title')}
        </Title>

        <SWrapper>
          <BodyText textType="bodyText" font="DM Sans" fontWeight="B" size="N" color="charcoal70" marginBottom={25} paddingRight={70}>
            {t('internationalTransfer.ComingSoon')}
          </BodyText>

          <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="N" color="charcoal70" marginBottom={20}>
            {t('internationalTransfer.SendMoney')}
          </BodyText>

          <SIList style={{ paddingRight: '30px' }}>
            <li>
              <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="N" color="charcoal70">
                {t('internationalTransfer.FastSecure')}
              </BodyText>
            </li>
            <li>
              <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="N" color="charcoal70">
                {t('internationalTransfer.Exchange')}
              </BodyText>
            </li>
          </SIList>
        </SWrapper>
      </div>

      <ProductDisclosure margin="0" alignSelf="flex-end" extraStyles={{ paddingRight: '15px' }} />
    </SContentLayout>
  );
};
