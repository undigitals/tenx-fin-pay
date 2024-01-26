import { images } from 'assets';
import { BodyText, Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { ROUTES } from 'vars/const/ROUTES';
import { SPageLayout } from './AddNeedsGoals.styles';

export const AddSuccessPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addAccountType } = useSelector(selectAccountsData);

  const handleSetAsideMoney = () => {
    navigate(ROUTES.internalTransfer.path);
  };

  return (
    <SPageLayout>
      <CustomRow flexDirection="column" width="100%" marginBottom={48}>
        <CustomRow justifyContent="center" paddingLeft={36} marginBottom={32}>
          <img src={images.congratulation} alt="successAdd" />
        </CustomRow>

        <Title color="charcoal" font="Poppins" fontWeight="M" size="M" textAlign="center">
          {addAccountType === 'needs' ? t('addAccount.Congrats on opening a Needs Account') : t('addAccount.Congrats on opening a Goals Account')}
        </Title>

        <BodyText textType="bodyText" fontWeight="R" size="N" textAlign="center" marginTop={16} color="charcoal70">
          {addAccountType === 'needs'
            ? t('addAccount.You can now start setting aside money intended for your monthly expenses.')
            : t('addAccount.You can now start saving money for your future financial goals or setting aside money for a rainy day')}
        </BodyText>
      </CustomRow>

      <CustomButton preset="primary" onClick={handleSetAsideMoney} marginBottom={24}>
        {t('addAccount.Set Aside Money')}
      </CustomButton>

      <Link to={ROUTES.home.path} className="to-home">
        {t('addAccount.ReturnToHome')}
      </Link>
    </SPageLayout>
  );
};
