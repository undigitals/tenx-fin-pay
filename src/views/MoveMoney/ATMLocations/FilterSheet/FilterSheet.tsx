import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { BodyText, Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { SRadioButton } from 'views/MoveMoney/ATMLocations/ATMLocationsPage.styles';
import { useTranslation } from 'react-i18next';

interface ISheetProps {
  open?: boolean;
  onClose: () => void;
  onFilter: (values: Record<string, boolean | string>) => void;
}

export const FilterSheet = ({ open, onClose, onFilter }: ISheetProps) => {
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({
    noFee: false,
    openNow: false,
    wheelchair: false,
  });
  const [form] = Form.useForm();

  const handleClose = () => {
    form.setFieldsValue({
      noFee: false,
      openNow: false,
      wheelchair: false,
      sort: '',
    });
    onClose();
  };

  const onFinish = (values: any) => {
    onFilter(values);
    handleClose();
  };

  const checkErrors = () => {
    const formErrors = form.isFieldsTouched() && form.getFieldsError().some(({ errors }): number => errors.length);
    setIsDisabled(formErrors);
  };

  const onCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    form.setFieldValue(name, e.target.checked);
    setCheckboxes({
      ...checkboxes,
      [name]: e.target.checked,
    });
  };

  const handleChecked = (option: string) => {
    setSelectedOption(option);
    form.setFieldValue('sort', option);
  };

  useEffect(() => {
    form.setFieldsValue({
      noFee: false,
      openNow: false,
      wheelchair: false,
      sort: '',
    });
    checkErrors();
    setCheckboxes({
      noFee: false,
      openNow: false,
      wheelchair: false,
    });
  }, [open]);

  return (
    <CustomSheet isOpen={open} onClose={handleClose} header={false} className="atm-filter">
      <Form form={form} onFinish={onFinish} onFieldsChange={checkErrors} autoComplete="off" layout="vertical">
        <Title size="N" fontWeight="SB" marginBottom={16}>
          {t('atmLocations.Category')}
        </Title>
        <Form.Item label="" name="noFee" valuePropName="checked" validateTrigger={['onBlur', 'onChange']} validateFirst>
          <CustomRow justifyContent="flex-start">
            <Checkbox checked={checkboxes.noFee} onChange={(e) => onCheckboxClick(e, 'noFee')} />
            <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
              {t('atmLocations.NoFee')}
            </BodyText>
          </CustomRow>
        </Form.Item>

        <Form.Item label="" name="openNow" valuePropName="checked" validateTrigger={['onBlur', 'onChange']} validateFirst>
          <CustomRow justifyContent="flex-start">
            <Checkbox checked={checkboxes.openNow} onChange={(e) => onCheckboxClick(e, 'openNow')} />
            <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
              {t('atmLocations.Open24')}
            </BodyText>
          </CustomRow>
        </Form.Item>

        <Form.Item label="" name="wheelchair" valuePropName="checked" validateTrigger={['onBlur', 'onChange']} validateFirst>
          <CustomRow justifyContent="flex-start">
            <Checkbox checked={checkboxes.wheelchair} onChange={(e) => onCheckboxClick(e, 'wheelchair')} />
            <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
              {t('atmLocations.WheelchairAccessible')}
            </BodyText>
          </CustomRow>
        </Form.Item>

        <Title size="N" fontWeight="SB" marginBottom={16}>
          {t('atmLocations.SortBy')}
        </Title>

        <Form.Item label="" name="sort" valuePropName="checked" validateTrigger={['onBlur', 'onChange']} validateFirst>
          <SRadioButton onChange={() => handleChecked('distance')} checked={selectedOption === 'distance'}>
            <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
              {t('atmLocations.Distance')}
            </BodyText>
          </SRadioButton>

          <SRadioButton onChange={() => handleChecked('city')} checked={selectedOption === 'city'}>
            <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
              {t('atmLocations.City')}
            </BodyText>
          </SRadioButton>

          <SRadioButton onChange={() => handleChecked('name')} checked={selectedOption === 'name'}>
            <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
              {t('atmLocations.Name')}
            </BodyText>
          </SRadioButton>
        </Form.Item>
        <CustomButton preset="primary" size="large" disabled={isDisabled} marginTop={30}>
          {t('atmLocations.Filter')}
        </CustomButton>
      </Form>
    </CustomSheet>
  );
};
