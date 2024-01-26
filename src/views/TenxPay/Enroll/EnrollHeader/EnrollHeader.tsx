import React from 'react';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Title } from 'components/general/Typography';
import { Trans } from 'react-i18next';
import { ListItem } from 'views/TenxPay/Enroll/ListItem/ListItem';

interface IEnrollHeaderProps {
  title?: string;
}

export const EnrollHeader: React.FC<IEnrollHeaderProps> = ({ title }) => (
  <>
    {title && (
      <CustomRow justifyContent="flex-start" marginBottom={18}>
        <Title font="Poppins" fontWeight="SB" size="S">
          {title}
        </Title>
      </CustomRow>
    )}
    <Title font="Poppins" fontWeight="SB" size="M" marginBottom={18}>
      <Trans i18nKey="tenxPayEnroll.Why enroll in Tenx Pay?" />
    </Title>
    <ListItem>
      <Trans i18nKey="tenxPayEnroll.See your hours worked ..." />
    </ListItem>
    <ListItem>
      <Trans i18nKey="tenxPayEnroll.Get early access ..." />
    </ListItem>
    <ListItem>
      <Trans i18nKey="tenxPayEnroll.Use it to cover an unexpected cost ..." />
    </ListItem>
  </>
);
