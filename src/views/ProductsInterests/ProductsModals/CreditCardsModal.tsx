import React from 'react';
import { ReactComponent as CreditCardsSvg } from 'assets/images/creditCards.svg';
import { useTranslation } from 'react-i18next';
import { IProductModalCompactProps, ProductModal } from './ProductModal';

export const CreditCardsModal: React.FC<IProductModalCompactProps> = ({ visible = false, handleClose }) => {
  const { t } = useTranslation();

  const CreditCardsModalContent = () => (
    <>
      <p>{t('preRegOnboarding.Choose the credit card that fits your needs most.')}</p>
      <ul>
        <li>{t('preRegOnboarding.My Credit Builder Card: A great first credit card that helps build or rebuild credit history and credit score.')}</li>
        <li>{t('preRegOnboarding.My Perc Card: A card that provides a low-cost credit option')}</li>
        <li>{t('preRegOnboarding.My Rewards Card: A card that earns you cash-back rewards')}</li>
      </ul>
    </>
  );

  return (
    <ProductModal visible={visible} title={t('creditCardInfo.Credit Cards')} topImg={<CreditCardsSvg />} badgeName="creditCardBadge" content={<CreditCardsModalContent />} handleClose={handleClose} />
  );
};
