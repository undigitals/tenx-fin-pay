import React from 'react';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { useTranslation } from 'react-i18next';
import { Layout } from './ProductDisclosure.styles';
import { TProductDisclosureProps, TProductStyle } from './ProductDisclosure.types';

export const ProductDisclosure = ({ margin, marginRight, marginTop, marginBottom, alignSelf, extraStyles }: TProductDisclosureProps) => {
  const { t } = useTranslation();

  const stylesObj: TProductStyle = {
    margin,
    marginRight,
    marginTop,
    marginBottom,
    alignSelf,
  };

  return (
    <Layout $styles={stylesObj} $extraStyles={extraStyles}>
      <CustomText size="small" lineHeight="16px" font="DM Sans" textColor="charcoal70">
        {t('mySubscriptions.TenxGroupIncIsADigitalCompany')}
      </CustomText>
    </Layout>
  );
};
