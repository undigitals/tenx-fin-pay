import React, { useEffect, useState } from 'react';
import { CustomBottomDrawer } from 'components/theme/CustomBottomDrawer/CustomBottomDrawer';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useLanguage } from 'utils/hooks/useLanguage';
import { DayPickerComponent } from 'components/general/DayPicker/DayPickerComponent';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { TDates } from 'components/general/BottomDrawers/FilterDrawer/FilterDrawer.types';
import { useTranslation } from 'react-i18next';
import { Title } from 'components/general/Typography';
import { SIcon } from './IntervalFilter.styles';

export type IIntervalFilterProps = {
  title: string;
  sheetHeight?: string;
  isOpen: boolean;
  onClose: () => void;
  getDatesValue: () => TDates;
  onDateSelect: (dates: TDates) => void;
};

export const IntervalFilter: React.FC<IIntervalFilterProps> = ({ title, sheetHeight = '69%', isOpen, onClose, getDatesValue, onDateSelect }) => {
  const [selectedDates, setSelectedDates] = useState<TDates>([null, null]);
  const { language } = useLanguage();
  const { t } = useTranslation();

  const onDateRangeChange = (dates: TDates) => {
    setSelectedDates(dates);
  };

  const handleSubmit = () => {
    const isRangeValue = selectedDates.every(Boolean);
    if (isRangeValue) onDateSelect(selectedDates);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      const dates = getDatesValue();
      setSelectedDates(dates);
    }
  }, [isOpen]);

  return (
    <CustomBottomDrawer
      open={isOpen}
      onClose={onClose}
      height={sheetHeight}
      closeIcon={<SIcon name="closeCircle" color="charcoal70" />}
      headerStyle={{ height: 0, border: 'none' }}
      bodyStyle={{ paddingTop: 0 }}
      contentWrapperStyle={{ borderRadius: '24px 24px 0px 0px' }}
    >
      <CustomRow justifyContent="flex-start" alignItems="center" marginBottom={32}>
        <Icon name="arrowLeft" color="charcoal70" marginRight={10} onClick={onClose} />

        <Title>{title}</Title>
      </CustomRow>

      <DayPickerComponent locale={language} value={selectedDates} range open onChange={onDateRangeChange} style={{ marginBottom: 32 }} />

      <CustomButton preset="primary" size="middleStretch" onClick={handleSubmit} disabled={!selectedDates[1]}>
        {t('balancesTransactions.Apply')}
      </CustomButton>
    </CustomBottomDrawer>
  );
};
