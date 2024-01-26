import React, { useEffect, useMemo, useState } from 'react';
import { BodyText, Title } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { ROUTES } from 'vars/const/ROUTES';
import { useNavigate } from 'react-router-dom';
import { useToggle } from 'utils/hooks/useToggle';
import { useTranslation } from 'react-i18next';
import { INotificationItem } from 'store/user/notificationsCenter/notificationsCenter.types';
import { TagBar } from 'views/Account/BalancesTransactionsPage/TagBar/TagBar';
import { useLanguage } from 'utils/hooks/useLanguage';
import { isSameDay } from 'date-fns';
import { formatLocaleDate } from 'utils/helpers/date';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { useLazyGetNotificationsByFilterQuery } from 'store/user/users.api';
import { Loader } from 'components/general/Loader/Loader';
import { ItemCard } from './ItemCard/ItemCard';
import { SettingsModal } from './SettingsModal/SettingsModal';
import { DeleteModal } from './DeleteModal/DeleteModal';
import { FilterSheet, handleFilterByValue, handleOrderByValue } from './FilterSheet/FilterSheet';
import { SCustomButton, SMainContentContainer } from './NotificationsCenterPage.styles';
import { SORT_VARIABLES } from './constants';
import { TFiltersParams } from './NotificationsCenterPage.types';

const filterParamsInit: TFiltersParams = {
  filterBy: {
    read: false,
    unread: true,
    deleted: false,
    fromDate: null,
    toDate: null,
  },
  sortBy: SORT_VARIABLES[0],
};

const filterParamsInitRequest = {
  filter: "status eq 'New'",
  orderby: 'CreatedDate desc',
};

const tagNameList: { filterBy: Record<string, string> } = {
  filterBy: {
    read: 'Read',
    unread: 'Unread',
    deleted: 'Deleted',
    fromDate: 'From Date',
    toDate: 'To Date',
  },
};

