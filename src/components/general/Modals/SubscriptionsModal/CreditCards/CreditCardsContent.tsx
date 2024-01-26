import { images } from 'assets';
import { Icon } from 'components/general/Icon/Icon';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';
import React from 'react';
import { SList, SListItem } from 'components/general/Modals/SubscriptionsModal/SubscriptionsModal.styles';
import { useTranslation } from 'react-i18next';

export const CreditCardsContent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="center-image">
        <img src={images.creditCardsModal} alt="creditCardsModal" />
      </div>
      <CustomTitle fontWeight="light" align="start" marginTop="big" marginBottom="bigger" textColor="blue" icon={<Icon name="creditCard" color="blue" />}>
        {t('homeScreen.Credit Cards')}
      </CustomTitle>

      <CustomText marginBottom={30}>{t('preRegOnboarding.Choose the credit card that fits your needs most.')}</CustomText>

      <SList>
        <SListItem>{t('creditCardInfo.A great first credit card that helps build or rebuild credit history and credit score')}</SListItem>
        <SListItem>{t('creditCardInfo.A card that provides a low-cost credit option')}</SListItem>
        <SListItem>{t('creditCardInfo.A card that earns you cash-back rewards')}</SListItem>
      </SList>
    </>
  );
};
