import React, { useState } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { isErrorWithMessage, isFetchBaseQueryError } from 'utils/helpers/rtqErrorHandling';
import { ROUTES } from 'vars/const/ROUTES';
import { abortPasswordReset, selectForgotPasswordData } from 'store/user/forgotPassword/forgotPassword.slice';
import { IChangePasswordFormProps, IChangePasswordFormValues } from 'views/Auth/ChangePasswordPage/ChangePasswordPage.types';
import { useFormHelpers } from 'utils/hooks/useFormHelpers';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';
import { getRequiredRule, passwordRules, retypePasswordRules } from 'utils/helpers/validationRules';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { SFields, SSubmitError } from './ChangePasswordForm.style';
import { useFormValidationHelper } from './useFormValidationHelper';

export const ChangePasswordForm: React.FC<IChangePasswordFormProps> = ({ handleChangePassword, handleOpen, isLoading = true }) => {
  const navigate = useNavigate();
  const { transactionId } = useSelector(selectForgotPasswordData);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const { hasErrors, checkErrors } = useFormHelpers(form);
  const { isDisabled, passwordErrors, handleFormChange, formValidationHelpStates } = useFormValidationHelper(form, 'newPassword', 'retypePassword', false);

  const onFinish = async (values: IChangePasswordFormValues) => {
    if (!transactionId) return;

    try {
      await handleChangePassword({
        fingerprint: 'fingerprint',
        transactionId,
        password: values.newPassword,
      }).unwrap();
      dispatch(abortPasswordReset());
      if (isDesktopSize && handleOpen) {
        handleOpen();
      } else {
        await navigate(ROUTES.success.path);
      }
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errorMessage = 'error' in err ? err.error : JSON.stringify(err.data);
        setError(JSON.parse(errorMessage).Error);
      } else if (isErrorWithMessage(err)) {
        setError(err.message);
      }
    }
  };

  return (
    <Form autoComplete="off" layout="vertical" requiredMark={false} onFinish={onFinish} form={form} onFieldsChange={checkErrors}>
      <SFields>
        <Form.Item
          name="newPassword"
          validateTrigger={['onBlur', 'onChange']}
          label={<CustomRequiredLabel label={t('changePassword.NewPassword')} />}
          help=""
          rules={[...passwordRules, getRequiredRule('PleaseInputPassword')]}
        >
          <BaseInput
            type="password"
            onBeige={!isDesktopSize}
            placeholder="*************"
            data-testid="newPassword"
            onKeyUp={handleFormChange}
            isError={passwordErrors.length > 0 && form.getFieldValue('newPassword')?.length > 0}
            isSuccess={passwordErrors.length === 0 && form.getFieldValue('newPassword')?.length > 0}
            passwordIcon
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '5px' }}
          name="retypePassword"
          label={<CustomRequiredLabel label={t('changePassword.RetypeNewPassword')} />}
          dependencies={['newPassword']}
          validateTrigger={['onBlur', 'onChange']}
          help={formValidationHelpStates}
          rules={retypePasswordRules('newPassword')}
        >
          <BaseInput
            type="password"
            onBeige={!isDesktopSize}
            placeholder="*************"
            data-testid="retypePassword"
            onKeyUp={handleFormChange}
            isError={hasErrors && form.getFieldValue('retypePassword')?.length > 0 && isDisabled}
            isSuccess={!hasErrors && form.getFieldValue('retypePassword')?.length > 0}
            passwordIcon
          />
        </Form.Item>
        {error && (
          <SSubmitError textColor="red" size="big" textAlign="center">
            {error}
          </SSubmitError>
        )}
      </SFields>
      <Form.Item noStyle>
        <CustomButton data-testid="confirmButton" preset="primary" type="submit" marginTop={isDesktopSize ? 30 : 90} marginBottom={10} disabled={isLoading || isDisabled}>
          {t('profile.Confirm')}
        </CustomButton>
      </Form.Item>
    </Form>
  );
};
