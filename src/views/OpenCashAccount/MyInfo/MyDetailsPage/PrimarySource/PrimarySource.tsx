import React from 'react';
import { useTranslation } from 'react-i18next';
import { TMyDetailsProps } from 'views/OpenCashAccount/MyInfo/MyDetailsPage/MyDetailsPage.types';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { IncomeSelectorSheet } from 'views/OpenCashAccount/MyInfo/MyDetailsPage/IncomeSelectorSheet/IncomeSelectorSheet';
import { useToggle } from 'utils/hooks/useToggle';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';

export const PrimarySource: React.FC<TMyDetailsProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const incomeSelectorSheet = useToggle(false);

  const handleInputClick = () => {
    incomeSelectorSheet.show();
  };

  const handleOnSelect = (option: any) => {
    incomeSelectorSheet.hide();
    onChange(option);
  };

  return (
    <>
      <CustomRequiredLabel label={t('accountOpening.Primary Source of Income')} fontFamily="DM Sans" marginBottom={10} marginTop={32} />

      <BaseInput placeholder={t('accountOpening.Select Primary Source of Income')} onClick={handleInputClick} value={value} suffix="chevronDown" suffixColor="charcoal" suffixSize="smaller" />
      <IncomeSelectorSheet handleOnSelect={handleOnSelect} open={incomeSelectorSheet.isActive} onClose={incomeSelectorSheet.hide} value={value} />
    </>
  );
};
