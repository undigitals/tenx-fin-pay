import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { ListItem } from 'views/Transactions/DirectDeposit/SetUpDeposit/ListItem/ListItem';
import { SCustomButton } from './PreFilledSection.styles';

export const PreFilledSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreateForm = () => {
    navigate(ROUTES.directDeposit.path);
  };

  return (
    <CustomCard>
      <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="B" justifyContent="start" marginBottom={24}>
        {t('setUpDeposit.prefilled.Title')}
      </BodyText>

      <ListItem order="1" text={t('setUpDeposit.prefilled.EnterAmount')} />
      <ListItem order="2" text={t('setUpDeposit.prefilled.CheckEmail')} />
      <ListItem order="3" text={t('setUpDeposit.prefilled.ForwardForm')} />

      <SCustomButton preset="primary" onClick={handleCreateForm} marginTop={27}>
        {t('setUpDeposit.prefilled.CreateForm')}
        <Icon name="chevronRight" color="white" size="smaller" marginLeft={10} />
      </SCustomButton>
    </CustomCard>
  );
};
