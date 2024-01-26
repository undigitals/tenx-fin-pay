import React, { useEffect } from 'react';
import { Form } from 'antd';
import { IVerifyEmailForm, IVerifyEmailFormProps } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { getEmailRules } from 'utils/helpers/validationRules';
import { EditableInput } from './EditableField';
import { SFormItem } from './EmailForm.style';

export const MyInfoVerifyEmailForm: React.FC<IVerifyEmailFormProps<IVerifyEmailForm>> = ({ setIsDisabled, isEditMode, initialValues, form, handleSubmit, setIsEmailChanged }) => {
  const onFieldsChange = () => {
    const hasEmailErrors = form.getFieldError('email').length > 0 || form.getFieldValue('email')?.length === 0 || form.getFieldValue('email') === undefined;
    setIsDisabled(hasEmailErrors);
    setIsEmailChanged(initialValues?.email !== form.getFieldValue('email'));
  };

  useEffect(() => {
    onFieldsChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form onFieldsChange={onFieldsChange} validateTrigger={['onSubmit']} onFinish={handleSubmit} autoComplete="off" layout="vertical" requiredMark={false} form={form} initialValues={initialValues}>
      <SFormItem name="email" validateTrigger={['onBlur', 'onChange']} validateFirst shouldUpdate required rules={getEmailRules()}>
        <EditableInput isEditMode={isEditMode} />
      </SFormItem>
    </Form>
  );
};
