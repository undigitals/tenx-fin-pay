import { images } from 'assets';
import { Title, BodyText } from 'components/general/Typography';
import React from 'react';
import { SContentLayout, SIList, SWrapper } from 'components/general/Modals/SubscriptionsModal/SubscriptionsModal.styles';
import { useTranslation } from 'react-i18next';
import { ProductDisclosure } from 'components/general/ProductDisclosure/ProductDisclosure';

export const PaidAsYouGoContent = () => {
  const { t } = useTranslation();

  return (
    <SContentLayout>
      <div>
        <div className="paid-as-you-go center-image">
          <img src={images.paidAsYouGoModal} alt="paidAsYouGoModal" />
        </div>

        <Title fontWeight="SB" size="S" font="Poppins" textAlign="start" color="charcoal" marginBottom={18}>
          {t('tenxPaySubModal.Title')}
        </Title>

        <SWrapper>
          <BodyText textType="bodyText" size="N" font="DM Sans" color="charcoal70" fontWeight="R" marginBottom={20} lineHeight={1.5} paddingRight={55}>
            {t('tenxPaySubModal.AccessWages')}
          </BodyText>

          <SIList style={{ paddingRight: '55px' }}>
            <li>
              <BodyText textType="bodyText" size="N" font="DM Sans" color="charcoal70" fontWeight="R" lineHeight={1.5}>
                {t('tenxPaySubModal.Earned')}
              </BodyText>
            </li>
            <li>
              <BodyText textType="bodyText" size="N" font="DM Sans" color="charcoal70" fontWeight="R" lineHeight={1.5}>
                {t('tenxPaySubModal.Emergencies')}
              </BodyText>
            </li>
            <li>
              <BodyText textType="bodyText" size="N" font="DM Sans" color="charcoal70" fontWeight="R" lineHeight={1.5}>
                {t('tenxPaySubModal.Payday')}
              </BodyText>
            </li>
            <li>
              <BodyText textType="bodyText" size="N" font="DM Sans" color="charcoal70" fontWeight="R">
                {t('tenxPaySubModal.CashAccount')}
              </BodyText>
            </li>
          </SIList>
        </SWrapper>
      </div>

      <ProductDisclosure margin="0" alignSelf="flex-end" align="left" extraStyles={{ paddingRight: '15px' }} />
    </SContentLayout>
  );
};
