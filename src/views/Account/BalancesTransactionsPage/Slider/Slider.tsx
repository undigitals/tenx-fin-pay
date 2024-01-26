import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { MaskedInput } from 'components/general/MaskedInput/MaskedInput';
import { Icon } from 'components/general/Icon/Icon';
import { SAmountSeparator } from 'components/general/BottomDrawers/FilterDrawer/FilterDrawer.styles';
import { format } from 'date-fns';
import { DayPickerComponent } from 'components/general/DayPicker/DayPickerComponent';
import { useLanguage } from 'utils/hooks/useLanguage';
import { TDates } from 'components/general/BottomDrawers/FilterDrawer/FilterDrawer.types';
import { SORT_VARIABLES } from 'components/general/BottomDrawers/FilterDrawer/constants';
import { RadioButton } from 'components/general/RadioButton/RadioButton';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { TFilterParamsInit, TSortBy } from 'views/Account/BalancesTransactionsPage/BalancesTransactionsPage.types';
import { SCalendarContainer, SDateRangeContainer, SLayout } from './Slider.styles';

type TSliderProps = {
  filterParamsInit: TFilterParamsInit;
  filterParams: TFilterParamsInit;
  onFilter: (formValues: TFilterParamsInit) => void;
  search: string;
  setSearch: (value: string) => void;
  amountUpperLimit: number;
};

const AMOUNT_MASK = '000000000000';
const AMOUNT_MASK_OPTIONS = {
  lazy: true,
  placeholderChar: ' ',
};

