import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'utils/hooks/store';
import { Icon } from 'components/general/Icon/Icon';
import { Title } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { selectDisplayDateRangeDrawer, setShowDateRangeDrawer, setShowHistoryFilterDrawer } from 'store/ui.slice';
import { selectHistoryFilterParameters, setDateFrom, setDateTo } from 'store/historyFilter/historyFilter.slice';
import { DayPickerComponent } from 'components/general/DayPicker/DayPickerComponent';
import { useLanguage } from 'utils/hooks/useLanguage';
import { TDayPickerRange } from 'components/general/DayPicker/DayPicker';

export const DateRangeSheet: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const isDrawerVisible = useSelector(selectDisplayDateRangeDrawer);
  const historyFilterParams = useSelector(selectHistoryFilterParameters);
  const [dateRange, setDateRange] = useState<TDayPickerRange>(() => {
    const startDate = historyFilterParams?.dateFrom ? new Date(historyFilterParams.dateFrom) : null;
    const endDate = historyFilterParams?.dateTo ? new Date(historyFilterParams.dateTo) : null;
    return [startDate, endDate];
  });

  const handleOnClose = () => {
    dispatch(setShowDateRangeDrawer(false));
    dispatch(setShowHistoryFilterDrawer(true));
  };

  const handleApplyClick = () => {
    dispatch(setDateFrom(dateRange[0]?.toISOString() ?? null));
    dispatch(setDateTo(dateRange[1]?.toISOString() ?? null));
    dispatch(setShowDateRangeDrawer(false));
    dispatch(setShowHistoryFilterDrawer(true));
  };

  const handleRangeChange = (dates: TDayPickerRange) => {
    setDateRange(dates);
  };

  useEffect(() => {
    const startDate = historyFilterParams?.dateFrom ? new Date(historyFilterParams.dateFrom) : null;
    const endDate = historyFilterParams?.dateTo ? new Date(historyFilterParams.dateTo) : null;
    setDateRange([startDate, endDate]);
  }, [historyFilterParams?.dateFrom, historyFilterParams?.dateTo]);

  return (
    <CustomSheet isOpen={isDrawerVisible} onClose={handleOnClose} header headerStyle={{ minHeight: 0, padding: 0 }} className="dataRangeDrawer" wrapperPadding={false}>
      <CustomRow minHeight="100%" flexDirection="column" paddingTop={15}>
        <CustomRow flexDirection="column" width="90%" justifyContent="flex-start" alignItems="flex-start">
          <CustomRow justifyContent="flex-start" alignItems="center" marginBottom={10}>
            <Icon name="arrowLeft" color="charcoal" cursorPointer size="small" onClick={handleOnClose} />
            <Title size="S" fontWeight="SB" font="Poppins" marginLeft={15}>
              {t(`tenxPayHome.Date range`)}
            </Title>
          </CustomRow>
        </CustomRow>

        {/* prettier-ignore */}
        <DayPickerComponent
          open={isDrawerVisible}
          locale={locale}
          range
          value={dateRange}
          onChange={handleRangeChange}
          style={{ width: '100%', maxWidth: '388px', marginBlock: '32px' }}
        />

        <CustomButton preset="primary" size="middleStretch" onClick={handleApplyClick}>
          {t('tenxPayHome.Apply')}
        </CustomButton>
      </CustomRow>
    </CustomSheet>
  );
};
