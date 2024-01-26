import React from 'react';
import { Form } from 'antd';
import { useAppDispatch } from 'utils/hooks/store';
import { useTranslation } from 'react-i18next';
import { setShowChangePasswordModal } from 'store/ui.slice';
import { useChangePasswordMutation } from 'store/user/users.api';
import { BodyText, Title } from 'components/general/Typography';
import { useFormHelpers } from 'utils/hooks/useFormHelpers';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';
import { useFormValidationHelper } from 'views/Auth/ChangePasswordPage/ChangePasswordForm/useFormValidationHelper';
import { getRequiredRule, passwordRules, retypePasswordRules } from 'utils/helpers/validationRules';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { Loader } from 'components/general/Loader/Loader';
import { handleError } from 'utils/helpers/errorHelper';
import { SCurrentPassword } from './ProfileChangePasswordForm.styles';

interface IFormData {
  oldPassword: string;
  newPassword: string;
  retypePassword: string;
}

interface IProps {
  closeSheet?: () => void;
}

export const ProfileChangePasswordPageForm = ({ closeSheet }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [changePasswordAPI, changePasswordAPIResult] = useChangePasswordMutation();
  const [form] = Form.useForm();
  const { hasErrors, checkErrors } = useFormHelpers(form);
  const { isDisabled, passwordErrors, handleFormChange, formValidationHelpStates } = useFormValidationHelper(form, 'oldPassword', 'newPassword', false);

  const onFinish = async (formValues: IFormData) => {
    closeSheet?.();
    changePasswordAPI({
      oldPassword: formValues.oldPassword,
      newPassword: formValues.newPassword,
    })
      .unwrap()
      .then(() => dispatch(setShowChangePasswordModal(true)))
      .catch((error) => handleError(error));
  };

  return (
    <Form onFinish={onFinish} autoComplete="off" layout="vertical" form={form} requiredMark={false} onFieldsChange={checkErrors}>
      <CustomCard marginBottom={24} padding="0" marginTop={5}>
        <Title color="charcoal" fontWeight="SB" size="S" font="Poppins" marginBottom={15}>
          {t('changePassword.ChangePassword')}
        </Title>
        <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" font="DM Sans" marginBottom={32} lineHeight={1.42}>
          {t('changePassword.WantToChangeYourPassword?')}
        </BodyText>

        <SCurrentPassword
          label={<CustomRequiredLabel translation="changePassword." label={t('CurrentPassword')} isDanger />}
          name="oldPassword"
          validateTrigger={['onBlur', 'onChange']}
          help=""
          rules={[...passwordRules, getRequiredRule('changePassword.PleaseInputCurrentPassword')]}
        >
          <BaseInput
            type="password"
            placeholder={t(`changePassword.EnterCurrentPassword`)}
            data-testid="oldPasswordInput"
            onKeyUp={handleFormChange}
            isError={passwordErrors.length > 0 && form.getFieldValue('oldPassword')?.length > 0}
            isSuccess={passwordErrors.length === 0 && form.getFieldValue('oldPassword')?.length > 0}
            passwordIcon
          />
        </SCurrentPassword>

        <Form.Item
          label={<CustomRequiredLabel translation="changePassword." label={t('NewPassword')} isDanger />}
          name="newPassword"
          dependencies={['oldPassword']}
          validateTrigger={['onBlur', 'onChange']}
          rules={retypePasswordRules('oldPassword')}
          help={formValidationHelpStates}
        >
          <BaseInput
            type="password"
            placeholder={t('changePassword.EnterNewPassword')}
            autoComplete="new-password"
            data-testid="newPasswordInput"
            onKeyUp={handleFormChange}
            isError={hasErrors && form.getFieldValue('newPassword')?.length > 0 && isDisabled}
            isSuccess={!hasErrors && form.getFieldValue('newPassword')?.length > 0}
            passwordIcon
          />
        </Form.Item>
      </CustomCard>

      <Form.Item>
        <CustomButton preset="primary" size="middleStretch" letterSpacing={0.5} type="submit" disabled={isDisabled || hasErrors}>
          {t('changePassword.SaveChanges')}
        </CustomButton>
      </Form.Item>
      {changePasswordAPIResult.isLoading && <Loader />}
    </Form>
  );
};
