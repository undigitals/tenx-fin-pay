import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { useGetTenxPayHistoryMutation, useGetTimeEntriesMutation } from 'store/user/payments/payments.api';
import { TThemeColor } from 'styles/theme';
import { Loader } from 'components/general/Loader/Loader';
import { useAppDispatch } from 'utils/hooks/store';
import { setShowHistoryFilterDrawer } from 'store/ui.slice';
import { activateFilter, onResetFilter, selectHistoryFilterData, setPrevFilter } from 'store/historyFilter/historyFilter.slice';
import { ITenxPayHistoryItem } from 'vars/types/userInfo.types';
import { TimeCard } from './TimeCard/TimeCard';
import { TransferHistory } from './TransferHistory/TransferHistory';
import { SActionBar, SActionCustomButton, SFilter } from './HistoryPage.styles';

const INACTIVE_TEXT_COLOR: TThemeColor = 'blue';
const ACTIVE_TEXT_COLOR: TThemeColor = 'white';

export const HistoryPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const [getHistoryAPI, getHistoryAPIResult] = useGetTenxPayHistoryMutation();
  const [getTimeEntriesAPI, getTimeEntriesAPIResult] = useGetTimeEntriesMutation();
  const { activatedFilter } = useSelector(selectHistoryFilterData);
  const {
    sortBy,
    filterBy: { minAmount, maxAmount, dateFrom, dateTo, destinationAccount },
  } = activatedFilter;

  const [selectedButton, setSelectedButton] = useState<number>(state || 1);
  const [historyData, setHistoryData] = useState<ITenxPayHistoryItem[]>([]);
  const [unfilteredHistoryData, setUnfilteredHistoryData] = useState<ITenxPayHistoryItem[]>([]);
  const [sortedByAmount, setSortedByAmount] = useState(false);

  // sorting & filtering
  const handleSortBy = (data: ITenxPayHistoryItem[]) => {
    if (sortBy.id !== '0' && sortBy.id !== '1' && sortBy.id !== '2' && sortBy.id !== '3') {
      return data;
    }

    const sortByField = sortBy.id === '0' || sortBy.id === '1' ? 'dateTime' : 'amount';
    const getIteratee = (item: ITenxPayHistoryItem) => (sortByField === 'dateTime' ? parseISO(item.dateTime).getTime() : item.amount);
    const sortDirection = sortBy.id === '0' || sortBy.id === '2' ? -1 : 1;
    setSortedByAmount(sortByField === 'amount');
    return [...data].sort((a, b) => sortDirection * (getIteratee(a) - getIteratee(b)));
  };

  const handleSliderFilter = () => unfilteredHistoryData.filter((history) => history.amount >= minAmount && history.amount <= maxAmount);

  const handleDestinationAccountFilter = (data: ITenxPayHistoryItem[]) => (destinationAccount?.alias ? data.filter((acc) => destinationAccount.alias === acc.alias) : data);

  const handleDateFilter = (data: ITenxPayHistoryItem[]) => {
    if (!dateFrom || !dateTo) return data;

    const toNextDay = new Date(dateTo);
    toNextDay.setDate(toNextDay.getDate() + 1);

    const fromTs = new Date(dateFrom).getTime();
    const toTs = toNextDay.getTime();

    return data.filter((history) => {
      const dateTs = parseISO(history.dateTime).getTime();
      return dateTs >= fromTs && dateTs <= toTs;
    });
  };

  const handleFilterChange = () => {
    const filteredByAmount = handleSliderFilter();
    const filterByDestinationAccount = handleDestinationAccountFilter(filteredByAmount);
    const filteredByDate = handleDateFilter(filterByDestinationAccount);
    const result = handleSortBy(filteredByDate);

    setHistoryData(result);
  };

  const handleFilterClick = () => {
    dispatch(setPrevFilter());
    dispatch(setShowHistoryFilterDrawer(true));
  };

  useEffect(() => {
    getHistoryAPI('All');
    getTimeEntriesAPI({});
    dispatch(onResetFilter());
    dispatch(activateFilter());
  }, []);

  useEffect(() => {
    if (getHistoryAPIResult?.isSuccess) {
      setHistoryData(getHistoryAPIResult.data);
      setUnfilteredHistoryData(getHistoryAPIResult.data);
    }
  }, [getHistoryAPIResult?.isSuccess]);

  // start filters
  useEffect(() => {
    handleFilterChange();
  }, [activatedFilter]);
  return (
    <div style={{ position: 'relative' }}>
      {selectedButton === 2 && <SFilter onClick={handleFilterClick} cursorPointer />}

      <SActionBar justifyContent="flex-start" gap={20} marginTop={26} overflowY="auto">
        <SActionCustomButton preset={selectedButton === 1 ? 'primary' : ''} size="middle" onClick={() => setSelectedButton(1)}>
          <BodyText textType="bodyText" color={selectedButton === 1 ? ACTIVE_TEXT_COLOR : INACTIVE_TEXT_COLOR} size="T" fontWeight="M" font="Poppins" marginRight={14} cursorPointer>
            {t('tenxPayHome.Time Card')}
          </BodyText>

          <Icon name="circleTime" color={selectedButton === 1 ? ACTIVE_TEXT_COLOR : INACTIVE_TEXT_COLOR} size="small" cursorPointer />
        </SActionCustomButton>

        <SActionCustomButton preset={selectedButton === 2 ? 'primary' : ''} size="middle" onClick={() => setSelectedButton(2)}>
          <BodyText textType="bodyText" color={selectedButton === 2 ? ACTIVE_TEXT_COLOR : INACTIVE_TEXT_COLOR} size="T" fontWeight="M" font="Poppins" marginRight={14} cursorPointer>
            {t('tenxPayHome.Request History')}
          </BodyText>

          <Icon name="recentPayment" color={selectedButton === 2 ? ACTIVE_TEXT_COLOR : INACTIVE_TEXT_COLOR} size="normal" cursorPointer />
        </SActionCustomButton>
      </SActionBar>

      {getHistoryAPIResult.isLoading || getTimeEntriesAPIResult.isLoading ? (
        <Loader />
      ) : (
        <>
          {selectedButton === 1 && getTimeEntriesAPIResult?.data && <TimeCard timeEntries={getTimeEntriesAPIResult?.data} isError={getTimeEntriesAPIResult?.isError} />}

          {selectedButton === 2 && <TransferHistory transferHistory={historyData} sortedByAmount={sortedByAmount} isError={getHistoryAPIResult.isError} />}
        </>
      )}
    </div>
  );
};
