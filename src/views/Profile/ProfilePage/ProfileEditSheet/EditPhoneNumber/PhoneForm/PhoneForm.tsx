import React, { useState } from 'react';
import { Form } from 'antd';
import { SWrapper } from './PhoneForm.styles';
import { PhoneInput } from './PhoneInput';
import { IPhoneFormProps, IPhoneFormValues } from './PhoneForm.types';

export const PhoneForm: React.FC<IPhoneFormProps> = ({ handleCompletion, onCompletion, checkError, generateError, size, separatorsAfter = [], defaultValue }) => {
  const [form] = Form.useForm();
  const currentError = checkError || generateError;
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    const phoneNumber = values[`list-phoneNumber`].join('');
    const isCompleted = phoneNumber.length === size;
    const hasErrors = !isCompleted || form.getFieldsError().some(({ errors }) => errors.length);
    if (!hasErrors && isCompleted) {
      onCompletion?.(false);
      handleCompletion(phoneNumber);
      setIsSuccess(true);
    } else {
      onCompletion?.(true);
      setIsSuccess(false);
    }
  };

  const onFinish = (values: IPhoneFormValues) => {
    handleCompletion(values.phoneNumber?.join(''));
  };

  return (
    <Form autoComplete="off" form={form} requiredMark={false} onFieldsChange={handleFormChange} onFinish={onFinish}>
      <SWrapper>
        <PhoneInput name="phoneNumber" isCompleted={isSuccess} hasSubmitError={Boolean(currentError)} size={size} separatorsAfter={separatorsAfter} value={defaultValue} />
      </SWrapper>
    </Form>
  );
};
