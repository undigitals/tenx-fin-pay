import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';
import packageJson from '../../../../../package.json';
import { SAddress } from './AuthLayoutFooter.styles';

const { Paragraph } = Typography;

export const AuthLayoutFooter: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SAddress>
      <Paragraph>{packageJson.version}</Paragraph>
      <Paragraph>{t('preRegOnboarding.Copyright 2023 Tenx. All Rights Reserved.')}</Paragraph>
    </SAddress>
  );
};
