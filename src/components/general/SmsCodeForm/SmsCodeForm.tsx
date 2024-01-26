import React, { useState } from 'react';
import { Form } from 'antd';
import { SError, SSmsCodeWrapper } from './SmsCodeForm.styles';
import { SmsCodeInput } from './SmsCodeInput';
import { ISmsFormProps, ISmsFormValues } from './SmsCodeForm.types';

export const SmsCodeForm: React.FC<ISmsFormProps> = ({
  handleCompletion,
  onCompletion,
  checkError,
  generateError,
  inputTheme = 'sms-code',
  size = 5,
  separatorsAfter = [],
  isWrongCode = false,
  placeholder = '',
}) => {
  const [form] = Form.useForm();
  const currentError = checkError || generateError;
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getParsedValues = (value: string) => {
    const valArr = value.split?.('');
    const emptySize = size - valArr.length;
    const codeItems = [...valArr, ...new Array(emptySize).fill(null)];
    form.resetFields();
    form.setFieldsValue({ 'list-smsCode': codeItems });
    return form.getFieldsValue();
  };

  const getValues = () => {
    const values = form.getFieldsValue();
    if (values[`list-smsCode`][0].length > 1) {
      return getParsedValues(values[`list-smsCode`][0]);
    }
    return values;
  };

  const handleFormChange = () => {
    const values = getValues();
    const smsCode = values[`list-smsCode`].join('');
    const isCompleted = smsCode.length === size;
    const hasErrors = !isCompleted || form.getFieldsError().some(({ errors }) => errors.length);
    if (!hasErrors && isCompleted) {
      onCompletion?.(false);
      handleCompletion(smsCode);
      setIsSuccess(true);
    } else {
      onCompletion?.(true);
      setIsSuccess(false);
    }
  };

  const onFinish = (values: ISmsFormValues) => {
    handleCompletion(values.smsCode?.join(''));
  };

  return (
    <Form autoComplete="off" form={form} requiredMark={false} onFieldsChange={handleFormChange} onFinish={onFinish}>
      <SSmsCodeWrapper>
        <SmsCodeInput
          name="smsCode"
          isCompleted={isSuccess}
          isWrongCode={isWrongCode}
          placeholder={placeholder}
          inputTheme={inputTheme}
          hasSubmitError={Boolean(currentError)}
          size={size}
          separatorsAfter={separatorsAfter}
        />
        {currentError && (
          <SError textColor="red" size="big" textAlign="center">
            {currentError}
          </SError>
        )}
      </SSmsCodeWrapper>
    </Form>
  );
};
