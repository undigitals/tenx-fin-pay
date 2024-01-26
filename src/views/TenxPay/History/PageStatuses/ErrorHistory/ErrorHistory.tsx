import { images } from 'assets';
import { BodyText, Title } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ErrorHistory: React.FC = () => {
  const { t } = useTranslation();

  return (
    <CustomRow flexDirection="column" alignItems="center" justifyContent="center" marginTop={70}>
      <img src={images.noTransferHistory} alt="noTransferHistory" />
      <Title font="Poppins" color="charcoal" size="M" fontWeight="M" marginTop={38} textAlign="center">
        {t('tenxPayHome.Your data is not available at the moment.')}
      </Title>
      <BodyText textType="bodyText" font="DM Sans" color="charcoal70" size="N" fontWeight="R" marginTop={16} textAlign="center">
        {t('tenxPayHome.You can refresh your screen or try back again later. We apologize for the inconvenience.')}
      </BodyText>
    </CustomRow>
  );
};
