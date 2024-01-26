import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Item } from './Item/Item';
import { ICurrentAvailableBalanceSheetProps, IBaseSelectOption } from './CurrentAvailableBalanceSheet.types';

export const CurrentAvailableBalanceSheet: React.FC<ICurrentAvailableBalanceSheetProps> = ({ open, options, defaultValue = 'Weekly', onChange, onClose }) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const getSelectedItem = () => options.find((item: IBaseSelectOption) => item.value === selectedValue);

  const handleApplyClick = () => {
    const item = getSelectedItem();
    if (item) {
      onChange(item);
    }
  };

  const handleItemChanged = (item: IBaseSelectOption) => {
    setSelectedValue(item.value);
  };

  return (
    <CustomSheet
      isOpen={open}
      onClose={onClose}
      header
      headerStyle={{ minHeight: 75, padding: 25, paddingBottom: 0, background: 'white' }}
      wrapperPadding={false}
      height="fit-content"
      title={t('notificationsAlerts.Current Available Balance')}
      contentWrapperStyle={{ borderRadius: '24px 24px 0px 0px' }}
    >
      <CustomRow minHeight="100%" flexDirection="column">
        <CustomRow flexDirection="column" width="100%" justifyContent="flex-start" alignItems="flex-start">
          {options.map((item) => (
            <Item value={item.value} key={item.value} label={item.label} onChange={() => handleItemChanged(item)} selected={item.value === selectedValue} />
          ))}
        </CustomRow>

        <CustomButton preset="primary" size="middleStretch" onClick={handleApplyClick} marginTop={32}>
          {t('tenxPayHome.Apply')}
        </CustomButton>
      </CustomRow>
    </CustomSheet>
  );
};
