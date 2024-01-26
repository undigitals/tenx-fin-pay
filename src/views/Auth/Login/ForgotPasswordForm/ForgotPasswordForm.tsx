import { Form } from 'antd';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { BodyText } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'antd/es/form/Form';
import { TFormData, TPasswordFinish } from 'views/Auth/Login/Login.types';
import { getRequiredRule } from 'utils/helpers/validationRules';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { SFormWrapper, SButtonWrapper } from './ForgotPasswordForm.styles';

type TFormProps = {
  isOpen: boolean;
  onFinish: TPasswordFinish;
  username?: string;
};

const passwordFormInitial: TFormData = {
  username: '',
};

export const ForgotPasswordForm: React.FC<TFormProps> = ({ isOpen, onFinish, username }) => {
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();
  const [passwordForm] = useForm();
  const [isConfirmBtnDisabled, setConfirmBtnDisabled] = useState(true);

  const onFieldsChange = () => {
    const hasError = passwordForm.getFieldsError().some(({ errors }) => errors?.length);
    const isFormTouched = passwordForm.isFieldsTouched();

    setConfirmBtnDisabled(!isFormTouched || hasError);
  };

  useEffect(() => {
    (async () => {
      if (isOpen) {
        passwordForm.setFieldsValue({ username });
        await passwordForm.validateFields();
      }
    })();
  }, [isOpen]);

  return (
    <SFormWrapper>
      <Form name="forgotPasswordForm" form={passwordForm} initialValues={passwordFormInitial} onFinish={onFinish} onFieldsChange={onFieldsChange} requiredMark={false}>
        <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal" font="DM Sans" lineHeight={1.5} marginBottom={10}>
          {t('registration.Username')}
        </BodyText>

        <Form.Item name="username" validateTrigger={['onBlur', 'onChange']} rules={[getRequiredRule('registration.EnterYourUsername')]}>
          <BaseInput placeholder={t('registration.EnterYourUsername')} />
        </Form.Item>

        <SButtonWrapper>
          <Form.Item style={{ marginBottom: isDesktopSize ? 0 : 32 }}>
            <CustomButton preset="primary" type="submit" size="middleStretch" disabled={isConfirmBtnDisabled}>
              {t('registration.Confirm')}
            </CustomButton>
          </Form.Item>
        </SButtonWrapper>
      </Form>
    </SFormWrapper>
  );
};
