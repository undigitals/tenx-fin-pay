import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'antd';
import { useChangePhoneGenerateCodeMutation, useGetUserProfileDataMutation } from 'store/user/users.api';
import { setProfilePhoneVerificationSheet } from 'store/ui.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { BodyText, Title } from 'components/general/Typography';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';
import { getPhoneValidator, getRequiredRule } from 'utils/helpers/validationRules';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { MaskedInput } from 'components/general/MaskedInput/MaskedInput';
import { useTranslation } from 'react-i18next';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { getFormattedMobileNumber, getLastNNumbers, getUnmaskedMobileNumber } from 'utils/helpers/phoneNumber';

const PHONE_MASK = '(000) 000 0000';

const PHONE_MASK_OPTIONS = {
  lazy: false,
  placeholderChar: '*',
};
interface IFormValues {
  phoneNumber: string;
}
interface IProps {
  closeSheet?: () => void;
}

export const EditPhoneNumber = ({ closeSheet }: IProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [generateCodeAPI, generateCodeAPIResult] = useChangePhoneGenerateCodeMutation();
  const handleFormChange = (): void => {
    const phoneNumber = form.getFieldValue('phoneNumber');
    const phoneNumberDigits = phoneNumber.replace(/\D/g, '');
    setIsDisabled(phoneNumberDigits.length === 0 || phoneNumberDigits.length === undefined || phoneNumberDigits.length !== 10);
  };

  const userProfileData = useSelector(selectCurrentUser);

  const [getUserProfileData] = useGetUserProfileDataMutation();

  useEffect(() => {
    getUserProfileData({});
  }, []);

  const onFinish = (formValues: IFormValues) => {
    generateCodeAPI({ newPhone: getUnmaskedMobileNumber(`1${formValues.phoneNumber}`) });
  };

  useEffect(() => {
    if (generateCodeAPIResult?.isSuccess) {
      closeSheet?.();
      dispatch(
        setProfilePhoneVerificationSheet({
          displayProfilePhoneVerificationSheet: true,
          currentPhone: getUnmaskedMobileNumber(`1${form.getFieldValue('phoneNumber')}`),
          transactionId: generateCodeAPIResult?.data?.transactionId,
        })
      );
    }
  }, [generateCodeAPIResult]);

  return (
    <Form
      onFinish={onFinish}
      form={form}
      requiredMark={false}
      layout="vertical"
      autoComplete="off"
      initialValues={{ phoneNumber: getFormattedMobileNumber(getLastNNumbers(userProfileData?.primaryPhone || '', 10)) }}
    >
      <CustomCard padding="0" marginTop={0}>
        <Title fontWeight="SB" size="S" color="charcoal" marginBottom={10} font="Poppins">
          {t('profile.Phone Number')}
        </Title>

        <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginBottom={10}>
          {t('profile.WeSendYouVerificationCodeToVerifyYourPhoneNumber')}
        </BodyText>

        <Form.Item
          label={<CustomRequiredLabel translation="profile." label="Please enter your Phone Number" marginBottom={15} marginTop={20} />}
          name="phoneNumber"
          validateTrigger={['onBlur', 'onChange']}
          rules={[getRequiredRule('profile.Please enter your Phone Number'), getPhoneValidator('inviteEarn.PleaseInputCompleteMobileNumber')]}
        >
          <MaskedInput mask={PHONE_MASK} maskOptions={PHONE_MASK_OPTIONS} placeholder="Enter your mobile number" onChange={handleFormChange} inputMode="tel" />
        </Form.Item>
      </CustomCard>

      <Form.Item>
        <CustomButton preset="primary" size="middleStretch" type="submit" marginTop={25} disabled={isDisabled}>
          {t('profile.Save Changes')}
        </CustomButton>
      </Form.Item>
    </Form>
  );
};
