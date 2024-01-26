import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDisplayHistoryFiltertDrawer, setShowDateRangeDrawer, setShowDestinationAccountDrawer, setShowHistoryFilterDrawer, setShowSortByDrawer } from 'store/ui.slice';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { initialHistoryFilterState, selectHistoryFilterData, activateFilter, onResetFilter, setMaxAmount, setMinAmount } from 'store/historyFilter/historyFilter.slice';
import { Form } from 'antd';
import { MaskedInput } from 'components/general/MaskedInput/MaskedInput';
import { Icon } from 'components/general/Icon/Icon';
import { useForm } from 'antd/es/form/Form';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useLanguage } from 'utils/hooks/useLanguage';
import { SInputWrapper, SLineSeparator, SOutlinedCard, SCustomRow, SCustomSheet } from './HistoryFilterSheet.styles';

const AMOUNT_MASK = '000000000000';
const AMOUNT_MASK_OPTIONS = {
  lazy: true,
  placeholderChar: ' ',
};

export const HistoryFilterSheet = () => {
  const dispatch = useDispatch();
  const { locale } = useLanguage();
  const { t } = useTranslation();
  const [form] = useForm();
  const isDrawerVisible = useSelector(selectDisplayHistoryFiltertDrawer);
  const filterData = useSelector(selectHistoryFilterData);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    [locale]
  );

  const OnCloseSheet = () => {
    dispatch(setShowHistoryFilterDrawer(false));
  };

  const handleAmountChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === 'minAmount') dispatch(setMinAmount(value));
    if (type === 'maxAmount') dispatch(setMaxAmount(value));
  };

  const handleDestinationClick = () => {
    dispatch(setShowHistoryFilterDrawer(false));
    dispatch(setShowDestinationAccountDrawer(true));
  };

  const handleDateRangeClick = () => {
    dispatch(setShowHistoryFilterDrawer(false));
    dispatch(setShowDateRangeDrawer(true));
  };

  const handleSortingClick = () => {
    dispatch(setShowHistoryFilterDrawer(false));
    dispatch(setShowSortByDrawer(true));
  };

  // filter actions
  const onFilter = () => {
    dispatch(activateFilter());
    dispatch(setShowHistoryFilterDrawer(false));
  };

  const onReset = () => {
    form.resetFields();
    dispatch(onResetFilter());
  };

  useEffect(() => {
    if (isDrawerVisible) form.setFieldsValue(filterData);
  }, [isDrawerVisible]);

  return (
    <SCustomSheet isOpen={isDrawerVisible} onClose={OnCloseSheet} header closable={false} wrapperPadding={false} headerStyle={{ minHeight: 0, padding: 0 }} height="auto">
      <Title color="charcoal" size="S" fontWeight="SB" font="Poppins">
        {t('tenxPayHome.Filter')}
      </Title>

      <SCustomRow flexDirection="column" minHeight="100%">
        <Form name="historyFilterForm" form={form} initialValues={initialHistoryFilterState}>
          <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="SB" font="Poppins" marginTop={32} marginBottom={16}>
            {t('tenxPayHome.Amount')}
          </BodyText>

          <SInputWrapper>
            <Form.Item name={['filterBy', 'minAmount']}>
              <MaskedInput
                placeholder={t('tenxPayHome.From')}
                suffix={<Icon name="dollarSign" color="charcoal" />}
                onChange={(e) => handleAmountChange(e, 'minAmount')}
                mask={AMOUNT_MASK}
                maskOptions={AMOUNT_MASK_OPTIONS}
                minWidth={120}
                isSuffixIcon
                inputMode="numeric"
              />
            </Form.Item>

            <SLineSeparator />

            <Form.Item name={['filterBy', 'maxAmount']}>
              <MaskedInput
                placeholder={t('tenxPayHome.To')}
                suffix={<Icon name="dollarSign" color="charcoal" />}
                onChange={(e) => handleAmountChange(e, 'maxAmount')}
                mask={AMOUNT_MASK}
                maskOptions={AMOUNT_MASK_OPTIONS}
                minWidth={120}
                isSuffixIcon
                inputMode="numeric"
              />
            </Form.Item>
          </SInputWrapper>

          <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="SB" font="Poppins" marginTop={32} marginBottom={16}>
            {t('tenxPayHome.Destination Account')}
          </BodyText>

          <SOutlinedCard cursorPointer onClick={handleDestinationClick}>
            <Form.Item shouldUpdate>
              {({ getFieldValue }) => {
                const destinationAccount = getFieldValue(['filterBy', 'destinationAccount']);

                return (
                  <CustomRow cursorPointer>
                    {destinationAccount?.iconName && <Icon name={destinationAccount?.iconName} size="small" color="orange" cursorPointer />}

                    <BodyText marginLeft={16} cursorPointer textType="bodyText" color="charcoal" size="M" fontWeight="R" font="DM Sans">
                      {t(destinationAccount?.title)}
                    </BodyText>
                  </CustomRow>
                );
              }}
            </Form.Item>

            <Icon name="chevronRight" size="smaller" color="charcoal" cursorPointer />
          </SOutlinedCard>

          <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="SB" font="Poppins" marginTop={32} marginBottom={16}>
            {t('tenxPayHome.Date range')}
          </BodyText>

          <SOutlinedCard padding="10px 20px" cursorPointer onClick={handleDateRangeClick}>
            <Form.Item shouldUpdate>
              {({ getFieldValue }) => {
                const dateFrom = getFieldValue(['filterBy', 'dateFrom']);
                const dateTo = getFieldValue(['filterBy', 'dateTo']);
                const isDateValid = dateFrom !== null && dateTo !== null;
                const formattedDateFrom = dateFrom ? dateFormatter.format(new Date(dateFrom)) : t('tenxPayHome.From');
                const formattedDateTo = dateTo ? dateFormatter.format(new Date(dateTo)) : t('tenxPayHome.To');

                return (
                  <BodyText cursorPointer textType="bodyText" color={isDateValid ? 'charcoal' : 'charcoal40'} size="M" fontWeight="R" font="DM Sans">
                    {`${formattedDateFrom} - ${formattedDateTo}`}
                  </BodyText>
                );
              }}
            </Form.Item>

            <Icon name="calendar" size="small" color="charcoal" cursorPointer />
          </SOutlinedCard>

          <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="SB" font="Poppins" marginTop={32} marginBottom={16}>
            {t('tenxPayHome.Sorting')}
          </BodyText>

          <SOutlinedCard cursorPointer onClick={handleSortingClick}>
            <Form.Item shouldUpdate>
              {({ getFieldValue }) => {
                const sortBy = getFieldValue('sortBy');

                return (
                  <CustomRow cursorPointer>
                    <Icon name="sortBy" size="small" color="charcoal" cursorPointer />

                    <BodyText marginLeft={10} cursorPointer textType="bodyText" color="charcoal" size="M" fontWeight="R" font="Poppins">
                      {t(sortBy?.title)}
                    </BodyText>
                  </CustomRow>
                );
              }}
            </Form.Item>

            <Icon name="chevronRight" size="smaller" color="charcoal" cursorPointer />
          </SOutlinedCard>
        </Form>

        <CustomRow width="100%" paddingTop={14} justifyContent="flex-end">
          <CustomButton size="middleAlt" marginRight={10} onClick={onReset}>
            {t('tenxPayHome.Reset')}
          </CustomButton>
          <CustomButton preset="primary" size="middleAlt" onClick={onFilter}>
            {t('tenxPayHome.Filter')}
          </CustomButton>
        </CustomRow>
      </SCustomRow>
    </SCustomSheet>
  );
};
