import React from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { IVerifySmsCodeForm, FormInputProps } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { getRequiredRule } from 'utils/helpers/validationRules';
import { BodyText } from 'components/general/Typography';
import { DigitalCodeInput } from 'components/general/DigitalCodeInput/DigitalCodeInput';

export const SmsForm: React.FC<FormInputProps<IVerifySmsCodeForm>> = ({ handleSubmit, onCompletion, form }) => {
  const onFieldsChange = () => {
    const hasErrors = form.isFieldsTouched() && form.getFieldsError().some(({ errors }) => errors.length);
    onCompletion(hasErrors);
  };
  const { t } = useTranslation();

  return (
    <Form onFieldsChange={onFieldsChange} onFinish={handleSubmit} autoComplete="off" layout="vertical" requiredMark={false} form={form}>
      <BodyText textType="bodyText" marginBottom={24} textAlign="center" color="charcoal" fontWeight="R" size="N">
        {t('myInfo.Enter the verification code')}
      </BodyText>
      <Form.Item
        name="emailCode"
        initialValue=""
        validateTrigger={['onBlur', 'onChange']}
        validateFirst
        rules={[getRequiredRule('myInfo.Please input your sms code'), { type: 'string', min: 5, message: t('myInfo.Please input complete code') }]}
      >
        <DigitalCodeInput name="emailCode" size={5} borderRadius="20px" />
      </Form.Item>
    </Form>
  );
};