export const NotificationsCenterPage = () => {
  const { language, locale } = useLanguage();
  const [getNotificationsByFilterAPI, getNotificationsByFilterAPIResult] = useLazyGetNotificationsByFilterQuery();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const settingsModal = useToggle();
  const deleteModal = useToggle();
  const filterSheet = useToggle<{ prevScreen?: string }>(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [currentNotification, setCurrentNotification] = useState('');
  const [filterParams, setFilterParams] = useState(filterParamsInit);

  useEffect(() => {
    getNotificationsByFilterAPI({ showDeleted: false, $orderby: filterParamsInitRequest.orderby, filter: filterParamsInitRequest.filter });
  }, []);

  const openFilterSheet = (screen: string | undefined) => {
    filterSheet.show();
    filterSheet.setData({ prevScreen: screen ?? 'other' });
  };
  /* ----------- */

  const onFilter = (formValues: TFiltersParams, showDeleted: boolean, orderString: string, filterString?: string) => {
    const filter = filterString || undefined;
    getNotificationsByFilterAPI({ showDeleted, $orderby: orderString, filter });

    const { filterBy, sortBy } = formValues;

    setFilterParams({
      ...filterParams,
      filterBy,
      sortBy,
    });
  };

  const handleTagClose = (tagName: string) => {
    const { filterBy, sortBy } = filterParams;
    const { fromDate: fromDateInit, toDate: toDateInit } = filterParamsInit.filterBy;

    const value = filterParamsInit.filterBy[tagName as keyof typeof filterParamsInit.filterBy];
    let filterValue = { [tagName]: value };

    if (['read', 'unread', 'deleted'].includes(tagName)) {
      filterValue = { [tagName]: false };
    }

    if (['fromDate', 'toDate'].includes(tagName)) {
      filterValue = { fromDate: fromDateInit, toDate: toDateInit };
    }

    setFilterParams({
      filterBy: { ...filterBy, ...filterValue },
      sortBy,
    });

    const filterString = handleFilterByValue({ ...filterBy, ...filterValue }, !!search.length, search);
    const orderString = handleOrderByValue(sortBy);
    const filter = filterString || undefined;

    getNotificationsByFilterAPI({ showDeleted: filterBy.deleted, $orderby: orderString, filter });
  };

  /* Search handling */
  const handleSearch = (searchValue: string) => {
    const { filterBy, sortBy } = filterParams;

    const filterString = handleFilterByValue(filterBy, true, searchValue);
    const orderString = handleOrderByValue(sortBy);
    const filter = filterString || undefined;

    getNotificationsByFilterAPI({ showDeleted: filterBy.deleted, $orderby: orderString, filter });
  };

  const handleSearchClose = () => {
    setIsSearchVisible(false);
    setSearch('');
    handleSearch('');
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    handleSearch(event.target.value);
  };
  /* -------- */

  const groupedByDateNotifications = useMemo(() => {
    if (!getNotificationsByFilterAPIResult.currentData?.results?.length) return [];

    let currentGroupDate = new Date(getNotificationsByFilterAPIResult.currentData?.results[0]?.dateSent);
    const groups: INotificationItem[][] = [[]];

    getNotificationsByFilterAPIResult.currentData?.results?.forEach((item: INotificationItem) => {
      const itemDate = new Date(item?.dateSent);

      if (isSameDay(itemDate, currentGroupDate)) {
        const currentGroup = groups.at(-1);
        currentGroup?.push(item);
      } else {
        currentGroupDate = new Date(item?.dateSent);
        groups.push([item]);
      }
    });

    return groups;
  }, [getNotificationsByFilterAPIResult.currentData]);

  return (
    <SMainContentContainer>
      <CustomRow marginBottom={28} paddingTop={16}>
        <Title font="Poppins" fontWeight="SB" size="M" color="charcoal">
          {t('notificationsCenter.NotificationsCenter')}
        </Title>

        <Icon name="settings" onClick={() => navigate(ROUTES.notificationSettings.path)} cursorPointer />
      </CustomRow>

      <CustomRow alignItems="flex-start">
        <CustomRow flexDirection="column" alignItems="flex-start">
          <TagBar filterBy={filterParams.filterBy} tagNameList={tagNameList} onClose={handleTagClose} locale={language} marginBottom={12} />

          <CustomRow flexDirection="column" alignItems="flex-start" justifyContent="center" marginBottom={20}>
            <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5}>
              {t('notificationsCenter.SortBy')}
            </BodyText>

            <BodyText textType="bodyText" fontWeight="B" size="N" color="charcoal" lineHeight={1.5}>
              {t(filterParams.sortBy.title)}
            </BodyText>
          </CustomRow>
        </CustomRow>

        <CustomRow justifyContent="flex-end" paddingTop={4}>
          <SCustomButton type="button" onClick={() => openFilterSheet('main')} className="noBorder" marginRight={8}>
            <Icon name="filter" size="normal" color="charcoal70" cursorPointer />
          </SCustomButton>

          <SCustomButton type="button" className="noBorder">
            <Icon name="search" size="normal" color="charcoal70" cursorPointer onClick={() => setIsSearchVisible(true)} />
          </SCustomButton>
        </CustomRow>
      </CustomRow>

      {isSearchVisible && (
        <BaseInput
          placeholder={t(`notificationsCenter.WhatAreYouLookingFor`)}
          suffix="close"
          value={search}
          onBeige
          onChange={handleSearchInputChange}
          suffixClick={handleSearchClose}
          marginBottom={15}
          suffixSize="smallest"
        />
      )}

      {getNotificationsByFilterAPIResult.isFetching && <Loader />}
      {!groupedByDateNotifications.length && <CustomRow justifyContent="center">{t('notificationsCenter.NoDataAvailable')}</CustomRow>}

      <CustomRow flexDirection="column" marginBottom={80}>
        {groupedByDateNotifications?.map((group, i: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <section key={i} className="group">
            {group[0]?.dateSent && (
              <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" marginBottom={16}>
                {formatLocaleDate(new Date(group[0]?.dateSent), 'EEE, MMM dd', locale)}
              </BodyText>
            )}

            {group?.map((notification) => (
              <ItemCard notification={notification} key={notification.dateSent} openSettings={settingsModal.show} setCurrentNotification={setCurrentNotification} />
            ))}
          </section>
        ))}
      </CustomRow>

      <SettingsModal open={settingsModal.isActive} onClose={settingsModal.hide} openDeleteModal={deleteModal.show} />
      <DeleteModal open={deleteModal.isActive} onClose={deleteModal.hide} alertHistoryId={currentNotification} />
      <FilterSheet
        open={filterSheet.isActive}
        onOpen={openFilterSheet}
        onClose={filterSheet.hide}
        filterParamsInit={filterParamsInit}
        filterParams={filterParams}
        onFilter={onFilter}
        prevScreen={filterSheet?.data?.prevScreen}
        searchValue={search}
      />
    </SMainContentContainer>
  );
};
