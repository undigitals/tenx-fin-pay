import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { INameForm, FormInputProps } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';
import { getRequiredRule, noSideWhitespacesRule } from 'utils/helpers/validationRules';
import { BaseInput } from 'components/general/BaseInput/BaseInput';

export const NameForm: React.FC<FormInputProps<INameForm>> = ({ onCompletion, handleSubmit, form, openingAccountData, isEditMode }) => {
  const userData = useSelector(selectCurrentUser);
  const { t } = useTranslation();

  const onFieldsChange = () => {
    const hasErrors =
      (form.isFieldsTouched(true) && form.getFieldsError().some(({ errors }): number => errors.length)) || !form.getFieldValue('firstName')?.length || !form.getFieldValue('lastName')?.length;
    onCompletion(!hasErrors);
  };

  const submitFormData = (values: INameForm) => {
    form
      .validateFields()
      .then(() => {
        onCompletion(true);
      })
      .catch(() => {
        onCompletion(false);
      });

    handleSubmit?.(values);
  };

  useEffect(() => {
    form.setFieldsValue({
      firstName: openingAccountData?.firstName || userData?.firstName || '',
      lastName: openingAccountData?.lastName || userData?.lastName || '',
    });
    onFieldsChange();
  }, [openingAccountData, userData]);

  return (
    <Form onFieldsChange={onFieldsChange} autoComplete="off" onFinish={submitFormData} layout="vertical" requiredMark={false} form={form}>
      <Form.Item
        name="firstName"
        validateTrigger={['onBlur', 'onChange']}
        validateFirst
        label={<CustomRequiredLabel translation="myInfo." label="FirstName" fontFamily={isEditMode ? 'DM Sans' : 'Poppins'} />}
        rules={[getRequiredRule(t('myInfo.Please input your first name')), noSideWhitespacesRule() /* noSpecialCharactersRule() */]}
      >
        <BaseInput placeholder={t('myInfo.Enter Your Legal First Name')} data-testid="firstNameInput" onBeige={isEditMode} />
      </Form.Item>

      <Form.Item
        name="lastName"
        validateTrigger={['onBlur', 'onChange']}
        validateFirst
        label={<CustomRequiredLabel translation="myInfo." label="LastName" fontFamily={isEditMode ? 'DM Sans' : 'Poppins'} />}
        rules={[getRequiredRule(t('myInfo.Please input your last name')), noSideWhitespacesRule() /* noSpecialCharactersRule() */]}
      >
        <BaseInput placeholder={t('myInfo.Enter Your Legal Last Name')} data-testid="lastNameInput" onBeige={isEditMode} />
      </Form.Item>
    </Form>
  );
};
