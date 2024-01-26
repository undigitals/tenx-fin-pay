import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { useEditUserProfileDataMutation, useGetUserProfileDataMutation } from 'store/user/users.api';
import { BodyText, Title } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { Form, Col, Row } from 'antd';
import { addressCityRules, getRequiredRule, maxLengthRule } from 'utils/helpers/validationRules';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Input } from 'components/general/Input/Input';
import { useFormHelpers } from 'utils/hooks/useFormHelpers';
import { Loader } from 'components/general/Loader/Loader';
import { useToggle } from 'utils/hooks/useToggle';
import { StateAddressSheet } from 'views/OpenCashAccount/MyInfo/AddressPage/AddressForm/StateAddressDrawer';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { AutocompleteAddress } from 'components/general/AutocompleteAddress/AutocompleteAddress';
import { TAddressFields } from 'components/general/AutocompleteAddress/AutocompleteAddress.types';

interface IFormValues {
  address1: string;
  address2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  isMailingDifferent?: boolean;
  mailingAddress1: string;
  mailingAddress2: string;
  mailingCity: string;
  mailingState: string;
  mailingPostalCode: string;
}

interface IProps {
  closeSheet?: () => void;
}

export const EditAddress = ({ closeSheet }: IProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { checkErrors } = useFormHelpers(form);

  const [editUserProfileData, editUserProfileDataResult] = useEditUserProfileDataMutation();
  const [getUserProfileData] = useGetUserProfileDataMutation();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isMailingDifferent, setIsMailingDifferent] = useState(true);

  const stateAddressSheet = useToggle(false);
  const mailingStateAddressSheet = useToggle(false);

  const userProfileData = useSelector(selectCurrentUser);
  const { address1, address2, city, stateProvince, postalCode, mailingAddress1, mailingAddress2, mailingCity, mailingStateProvince, mailingPostalCode, isMailingAddressTheSame } =
    userProfileData || {};

  const initialValues = {
    address1,
    address2,
    city,
    stateProvince,
    postalCode,
    isMailingDifferent: !isMailingAddressTheSame,
    mailingAddress1,
    mailingAddress2,
    mailingCity,
    mailingState: mailingStateProvince,
    mailingPostalCode,
  };

  const handleFormChange = () => {
    setIsDisabled(form.getFieldsError().some(({ errors }) => errors.length));
  };

  const handleChangeDifferentMail = () => {
    setIsMailingDifferent((preVal) => !preVal);
    handleFormChange();
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
          ADDRESS: 'address1',
          CITY: 'city',
          STATE_PROVINCE: 'stateProvince',
          ZIP_CODE: 'postalCode',
        };
    }

    form.setFieldsValue({
      [FIELD_NAMES.ADDRESS]: `${addressComponents.street_number ?? ''} ${addressComponents.route?.toUpperCase() ?? ''}`.trim(),
      [FIELD_NAMES.CITY]: addressComponents.locality?.toUpperCase() ?? '',
      [FIELD_NAMES.STATE_PROVINCE]: addressComponents.administrative_area_level_1?.toUpperCase() ?? '',
      [FIELD_NAMES.ZIP_CODE]: addressComponents.postal_code ?? '',
    });

    form.validateFields().then();
  };

  const onFinish = (formValues: IFormValues) => {
    const data = {
      profileData: {
        mailingAddress1: formValues.isMailingDifferent ? formValues.mailingAddress1 : formValues.address1,
        mailingAddress2: formValues.isMailingDifferent ? formValues.mailingAddress2 : formValues.address2,
        mailingCity: formValues.isMailingDifferent ? formValues.mailingCity : formValues.city,
        mailingStateProvince: formValues.isMailingDifferent ? formValues.mailingState : formValues.stateProvince,
        mailingPostalCode: formValues.isMailingDifferent ? formValues.mailingPostalCode : formValues.postalCode,
        isMailingAddressTheSame: !formValues.isMailingDifferent,
        address1: formValues.address1,
        address2: formValues.address2,
        city: formValues.city,
        stateProvince: formValues.stateProvince,
        postalCode: formValues.postalCode,
      },
    };

    editUserProfileData(data)
      .then(() => {
        getUserProfileData({});
      })
      .then(() => {
        closeSheet?.();
      });
  };

  useEffect(() => {
    getUserProfileData({});
  }, []);

  useEffect(() => {
    setIsMailingDifferent(!isMailingAddressTheSame);
  }, [isMailingAddressTheSame]);

  return (
    <>
      <Form onFinish={onFinish} onFieldsChange={checkErrors} form={form} requiredMark={false} layout="vertical" autoComplete="off" initialValues={initialValues}>
        {/* Home address */}
        <CustomCard padding="0" marginTop={0}>
          <Title color="charcoal" fontWeight="SB" size="S" marginBottom={10} font="Poppins">
            {t('profile.Home Address')}
          </Title>

          <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" font="DM Sans" marginBottom={32}>
            {t('profile.ChangeYourHomeAddress')}
          </BodyText>

          <Form.Item name="address1" validateTrigger={['onBlur', 'onChange']} rules={[getRequiredRule('profile.Please input street'), maxLengthRule]}>
            <AutocompleteAddress onKeyUp={handleFormChange} placeholder={t('profile.Street address line 1')} setAddressComponents={fillForm} />
          </Form.Item>

          <Form.Item name="address2" validateTrigger={['onBlur', 'onChange']} rules={[maxLengthRule]}>
            <Input placeholder={t('profile.Street address line 2 (optional)')} />
          </Form.Item>

          <Form.Item name="city" validateTrigger={['onBlur', 'onChange']} rules={addressCityRules()}>
            <Input onKeyUp={handleFormChange} placeholder={t('profile.City')} />
          </Form.Item>

          <Row gutter={10}>
            <Col span={12}>
              <Form.Item style={{ width: '100%' }} name="stateProvince" validateTrigger={['onBlur', 'onChange']} rules={[getRequiredRule('profile.State required')]}>
                <Input placeholder={t('myInfo.State')} onClick={stateAddressSheet.show} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="postalCode"
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
                <BaseInput onKeyUp={handleFormChange} placeholder={t('myInfo.Zip Code')} inputMode="numeric" maxLength={5} />
              </Form.Item>
            </Col>
          </Row>
        </CustomCard>

        <CustomRow marginTop={16}>
          <Form.Item name="isMailingDifferent" valuePropName="checked">
            <Checkbox checked={!isMailingAddressTheSame} onChange={handleChangeDifferentMail} bgColor="white">
              <BodyText textType="helperText" fontWeight="R" size="S" color="charcoal" font="DM Sans">
                {t('myInfo.MyMailingAddressIsDifferent')}
              </BodyText>
            </Checkbox>
          </Form.Item>
        </CustomRow>

        {/* Mailing address */}
        {isMailingDifferent && (
          <CustomCard padding="0" marginTop={0}>
            <Title color="charcoal" fontWeight="SB" size="S" marginBottom={10} font="Poppins">
              {t('profile.Mailing Address')}
            </Title>

            <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" font="DM Sans" marginBottom={32}>
              {t('profile.ChangeYourMailingAddress')}
            </BodyText>

            <Form.Item name="mailingAddress1" validateTrigger={['onBlur', 'onChange']} rules={[getRequiredRule('profile.Please input street'), maxLengthRule]}>
              <AutocompleteAddress onKeyUp={handleFormChange} placeholder={t('profile.Street address line 1')} setAddressComponents={fillForm} />
            </Form.Item>

            <Form.Item name="mailingAddress2" validateTrigger={['onBlur', 'onChange']} rules={[maxLengthRule]}>
              <Input placeholder={t('profile.Street address line 2 (optional)')} />
            </Form.Item>

            <Form.Item name="mailingCity" validateTrigger={['onBlur', 'onChange']} rules={addressCityRules()}>
              <Input onKeyUp={handleFormChange} placeholder={t('profile.City')} />
            </Form.Item>

            <Row gutter={10}>
              <Col span={12}>
                <Form.Item style={{ width: '100%' }} name="mailingState" validateTrigger={['onBlur', 'onChange']} rules={[getRequiredRule('profile.State required')]}>
                  <Input placeholder={t('myInfo.State')} onClick={mailingStateAddressSheet.show} />
                </Form.Item>
              </Col>

              <Col span={12}>
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
                  <BaseInput onKeyUp={handleFormChange} placeholder={t('myInfo.Zip Code')} inputMode="numeric" maxLength={5} />
                </Form.Item>
              </Col>
            </Row>
          </CustomCard>
        )}

        <Form.Item>
          <CustomButton preset="primary" type="submit" size="middleStretch" disabled={isDisabled}>
            {t(`profile.Save Changes`)}
          </CustomButton>
        </Form.Item>

        {editUserProfileDataResult.isLoading && <Loader />}
      </Form>

      <StateAddressSheet
        changeSelection={handleFormChange}
        open={stateAddressSheet.isActive}
        onClose={stateAddressSheet.hide}
        form={form}
        value={userProfileData?.stateProvince}
        fieldName="stateProvince"
      />
      <StateAddressSheet
        changeSelection={handleFormChange}
        open={mailingStateAddressSheet.isActive}
        onClose={mailingStateAddressSheet.hide}
        form={form}
        value={userProfileData?.mailingStateProvince}
        fieldName="mailingState"
      />
    </>
  );
};
