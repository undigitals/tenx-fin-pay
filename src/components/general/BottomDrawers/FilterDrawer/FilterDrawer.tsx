import { Form } from 'antd';
import { CustomBottomDrawer } from 'components/theme/CustomBottomDrawer/CustomBottomDrawer';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React, { CSSProperties, useEffect, useState } from 'react';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { useToggle } from 'utils/hooks/useToggle';
import { format } from 'date-fns';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { BodyText, Title } from 'components/general/Typography';
import { Icon } from 'components/general/Icon/Icon';
import { MaskedInput } from 'components/general/MaskedInput/MaskedInput';
import { useTranslation } from 'react-i18next';
import { useForm } from 'antd/es/form/Form';
import { IFilterDrawerProps, TFilterParamsInit } from 'views/Account/BalancesTransactionsPage/BalancesTransactionsPage.types';
import { SAmountSeparator, SContentWrapperStyle, SIcon, SOutlinedCard } from './FilterDrawer.styles';
import { IntervalFilter } from './IntervalFilter/IntervalFilter';
import { AccountDrawer } from './AccountTypeDrawer/AccountDrawer';
import { SortDrawer } from './SortDrawer/SortDrawer';
import { TDates, TSortType } from './FilterDrawer.types';

const AMOUNT_MASK = '000000000000';
const AMOUNT_MASK_OPTIONS = {
  lazy: true,
  placeholderChar: ' ',
};

