import React from 'react';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { ILoader } from './Loader.types';
import { SLoader } from './Loader.styles';

export const Loader: React.FC<ILoader> = ({ color = 'charcoal60', noPadding = false, header, noText = false }) => {
  const { t } = useTranslation();

  return (
    <SLoader color={color} noPadding={noPadding}>
      <Spin tip={noText ? undefined : header || t(`loader.Loading`)} />
    </SLoader>
  );
};
