import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BodyText } from 'components/general/Typography';
import { Form } from 'antd';
import { BaseSelect } from 'components/general/BaseSelect/BaseSelect';
import { US_STATES } from 'vars/const/USE_STATEX';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { AutocompleteAddress } from 'components/general/AutocompleteAddress/AutocompleteAddress';
import { TAddressFields } from 'components/general/AutocompleteAddress/AutocompleteAddress.types';

interface ISearchProps {
  searchType?: string;
  onClose: () => void;
  handleSearch: (value: string) => void;
}

export const SearchForm = ({ searchType, onClose, handleSearch }: ISearchProps) => {
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled] = useState(true);
  const [form] = Form.useForm();

  const setAddressInput = (address: Record<TAddressFields, string>) => {
    form.setFieldValue('search', address ?? '');
  };

  const onFinish = ({ search }: any) => {
    if (typeof search === 'string') {
      handleSearch(search);
    } else {
      handleSearch(search.label);
    }

    onClose();
    form.setFieldsValue({
      search: { value: '', label: '' },
    });
  };

  const checkErrors = () => {
    const formErrors = form.isFieldsTouched() && form.getFieldsError().some(({ errors }): number => errors.length);
    setIsDisabled(formErrors || !form.getFieldValue('search'));
  };

  useEffect(() => {
    checkErrors();
  }, []);

  return (
    <Form form={form} onFinish={onFinish} onFieldsChange={checkErrors} autoComplete="off" layout="vertical">
      <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal">
        <Trans i18nKey="atmLocations.EnterLocation" components={{ span: <span style={{ color: 'red' }} /> }} />
      </BodyText>

      <Form.Item name="search" style={{ marginTop: '4px' }}>
        {searchType === 'State' ? (
          <BaseSelect
            options={US_STATES.map((state) => ({
              value: state.value,
              label: state.label,
            }))}
            placeholder={t('atmLocations.CityZipAddress')}
            menuIsOpen
            isClearable
          />
        ) : (
          <AutocompleteAddress placeholder={t('atmLocations.CityZipAddress')} setAddressComponents={setAddressInput} isInline />
        )}
      </Form.Item>

      <CustomButton preset="primary" size="large" disabled={isDisabled} marginTop={30}>
        {t('atmLocations.Search')}
      </CustomButton>
    </Form>
  );
};
