/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { setProfileEmailVerificationSheet } from 'store/ui.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { useChangeEmailGenerateCodeMutation, useEditUserProfileDataMutation, useGetUserProfileDataMutation } from 'store/user/users.api';
import { Form } from 'antd';
import { BodyText, Title } from 'components/general/Typography';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';
import { getEmailRules } from 'utils/helpers/validationRules';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useFormHelpers } from 'utils/hooks/useFormHelpers';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { Loader } from 'components/general/Loader/Loader';
import { SError } from './EditEmail.styles';

interface IFormValues {
  email: string;
}

interface IProps {
  closeSheet?: () => void;
}

export const EditEmail = ({ closeSheet }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const userProfileData = useSelector(selectCurrentUser);
  const { hasErrors, checkErrors } = useFormHelpers(form);

  const [editUserProfileData, editUserProfileDataResult] = useEditUserProfileDataMutation();
  const [getUserProfileData] = useGetUserProfileDataMutation();
  const [generateCodeAPI, generateCodeAPIResult] = useChangeEmailGenerateCodeMutation();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [emailUpdateError, setEmailUpdateError] = useState<undefined | string>(undefined);

  const { error }: { error?: any } = editUserProfileDataResult;

  const handleFormChange = () => {
    setIsDisabled(hasErrors || form.getFieldValue('email')?.length === 0 || form.getFieldValue('email')?.length === undefined);
    setEmailUpdateError(undefined);
  };

  const onFinish = (formValues: IFormValues) => {
    generateCodeAPI({ newEmail: formValues.email });
  };

  useEffect(() => {
    getUserProfileData({});
  }, []);

  useEffect(() => {
    setEmailUpdateError(error?.data?.Error);
  }, [error]);

  useEffect(() => {
    if (generateCodeAPIResult?.isSuccess) {
      closeSheet?.();
      dispatch(setProfileEmailVerificationSheet({ displayProfileEmailVerificationSheet: true, currentEmail: form.getFieldValue('email'), transactionId: generateCodeAPIResult?.data?.transactionId }));
    }
  }, [generateCodeAPIResult?.isSuccess]);

  return (
    <Form onFinish={onFinish} onFieldsChange={checkErrors} form={form} requiredMark={false} layout="vertical" autoComplete="off" initialValues={{ email: userProfileData?.email }}>
      <CustomCard padding="0" marginTop={0}>
        <Title color="charcoal" fontWeight="SB" size="S" marginBottom={25} font="Poppins">
          {t(`profile.Email`)}
        </Title>

        <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" font="DM Sans" marginBottom={30}>
          {t(`profile.Please enter your email address`)}
        </BodyText>

        <Form.Item label={<CustomRequiredLabel translation="profile." label="Email" />} name="email" validateTrigger={['onBlur', 'onChange']} rules={getEmailRules()}>
          <BaseInput onKeyUp={handleFormChange} placeholder={t('profile.Enter Your Email Address')} data-testid="email" autoCapitalize="off" inputMode="email" />
        </Form.Item>
        {emailUpdateError && <SError>{emailUpdateError}</SError>}
      </CustomCard>

      {generateCodeAPIResult?.isLoading ? (
        <Loader />
      ) : (
        <Form.Item>
          <CustomButton preset="primary" type="submit" size="middleStretch" marginTop={25} disabled={isDisabled}>
            {t(`profile.Save Changes`)}
          </CustomButton>
        </Form.Item>
      )}
    </Form>
  );
};
