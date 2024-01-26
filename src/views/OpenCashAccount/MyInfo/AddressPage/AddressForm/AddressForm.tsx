import React, { useEffect } from 'react';
import { Form } from 'antd';
import { SMailingWrapper, SSelectWrapper } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { IHomeAddressForm, FormInputProps } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { addressCityRules, getRequiredRule, maxLengthRule } from 'utils/helpers/validationRules';
import { useTranslation } from 'react-i18next';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { useToggle } from 'utils/hooks/useToggle';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { BodyText, Title } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { AutocompleteAddress } from 'components/general/AutocompleteAddress/AutocompleteAddress';
import { TAddressFields } from 'components/general/AutocompleteAddress/AutocompleteAddress.types';
import { StateAddressSheet } from './StateAddressDrawer';

export const AddressForm: React.FC<FormInputProps<IHomeAddressForm>> = ({ handleSubmit, onCompletion, form, isEditMode, isCheckboxAgreed = false, handleChangeAgree }) => {
  const { openingAccountData } = useCashAccountOpening();
  const { t } = useTranslation();
  const stateAddressSheet = useToggle(false);
  const mailingStateAddressSheet = useToggle(false);

  const formValues = {
    ...openingAccountData,
    mailingCheckbox: isCheckboxAgreed,
  };

  const onFieldsChange = () => {
    const hasEmptyAddressField = !form.getFieldValue('address') || !form.getFieldValue('city') || !form.getFieldValue('stateProvince') || !form.getFieldValue('zipCode');
    const hasErrors = (form.isFieldsTouched() && form.getFieldsError().some(({ errors }) => errors.length)) || Object.values(form.getFieldsValue()).every((value) => !value);
    const isMailingValuesEmpty =
      isCheckboxAgreed && (!form.getFieldValue('mailingAddress1') || !form.getFieldValue('mailingCity') || !form.getFieldValue('mailingPostalCode') || !form.getFieldValue('mailingState'));
    onCompletion(!(hasErrors || isMailingValuesEmpty || hasEmptyAddressField));
  };

  const fillForm = (addressComponents: Record<TAddressFields, string>, name: string | undefined) => {
    let FIELD_NAMES: Record<string, string> = {};

    switch (name) {
      case 'mailingAddress1': {
        FIELD_NAMES = {
          ADDRESS: 'mailingAddress1',
          CITY: 'mailingCity',
          STATE_PROVINCE: 'mailingState',
          ZIP_CODE: 'mailingPostalCode',
        };
        break;
      }
      default:
        FIELD_NAMES = {
          ADDRESS: 'address',
          CITY: 'city',
          STATE_PROVINCE: 'stateProvince',
          ZIP_CODE: 'zipCode',
        };
    }

    form.setFieldsValue({
      [FIELD_NAMES.ADDRESS]: `${addressComponents.street_number ?? ''} ${addressComponents.route?.toUpperCase() ?? ''}`.trim(),
      [FIELD_NAMES.CITY]: (addressComponents.locality ?? addressComponents.administrative_area_level_1)?.toUpperCase() ?? '',
      [FIELD_NAMES.STATE_PROVINCE]: addressComponents.administrative_area_level_1?.toUpperCase() ?? '',
      [FIELD_NAMES.ZIP_CODE]: addressComponents.postal_code ?? '',
    });

    form.validateFields().then();
  };

  useEffect(() => {
    form.setFieldsValue(formValues);
    onFieldsChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openingAccountData]);

  useEffect(() => {
    onFieldsChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckboxAgreed]);

  return (
    <>
      <Form onFieldsChange={onFieldsChange} onFinish={handleSubmit} autoComplete="off" layout="vertical" requiredMark={false} form={form} initialValues={formValues}>
        <CustomCard padding={isEditMode ? '0' : '35px 15px 20px'} borderRadius={20} background={isEditMode ? 'transparent' : 'white'}>
          {!isEditMode && (
            <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginLeft={8} marginBottom={11}>
              {t('myInfo.HomeAddress')}
            </BodyText>
          )}
          <Form.Item name="address" validateTrigger={['onBlur', 'onChange']} validateFirst rules={[getRequiredRule(t('myInfo.Please input your address')), maxLengthRule]}>
            <AutocompleteAddress placeholder={t('myInfo.Street address')} data-testid="addressInput" setAddressComponents={fillForm} />
          </Form.Item>

          <Form.Item name="address2" rules={[maxLengthRule]}>
            <BaseInput placeholder={t('myInfo.Street address line 2')} data-testid="address2Input" onBeige={isEditMode} />
          </Form.Item>

          <Form.Item name="city" validateTrigger={['onBlur', 'onChange']} validateFirst rules={addressCityRules()}>
            <BaseInput placeholder={t('myInfo.City')} data-testid="cityInput" onBeige={isEditMode} />
          </Form.Item>
          <div className="stateAndZipCodeField">
            <SSelectWrapper>
              <Form.Item name="stateProvince" validateFirst validateTrigger={['onBlur', 'onChange']}>
                <BaseInput placeholder={t('myInfo.State')} data-testid="stateInput" onClick={stateAddressSheet.show} onBeige={isEditMode} />
              </Form.Item>
            </SSelectWrapper>
            <SSelectWrapper>
              <Form.Item
                name="zipCode"
                validateTrigger={['onBlur', 'onChange']}
                validateFirst
                rules={[
                  getRequiredRule(t('myInfo.Please input your zip code')),
                  {
                    min: 5,
                    message: t('myInfo.Incomplete Zip code'),
                  },
                ]}
              >
                <BaseInput placeholder={t('myInfo.Zip Code')} data-testid="zipCodeInput" onBeige={isEditMode} inputMode="numeric" maxLength={5} />
              </Form.Item>
            </SSelectWrapper>
          </div>
        </CustomCard>

        {/* checkbox */}
        <div style={{ marginTop: '16px' }}>
          <Form.Item name="mailingCheckbox" valuePropName="checked">
            <Checkbox checked={isCheckboxAgreed} onChange={handleChangeAgree} bgColor="white">
              <BodyText textType="helperText" fontWeight="R" size="S" color="charcoal" font="DM Sans">
                {t('myInfo.MyMailingAddressIsDifferent')}
              </BodyText>
            </Checkbox>
          </Form.Item>
        </div>

        {/* mailingAddress */}
        {isCheckboxAgreed && (
          <SMailingWrapper className={`mailingAddress ${isCheckboxAgreed ? 'open' : 'hide'}`}>
            <Title textAlign="start" fontWeight="M" size="S" font="Poppins" color="charcoal" marginTop={25}>
              {t('myInfo.MailingAddress')}
            </Title>
            <BodyText textType="bodyText" color="charcoal60" size="N" fontWeight="R" marginTop={10} paddingRight={10} marginBottom={33} lineHeight={1.3}>
              {isEditMode ? t('myInfo.ChangeYourMailingAddressHere') : t('myInfo.ProvideMailingAddress')}
            </BodyText>
            <CustomCard padding={isEditMode ? '0' : '35px 15px 20px'} borderRadius={20} background={isEditMode ? 'transparent' : 'white'}>
              {!isEditMode && (
                <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginLeft={8} marginBottom={11}>
                  {t('myInfo.MailingAddress')}
                </BodyText>
              )}
              <Form.Item name="mailingAddress1" validateTrigger={['onBlur', 'onChange']} validateFirst rules={[getRequiredRule(t('myInfo.Please input your address')), maxLengthRule]}>
                <AutocompleteAddress placeholder={t('myInfo.Street address')} data-testid="addressInput" setAddressComponents={fillForm} />
              </Form.Item>

              <Form.Item name="mailingAddress2" rules={[maxLengthRule]}>
                <BaseInput placeholder={t('myInfo.Street address line 2')} data-testid="address2Input" onBeige={isEditMode} />
              </Form.Item>

              <Form.Item name="mailingCity" validateTrigger={['onBlur', 'onChange']} validateFirst rules={addressCityRules()}>
                <BaseInput placeholder={t('myInfo.City')} data-testid="cityInput" onBeige={isEditMode} />
              </Form.Item>
              <div className="stateAndZipCodeField">
                <SSelectWrapper>
                  <Form.Item name="mailingState" validateFirst validateTrigger={['onBlur', 'onChange']}>
                    <BaseInput placeholder={t('myInfo.State')} data-testid="mailingStateInput" onClick={mailingStateAddressSheet.show} onBeige={isEditMode} />
                  </Form.Item>
                </SSelectWrapper>
                <SSelectWrapper>
                  <Form.Item
                    name="mailingPostalCode"
                    validateTrigger={['onBlur', 'onChange']}
                    validateFirst
                    rules={[
                      getRequiredRule(t('myInfo.Please input your zip code')),
                      {
                        min: 5,
                        message: t('myInfo.Incomplete Zip code'),
                      },
                    ]}
                  >
                    <BaseInput placeholder={t('myInfo.Zip Code')} data-testid="zipCodeInput" onBeige={isEditMode} inputMode="numeric" maxLength={5} />
                  </Form.Item>
                </SSelectWrapper>
              </div>
            </CustomCard>
          </SMailingWrapper>
        )}
      </Form>

      <StateAddressSheet
        open={stateAddressSheet.isActive}
        onClose={stateAddressSheet.hide}
        form={form}
        value={openingAccountData.stateProvince}
        fieldName="stateProvince"
        changeSelection={onFieldsChange}
      />
      <StateAddressSheet
        open={mailingStateAddressSheet.isActive}
        onClose={mailingStateAddressSheet.hide}
        form={form}
        value={openingAccountData.mailingState}
        fieldName="mailingState"
        changeSelection={onFieldsChange}
      />
    </>
  );
};
