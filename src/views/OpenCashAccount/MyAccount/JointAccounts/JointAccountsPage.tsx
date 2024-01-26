import React from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';
import { JointAccountsForm } from './JointAccountsForm/JointAccountsForm';
import { SJointAccounts } from './JointAccounts.styles';

export const JointAccountsPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isFromStarterPage = location.state?.backPage?.includes(ROUTES.enableThreeGreatFeatures.path);
  return (
    <>
      <Header title={t(`accountOpening.JointAccountholder`)} stage={isFromStarterPage ? '' : 'Join Accountholder'} marginBottom={28} />
      <SJointAccounts>
        <Title fontWeight="M" size="S" font="DM Sans">
          {isFromStarterPage ? t('enableThreeGreatFeatures.AddAccountholder') : t(`accountOpening.BecauseYouAreUnder18`)}
        </Title>
        <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal60" marginTop={15} marginBottom={32}>
          {t(`accountOpening.Your joint accountholder will have to complete the application process as well.`)}{' '}
          {t(`accountOpening.Enter their contact information below and we will send them an invitation.`)}
        </BodyText>
        <JointAccountsForm />
      </SJointAccounts>
    </>
  );
};
