import React, { useEffect } from 'react';
import { Form } from 'antd';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { BodyText, Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { SCheckboxWrapper } from 'views/NotificationsCenter/NotificationsCenterPage.styles';
import { useTranslation } from 'react-i18next';
import { CustomBottomDrawer } from 'components/theme/CustomBottomDrawer/CustomBottomDrawer';
import { SIcon } from 'components/general/BottomDrawers/FilterDrawer/IntervalFilter/IntervalFilter.styles';
import { format } from 'date-fns';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { SOutlinedCard } from 'components/general/BottomDrawers/FilterDrawer/FilterDrawer.styles';
import { Icon } from 'components/general/Icon/Icon';
import { TDates, TSortType } from 'components/general/BottomDrawers/FilterDrawer/FilterDrawer.types';
import { IntervalFilter } from 'components/general/BottomDrawers/FilterDrawer/IntervalFilter/IntervalFilter';
import { useToggle } from 'utils/hooks/useToggle';
import { SortDrawer } from 'components/general/BottomDrawers/FilterDrawer/SortDrawer/SortDrawer';
import { SORT_VARIABLES } from 'views/NotificationsCenter/constants';
import { TFilterBy, TFiltersParams, TSheetProps } from 'views/NotificationsCenter/NotificationsCenterPage.types';

export const handleFilterByValue = (filterBy: TFilterBy, search: boolean, searchValue: string) => {
  const { read, deleted, unread, fromDate, toDate } = filterBy;
  let queryString = '';

  /* Status query */
  if (deleted) queryString += "status eq 'Deleted'";
  if (read && queryString.length) {
    queryString += " or status eq 'Read'";
  }
  if (read && !queryString.length) {
    queryString += "status eq 'Read'";
  }
  if (unread && queryString.length) {
    queryString += " or status eq 'New'";
  }
  if (unread && !queryString.length) queryString += "status eq 'New'";

  if ((deleted && unread && read) || (deleted && unread) || (deleted && read) || (read && unread)) {
    queryString = '('.concat(queryString);
    queryString = queryString.concat(')');
  }
  /* -------- */

  /* Date interval query */
  if (fromDate && toDate && queryString.length) queryString += ` and (CreatedDate gt ${format(fromDate, 'yyyy-MM-dd')} and CreatedDate lt ${format(toDate, 'yyyy-MM-dd')})`;
  if (fromDate && toDate && !queryString.length) queryString += `CreatedDate gt ${format(fromDate, 'yyyy-MM-dd')} and CreatedDate lt ${format(toDate, 'yyyy-MM-dd')}`;

  /* Search query */
  if (search && searchValue.length && queryString.length) queryString += ` and (contains(subject, '${searchValue}') or contains(plainMessage, '${searchValue}'))`;
  if (search && searchValue.length && !queryString.length) queryString += `contains(subject, '${searchValue}') or contains(plainMessage, '${searchValue}')`;

  return queryString;
};

export const handleOrderByValue = (orderBy: { title: string; id: string }) => (orderBy.id === '0' ? 'CreatedDate desc' : 'CreatedDate asc');

export const FilterSheet = ({ open, onOpen, onClose, filterParamsInit, filterParams, onFilter, prevScreen = '', searchValue }: TSheetProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const intervalSheet = useToggle();
  const sortSheet = useToggle();

  const resetFields = () => form.resetFields();

  /* Sorting */
  const openSortDrawer = () => {
    onClose();
    sortSheet.show();
  };

  const closeSortDrawer = () => {
    sortSheet.hide();
    onOpen();
  };

  const getSortValue = (): TSortType => form.getFieldValue('sortBy');

  const setSortValue = (value: TSortType) => form.setFieldValue('sortBy', value);

  /* Date Range filtering */
  const openIntervalDrawer = () => {
    onClose();
    intervalSheet.show();
  };

  const closeIntervalDrawer = () => {
    intervalSheet.hide();
    onOpen();
  };

  const getDatesValue = (): TDates => {
    const {
      filterBy: { fromDate, toDate },
    } = form.getFieldsValue(['filterBy']);
    return [fromDate, toDate];
  };

  const handleIntervalSelect = (dates: TDates) =>
    form.setFieldsValue({
      filterBy: {
        fromDate: dates[0],
        toDate: dates[1],
      },
    });
  /* -------------- */

  const onFinish = (values: TFiltersParams) => {
    const { filterBy, sortBy } = values;
    const filterString = handleFilterByValue(filterBy, !!searchValue.length, searchValue);
    const orderString = handleOrderByValue(sortBy);
    const filter = filterString || undefined;

    onFilter(values, filterBy.deleted, orderString, filter);
    onClose();
  };

  useEffect(() => {
    if (open && prevScreen === 'main') {
      form.resetFields();
      form.setFieldsValue(filterParams);
    }
  }, [open]);

  return (
    <>
      <CustomBottomDrawer
        open={open}
        onClose={onClose}
        closeIcon={<SIcon name="closeCircle" color="charcoal70" />}
        height="66%"
        headerStyle={{ height: 0, border: 'none' }}
        bodyStyle={{ paddingTop: 0 }}
        contentWrapperStyle={{ borderRadius: '24px 24px 0px 0px' }}
      >
        <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical" initialValues={filterParamsInit}>
          <CustomRow flexDirection="column" alignItems="stretch" flex={1} marginBottom={16}>
            <Title size="S" fontWeight="SB" marginBottom={32}>
              {t('notificationsCenter.Filter')}
            </Title>

            <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="SB" font="Poppins" marginBottom={16}>
              {t('notificationsCenter.NotificationType')}
            </BodyText>

            <SCheckboxWrapper>
              <CustomRow justifyContent="flex-start" paddingRight={16}>
                <Form.Item name={['filterBy', 'read']} valuePropName="checked">
                  <Checkbox>
                    <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R">
                      {t('notificationsCenter.Read')}
                    </BodyText>
                  </Checkbox>
                </Form.Item>
              </CustomRow>

              <CustomRow justifyContent="flex-start" paddingRight={16}>
                <Form.Item name={['filterBy', 'unread']} valuePropName="checked">
                  <Checkbox>
                    <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R">
                      {t('notificationsCenter.Unread')}
                    </BodyText>
                  </Checkbox>
                </Form.Item>
              </CustomRow>

              <CustomRow justifyContent="flex-start" paddingRight={16}>
                <Form.Item name={['filterBy', 'deleted']} valuePropName="checked">
                  <Checkbox>
                    <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R">
                      {t('notificationsCenter.Deleted')}
                    </BodyText>
                  </Checkbox>
                </Form.Item>
              </CustomRow>
            </SCheckboxWrapper>

            <Title size="sS" marginBottom={14}>
              {t('notificationsCenter.DateRange')}
            </Title>

            <Form.Item name={['filterBy', 'fromDate']} hidden />
            <Form.Item name={['filterBy', 'toDate']} hidden />

            <Form.Item shouldUpdate style={{ margin: '0 0 32px' }}>
              {({ getFieldValue }) => {
                const fromDateTimestamp = getFieldValue(['filterBy', 'fromDate'])?.valueOf() ?? '';
                const toDateTimestamp = getFieldValue(['filterBy', 'toDate'])?.valueOf() ?? '';
                const fromDateString = fromDateTimestamp ? format(fromDateTimestamp, 'PP') : '';
                const toDateString = toDateTimestamp ? format(toDateTimestamp, 'PP') : '';
                const value = fromDateTimestamp && toDateTimestamp ? `${fromDateString} - ${toDateString}` : '';

                return (
                  <BaseInput
                    onClick={openIntervalDrawer}
                    placeholder={`${t('notificationsCenter.From')} - ${t('notificationsCenter.To')}`}
                    value={value}
                    readOnly
                    suffix="calendar"
                    suffixColor="charcoal"
                    suffixClick={openIntervalDrawer}
                    marginBottom={0}
                  />
                );
              }}
            </Form.Item>

            <Title size="sS" marginBottom={14}>
              {t('notificationsCenter.SortBy')}
            </Title>

            <Form.Item name="sortBy" hidden />

            <SOutlinedCard
              onClick={openSortDrawer}
              style={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 0,
              }}
            >
              <Form.Item shouldUpdate style={{ margin: 0 }}>
                {({ getFieldValue }) => {
                  const sortByField = getFieldValue('sortBy');

                  return (
                    <CustomRow cursorPointer paddingBottom={0}>
                      <Icon name="sortBy" size="small" color="charcoal" cursorPointer />

                      <BodyText marginLeft={16} cursorPointer textType="bodyText" color="charcoal" size="M" fontWeight="R" font="DM Sans">
                        {t(sortByField?.title)}
                      </BodyText>
                    </CustomRow>
                  );
                }}
              </Form.Item>

              <Icon name="chevronRight" size="smaller" color="charcoal" cursorPointer />
            </SOutlinedCard>
          </CustomRow>

          <CustomRow justifyContent="flex-end">
            <CustomButton size="middleAlt" type="button" onClick={resetFields} marginRight={8}>
              {t('notificationsCenter.Reset')}
            </CustomButton>

            <CustomButton preset="primary" size="middleAlt" type="submit">
              {t('notificationsCenter.Filter')}
            </CustomButton>
          </CustomRow>
        </Form>
      </CustomBottomDrawer>

      <IntervalFilter
        sheetHeight="68%"
        title={t('notificationsCenter.DateRange')}
        isOpen={intervalSheet.isActive}
        onClose={closeIntervalDrawer}
        getDatesValue={getDatesValue}
        onDateSelect={handleIntervalSelect}
      />

      <SortDrawer
        sheetHeight="43%"
        isOpen={sortSheet.isActive}
        confirmButtonOptions={{ title: 'Apply', size: 'middleStretch' }}
        sortOptions={SORT_VARIABLES}
        getSortValue={getSortValue}
        onFinish={setSortValue}
        onClose={closeSortDrawer}
      />
    </>
  );
};
