import { images } from 'assets';
import { Title } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IEmptyHistory {
  isTransferHistory?: boolean;
}

export const EmptyHistory: React.FC<IEmptyHistory> = ({ isTransferHistory = false }) => {
  const { t } = useTranslation();

  return (
    <CustomRow flexDirection="column" alignItems="center" justifyContent="center" marginTop={70}>
      <img src={images.noTransferHistory} alt="noTransferHistory" />
      <Title font="Poppins" color="charcoal" size="M" fontWeight="M" marginTop={38} textAlign="center">
        {isTransferHistory ? t('tenxPayHome.You have not made any transfers yet.') : t('tenxPayHome.No time cards available for this period.')}
      </Title>
    </CustomRow>
  );
};
