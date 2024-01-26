import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { mobileApiCall } from 'services/mobileService';
import { useEditUserProfileDataMutation, useGetUserProfileDataMutation } from 'store/user/users.api';
import { lsSetItem } from 'utils/helpers/storage';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { BodyText, Title } from 'components/general/Typography';
import { Form } from 'antd';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';
import { getRequiredRule } from 'utils/helpers/validationRules';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useFormHelpers } from 'utils/hooks/useFormHelpers';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { Loader } from 'components/general/Loader/Loader';
import { handleError } from 'utils/helpers/errorHelper';

interface IFormValues {
  username: string;
}

interface IProps {
  closeSheet?: () => void;
}

export const EditUsername = ({ closeSheet }: IProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { hasErrors, checkErrors } = useFormHelpers(form);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const handleFormChange = () => setIsDisabled(hasErrors || form.getFieldValue('username')?.length === 0 || form.getFieldValue('username')?.length === undefined);

  const userProfileData = useSelector(selectCurrentUser);

  const [editUserProfileData, editUserProfileDataResult] = useEditUserProfileDataMutation();
  const [getUserProfileData] = useGetUserProfileDataMutation();

  useEffect(() => {
    getUserProfileData({});
  }, []);

  const onFinish = (formValues: IFormValues) => {
    const data = {
      profileData: {
        username: formValues.username,
      },
    };

    closeSheet?.();
    editUserProfileData(data)
      .unwrap()
      .then(() => {
        getUserProfileData({});
      })
      .then(() => mobileApiCall('userNameChange', data.profileData.username))
      .then(() => {
        lsSetItem('savedUserName', formValues.username);
      })
      .catch((error) => handleError(error));
  };

  return (
    <Form onFinish={onFinish} onFieldsChange={checkErrors} form={form} requiredMark={false} layout="vertical" autoComplete="off" initialValues={{ username: userProfileData?.username ?? '' }}>
      <CustomCard padding="0" marginTop={0}>
        <Title fontWeight="SB" size="S" color="charcoal" marginBottom={25} font="Poppins">
          {t(`profile.Username`)}
        </Title>

        <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" font="DM Sans" marginBottom={30}>
          {t('profile.Please enter or modify your username below')}
        </BodyText>

        <Form.Item
          label={<CustomRequiredLabel translation="profile." label="Username" />}
          name="username"
          validateTrigger={['onBlur', 'onChange']}
          rules={[getRequiredRule('profile.Please input your username')]}
        >
          <BaseInput onKeyUp={handleFormChange} placeholder={t('profile.Enter Your Preferred username here')} data-testid="username" />
        </Form.Item>
      </CustomCard>

      <Form.Item>
        <CustomButton preset="primary" size="middleStretch" type="submit" marginTop={25} disabled={isDisabled}>
          {t(`profile.Save Changes`)}
        </CustomButton>
      </Form.Item>
      {editUserProfileDataResult.isLoading && <Loader />}
    </Form>
  );
};