export const Slider: React.FC<TSliderProps> = ({ filterParamsInit, filterParams, onFilter, search, setSearch, amountUpperLimit }) => {
  const { t } = useTranslation();
  const [filterForm] = useForm();
  const { language } = useLanguage();
  const [isDatesTooltipVisible, setDatesTooltipVisible] = useState(false);
  const [isIncomingChboxDisabled, setIncChboxDisabled] = useState(false);
  const [isOutgoingChboxDisabled, setOutgChboxDisabled] = useState(false);

  const clearSearch = () => setSearch('');

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

  const onDateRangeChange = (dates: TDates) => {
    if (dates?.length === 2) {
      filterForm.setFieldsValue({
        filterBy: {
          fromDate: dates[0],
          toDate: dates[1],
        },
      });
    }
  };

  const handleSortChanged = ({ id, title }: TSortBy) => {
    filterForm.setFieldValue('sortBy', { id, title });
  };

  const resetFilters = () => {
    filterForm.resetFields();
    setIncChboxDisabled(false);
    setOutgChboxDisabled(false);
  };

  const handleSubmit = (formValues: TFilterParamsInit) => {
    if (!formValues.filterBy.minAmount || !formValues.filterBy.maxAmount) {
      filterForm.setFieldValue(['filterBy', 'minAmount'], filterParamsInit.filterBy.minAmount);
      filterForm.setFieldValue(['filterBy', 'maxAmount'], filterParamsInit.filterBy.maxAmount);
    }

    if (!formValues.filterBy.fromDate || !formValues.filterBy.toDate) {
      filterForm.setFieldValue(['filterBy', 'fromDate'], filterParamsInit.filterBy.fromDate);
      filterForm.setFieldValue(['filterBy', 'toDate'], filterParamsInit.filterBy.toDate);
    }

    const formData = filterForm.getFieldsValue();
    onFilter(formData);
  };

  const onValuesChange = ({ filterBy: field }: TFilterParamsInit, { filterBy: filterValues }: TFilterParamsInit) => {
    Object.entries(field).forEach((item) => {
      if (['incoming', 'outgoing'].includes(item[0])) {
        if (!filterValues.incoming) {
          setOutgChboxDisabled(true);
        } else if (!filterValues.outgoing) {
          setIncChboxDisabled(true);
        } else {
          setOutgChboxDisabled(false);
          setIncChboxDisabled(false);
        }
      }
    });
  };

  useEffect(() => {
    filterForm.resetFields();
    filterForm.setFieldsValue(filterParams);

    const incoming = filterForm.getFieldValue(['filterBy', 'incoming']);
    const outgoing = filterForm.getFieldValue(['filterBy', 'outgoing']);

    if (incoming && outgoing) {
      setIncChboxDisabled(false);
      setOutgChboxDisabled(false);
    }
  }, [filterParams]);

  return (
    <SLayout>
      {/* Search */}
      <Title size="sS" marginBottom={14}>
        {t('balancesTransactions.Search')}
      </Title>

      <BaseInput
        placeholder={t(`balancesTransactions.TypeInYourAreLookingFor`)}
        suffix={search ? 'close' : 'search'}
        onBeige
        marginBottom={32}
        suffixColor="charcoal"
        suffixClick={clearSearch}
        suffixSize={search ? 'smallest' : 'normal'}
        value={search}
        onChange={onSearchChange}
      />

      <Form name="filterForm" form={filterForm} initialValues={filterParamsInit} onValuesChange={onValuesChange} onFinish={handleSubmit}>
        {/* Transaction Type */}
        <Title size="sS" marginBottom={14}>
          {t('balancesTransactions.TransactionType')}
        </Title>

        <CustomRow marginBottom={30} flexDirection="column" alignItems="flex-start">
          <Form.Item name={['filterBy', 'incoming']} valuePropName="checked" style={{ flex: 1, margin: '0 0 8px 0' }}>
            <Checkbox color="charcoal" disabled={isIncomingChboxDisabled} textColorChecked="charcoal" bgColor="white">
              {t('balancesTransactions.MoneyIn')}
            </Checkbox>
          </Form.Item>

          <Form.Item name={['filterBy', 'outgoing']} valuePropName="checked" style={{ flex: 1, margin: 0 }}>
            <Checkbox color="charcoal" disabled={isOutgoingChboxDisabled} textColorChecked="charcoal" bgColor="white">
              {t('balancesTransactions.MoneyOut')}
            </Checkbox>
          </Form.Item>
        </CustomRow>

        {/* Transaction Amount */}
        <Title size="sS" marginBottom={14}>
          {t('balancesTransactions.TransactionAmount')}
        </Title>

        <CustomRow alignItems="center" marginBottom={34}>
          <Form.Item name={['filterBy', 'minAmount']} style={{ margin: 0 }}>
            <MaskedInput
              placeholder={t('tenxPayHome.From')}
              suffix={<Icon name="dollarSign" color="charcoal" />}
              mask={AMOUNT_MASK}
              maskOptions={AMOUNT_MASK_OPTIONS}
              minWidth={120}
              isSuffixIcon
              onBeige
            />
          </Form.Item>

          <SAmountSeparator />

          <Form.Item name={['filterBy', 'maxAmount']} style={{ margin: 0 }}>
            <MaskedInput
              placeholder={t('tenxPayHome.To')}
              suffix={<Icon name="dollarSign" color="charcoal" />}
              mask={AMOUNT_MASK}
              maskOptions={AMOUNT_MASK_OPTIONS}
              max={amountUpperLimit}
              minWidth={120}
              isSuffixIcon
              onBeige
            />
          </Form.Item>
        </CustomRow>

        {/* Date Range */}
        <Title size="sS" marginBottom={14}>
          {t('balancesTransactions.DateRange')}
        </Title>

        <Form.Item name={['filterBy', 'fromDate']} hidden />
        <Form.Item name={['filterBy', 'toDate']} hidden />

        <Form.Item shouldUpdate style={{ marginBottom: 32 }}>
          {({ getFieldValue }) => {
            const fromDateValue = getFieldValue(['filterBy', 'fromDate']) ?? null;
            const toDateValue = getFieldValue(['filterBy', 'toDate']) ?? null;
            const fromDateTimestamp = fromDateValue?.valueOf() ?? '';
            const toDateTimestamp = toDateValue?.valueOf() ?? '';
            const fromDateString = fromDateTimestamp ? format(fromDateTimestamp, 'PP') : '';
            const toDateString = toDateTimestamp ? format(toDateTimestamp, 'PP') : '';
            const value = fromDateTimestamp && toDateTimestamp ? `${fromDateString} - ${toDateString}` : '';

            return (
              <SDateRangeContainer>
                <BaseInput
                  placeholder="From - To"
                  value={value}
                  readOnly
                  onClick={() => setDatesTooltipVisible(!isDatesTooltipVisible)}
                  onBeige
                  suffix={isDatesTooltipVisible ? 'collapse' : 'calendar'}
                  suffixColor="charcoal"
                />

                {isDatesTooltipVisible && (
                  <SCalendarContainer>
                    <DayPickerComponent locale={language} value={[fromDateValue, toDateValue]} range open onChange={onDateRangeChange} />
                  </SCalendarContainer>
                )}
              </SDateRangeContainer>
            );
          }}
        </Form.Item>

        <Title size="sS" marginBottom={14}>
          {t('balancesTransactions.SortByTitle')}
        </Title>

        {/* SortBy */}
        <Form.Item name="sortBy" hidden />

        <Form.Item shouldUpdate style={{ marginBottom: 20 }}>
          {({ getFieldValue }) => {
            const sortValue = getFieldValue('sortBy');

            return SORT_VARIABLES.map((item) => {
              const selected = item.id === sortValue.id;

              return (
                <CustomRow marginBottom={16}>
                  <RadioButton onChange={() => handleSortChanged(item)} checked={selected} key={item.id}>
                    <BodyText textType="bodyText" font="DM Sans" color="charcoal" size="N" fontWeight={selected ? 'B' : 'R'} cursorPointer>
                      {t(item.title)}
                    </BodyText>
                  </RadioButton>
                </CustomRow>
              );
            });
          }}
        </Form.Item>

        <Form.Item>
          <CustomButton size="middleStretch" type="submit">
            {t('balancesTransactions.Apply')}
          </CustomButton>

          <CustomButton preset="transparent" size="middleStretch" type="button" onClick={resetFilters}>
            {t('balancesTransactions.Reset')}
          </CustomButton>
        </Form.Item>
      </Form>
    </SLayout>
  );
};