export const FilterDrawer = ({ isOpen, onOpen, onClose, onFilter, amountUpperLimit, filterParamsInit, filterParams, prevScreen = '' }: IFilterDrawerProps) => {
  const [form] = useForm();
  const intervalSheet = useToggle(false);
  const accountSheet = useToggle(false);
  const sortSheet = useToggle(false);
  const { t } = useTranslation();
  const [isIncomingChboxDisabled, setIncChboxDisabled] = useState(false);
  const [isOutgoingChboxDisabled, setOutgChboxDisabled] = useState(false);

  const formStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
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

  const handleIntervalSelect = (dates: TDates) =>
    form.setFieldsValue({
      filterBy: {
        fromDate: dates[0],
        toDate: dates[1],
      },
    });

  const handleOnClose = () => {
    onClose();
  };

  const handleIntervalSheetClose = () => {
    intervalSheet.hide();
    onOpen();
  };

  const handleOnReset = () => {
    form.resetFields();
    setIncChboxDisabled(false);
    setOutgChboxDisabled(false);
  };

  const handleOnFilter = (formValues: TFilterParamsInit) => {
    if (!formValues.filterBy.minAmount || !formValues.filterBy.maxAmount) {
      form.setFieldValue(['filterBy', 'minAmount'], filterParamsInit.filterBy.minAmount);
      form.setFieldValue(['filterBy', 'maxAmount'], filterParamsInit.filterBy.maxAmount);
    }

    if (!formValues.filterBy.fromDate || !formValues.filterBy.toDate) {
      form.setFieldValue(['filterBy', 'fromDate'], filterParamsInit.filterBy.fromDate);
      form.setFieldValue(['filterBy', 'toDate'], filterParamsInit.filterBy.toDate);
    }

    const formData = form.getFieldsValue();
    onFilter(formData);
    onClose();
  };

  const handleOnInterval = () => {
    onClose();
    intervalSheet.show();
  };

  const closeAccountDrawer = () => {
    onOpen();
    accountSheet.hide();
  };

  const openSortDrawer = () => {
    onClose();
    sortSheet.show();
  };

  const closeSortDrawer = () => {
    onOpen();
    sortSheet.hide();
  };

  const getSortValue = (): TSortType => form.getFieldValue('sortBy');

  const setSortValue = (value: TSortType) => {
    form.setFieldValue('sortBy', value);
  };

  const getDatesValue = (): TDates => {
    const {
      filterBy: { fromDate, toDate },
    } = form.getFieldsValue(['filterBy']);
    return [fromDate, toDate];
  };

  useEffect(() => {
    if (isOpen && prevScreen === 'main') {
      form.resetFields();
      form.setFieldsValue(filterParams);

      const incoming = form.getFieldValue(['filterBy', 'incoming']);
      const outgoing = form.getFieldValue(['filterBy', 'outgoing']);

      if (incoming && outgoing) {
        setIncChboxDisabled(false);
        setOutgChboxDisabled(false);
      }
    }
  }, [isOpen]);

  return (
    <>
      <CustomBottomDrawer
        open={isOpen}
        onClose={handleOnClose}
        height="77%"
        contentWrapperStyle={SContentWrapperStyle}
        closeIcon={<SIcon name="closeCircle" color="charcoal70" />}
        headerStyle={{ padding: 0, border: 'none' }}
        bodyStyle={{ paddingTop: 32, paddingBottom: 40 }}
      >
        <Title size="S" marginBottom={32}>
          {t('balancesTransactions.Filter')}
        </Title>

        <Form form={form} name="filtersForm" initialValues={filterParamsInit} onValuesChange={onValuesChange} onFinish={handleOnFilter} style={formStyle}>
          <CustomRow flexDirection="column" justifyContent="flex-start" alignItems="stretch" flex={1} marginBottom={16}>
            <Title size="sS" marginBottom={14}>
              {t('balancesTransactions.TransactionType')}
            </Title>

            <CustomRow marginBottom={32} justifyContent="flex-start">
              <Form.Item name={['filterBy', 'incoming']} valuePropName="checked" style={{ margin: '0 18px 0 0' }}>
                <Checkbox color="charcoal" disabled={isIncomingChboxDisabled}>
                  {t('balancesTransactions.MoneyIn')}
                </Checkbox>
              </Form.Item>

              <Form.Item name={['filterBy', 'outgoing']} valuePropName="checked" style={{ margin: 0 }}>
                <Checkbox color="charcoal" disabled={isOutgoingChboxDisabled}>
                  {t('balancesTransactions.MoneyOut')}
                </Checkbox>
              </Form.Item>
            </CustomRow>

            <Title size="sS" marginBottom={14}>
              {t('balancesTransactions.TransactionAmount')}
            </Title>

            <CustomRow alignItems="center" marginBottom={32}>
              <Form.Item name={['filterBy', 'minAmount']} style={{ margin: 0 }}>
                <MaskedInput
                  placeholder={t('tenxPayHome.From')}
                  suffix={<Icon name="dollarSign" color="charcoal" />}
                  mask={AMOUNT_MASK}
                  maskOptions={AMOUNT_MASK_OPTIONS}
                  minWidth={120}
                  isSuffixIcon
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
                />
              </Form.Item>
            </CustomRow>

            <Title size="sS" marginBottom={14}>
              {t('balancesTransactions.DateRange')}
            </Title>

            <Form.Item name={['filterBy', 'fromDate']} hidden />
            <Form.Item name={['filterBy', 'toDate']} hidden />

            <Form.Item shouldUpdate>
              {({ getFieldValue }) => {
                const fromDateTimestamp = getFieldValue(['filterBy', 'fromDate'])?.valueOf() ?? '';
                const toDateTimestamp = getFieldValue(['filterBy', 'toDate'])?.valueOf() ?? '';
                const fromDateString = fromDateTimestamp ? format(fromDateTimestamp, 'PP') : '';
                const toDateString = toDateTimestamp ? format(toDateTimestamp, 'PP') : '';
                const value = fromDateTimestamp && toDateTimestamp ? `${fromDateString} - ${toDateString}` : '';

                return (
                  <BaseInput
                    onClick={() => handleOnInterval()}
                    placeholder={`${t('balancesTransactions.From')} - ${t('balancesTransactions.To')}`}
                    value={value}
                    readOnly
                    suffix="calendar"
                    suffixColor="charcoal"
                    suffixClick={() => handleOnInterval()}
                  />
                );
              }}
            </Form.Item>

            <Title size="sS" marginBottom={14}>
              {t('balancesTransactions.SortBy')}
            </Title>

            <Form.Item name="sortBy" hidden />

            <SOutlinedCard
              onClick={openSortDrawer}
              style={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Form.Item shouldUpdate style={{ margin: 0 }}>
                {({ getFieldValue }) => {
                  const sortBy = getFieldValue('sortBy');

                  return (
                    <CustomRow cursorPointer paddingBottom={0}>
                      <Icon name="sortBy" size="small" color="charcoal" cursorPointer />

                      <BodyText marginLeft={16} cursorPointer textType="bodyText" color="charcoal" size="M" fontWeight="R" font="DM Sans">
                        {t(sortBy?.title)}
                      </BodyText>
                    </CustomRow>
                  );
                }}
              </Form.Item>

              <Icon name="chevronRight" size="smaller" color="charcoal" cursorPointer />
            </SOutlinedCard>
          </CustomRow>

          <CustomRow justifyContent="flex-end">
            <CustomButton size="middleAlt" type="button" marginRight={10} onClick={handleOnReset}>
              {t('balancesTransactions.Reset')}
            </CustomButton>

            <CustomButton size="middleAlt" preset="primary" type="submit">
              {t('balancesTransactions.Filter')}
            </CustomButton>
          </CustomRow>
        </Form>
      </CustomBottomDrawer>

      <IntervalFilter
        title={t('balancesTransactions.TimeIntervalTitle')}
        isOpen={intervalSheet.isActive}
        onClose={handleIntervalSheetClose}
        getDatesValue={getDatesValue}
        onDateSelect={handleIntervalSelect}
      />
      <AccountDrawer isOpen={accountSheet.isActive} onClose={closeAccountDrawer} accounts={[]} selectedAccount={{}} />
      <SortDrawer isOpen={sortSheet.isActive} getSortValue={getSortValue} onFinish={setSortValue} onClose={closeSortDrawer} />
    </>
  );
};
