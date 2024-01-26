import React from 'react';
import { ReactComponent as DepositAccountSvg } from 'assets/images/depositAccounts.svg';
import { useTranslation } from 'react-i18next';
import { IProductModalCompactProps, ProductModal } from './ProductModal';

export const DepositAccountsModal: React.FC<IProductModalCompactProps> = ({ visible = false, handleClose }) => {
  const { t } = useTranslation();

  const DepositAccountsModalContent = () => (
    <>
      <h4>{t('homeScreen.Cash Account')}</h4>
      <p>{t('preRegOnboarding.Safe and reliable with a low monthly fee, the Tenx Cash Account makes managing your everyday spending easy.')}</p>

      <h4>{t('preRegOnboarding.Tools for Budgeting & Saving')}</h4>
      <ul>
        <li>{t('preRegOnboarding.Goals Account: Set aside money intended for your monthly expenses')}</li>
        <li>{t('preRegOnboarding.Needs Account: Save for future financial goals or set aside money for a rainy day')}</li>
        <li>
          Envelopes:
          <br />
          Use our customizable digital envelopes to label money in your Goals and Needs Accounts for specific needs or savings goals
        </li>
      </ul>
    </>
  );

  return <ProductModal visible={visible} title="Cash Account" topImg={<DepositAccountSvg />} badgeName="depositAccounts" content={<DepositAccountsModalContent />} handleClose={handleClose} />;
};
