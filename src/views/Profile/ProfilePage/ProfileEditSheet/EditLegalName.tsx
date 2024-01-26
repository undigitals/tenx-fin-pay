import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { mobileApiCall } from 'services/mobileService';
import { useEditUserProfileDataMutation, useGetUserProfileDataMutation } from 'store/user/users.api';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Form } from 'antd';
import { BodyText, Title } from 'components/general/Typography';
import { getRequiredRule } from 'utils/helpers/validationRules';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useFormHelpers } from 'utils/hooks/useFormHelpers';
import { BaseInput } from 'components/general/BaseInput/BaseInput';

interface IFormValues {
  firstName: string;
  lastName: string;
}

interface IProps {
  closeSheet?: () => void | null;
}

export const EditLegalName = ({ closeSheet }: IProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { hasErrors, checkErrors } = useFormHelpers(form);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const handleFormChange = (): void =>
    setIsDisabled(
      hasErrors ||
        form.getFieldValue('firstName')?.length === 0 ||
        form.getFieldValue('firstName')?.length === undefined ||
        form.getFieldValue('lastName')?.length === 0 ||
        form.getFieldValue('lastName')?.length === undefined
    );

  const userProfileData = useSelector(selectCurrentUser);

  const [editUserProfileData] = useEditUserProfileDataMutation();
  const [getUserProfileData] = useGetUserProfileDataMutation();

  useEffect(() => {
    getUserProfileData({});
  }, []);

  const onFinish = (formValues: IFormValues) => {
    const data = {
      profileData: {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
      },
    };

    editUserProfileData(data)
      .then(() => {
        getUserProfileData({});
      })
      .then(() => mobileApiCall('legalNameChange', `${data.profileData.firstName} ${data.profileData.lastName}`))
      .then(() => {
        closeSheet?.();
      });
  };

  return (
    <Form
      onFinish={onFinish}
      onFieldsChange={checkErrors}
      form={form}
      requiredMark={false}
      layout="vertical"
      autoComplete="off"
      initialValues={{ firstName: userProfileData?.firstName, lastName: userProfileData?.lastName }}
    >
      <CustomCard padding="0" marginTop={0}>
        <Title color="charcoal" fontWeight="SB" size="S" marginBottom={25} font="Poppins">
          {t(`profile.Legal Name`)}
        </Title>

        <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" font="DM Sans" marginBottom={30}>
          {t(`profile.Please enter your legal name`)}
        </BodyText>

        <Form.Item
          label={<CustomRequiredLabel translation="profile." label="First Name" />}
          name="firstName"
          validateTrigger={['onBlur', 'onChange']}
          rules={[getRequiredRule('profile.Please input your legal first name')]}
        >
          <BaseInput onKeyUp={handleFormChange} placeholder={t('profile.Enter Your Legal First Name')} data-testid="legalFirstName" />
        </Form.Item>

        <Form.Item
          label={<CustomRequiredLabel translation="profile." label="Last Name" />}
          name="lastName"
          validateTrigger={['onBlur', 'onChange']}
          rules={[getRequiredRule('profile.Please input your legal last name')]}
        >
          <BaseInput onKeyUp={handleFormChange} placeholder={t('profile.Enter Your Legal Last Name')} data-testid="legalLastName" />
        </Form.Item>

        <Form.Item>
          <CustomButton preset="primary" size="middleStretch" type="submit" marginTop={25} disabled={isDisabled}>
            {t(`profile.Save Changes`)}
          </CustomButton>
        </Form.Item>
      </CustomCard>
    </Form>
  );
};
