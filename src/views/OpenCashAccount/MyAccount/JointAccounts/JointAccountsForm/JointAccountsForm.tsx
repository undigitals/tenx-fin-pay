import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form } from 'antd';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { JointAccountModal } from 'components/general/Modals/JointAccountModal/JointAccountModal';
import { getRequiredRule, getPhoneValidator, getEmailRulesOptional } from 'utils/helpers/validationRules';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';
import { MaskedInput } from 'components/general/MaskedInput/MaskedInput';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'utils/hooks/useToggle';
import { useInviteJointAccountHolderMutation } from 'store/user/accounts/accounts.api';
import { ROUTES } from 'vars/const/ROUTES';
import { IJointAccountsForm } from './JointAccountsForm.types';

const PHONE_MASK = '000-000-0000';

const PHONE_MASK_OPTIONS = {
  lazy: true,
};

export const JointAccountsForm = () => {
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isFromStarterPage = !!location.state?.backPage?.includes(ROUTES.enableThreeGreatFeatures.path);
  const jointAccountModal = useToggle(false);
  const [form] = Form.useForm();
  const [inviteJointAccountHolderAPI] = useInviteJointAccountHolderMutation();

  const isValid = () => {
    const errors = form.getFieldsError().filter((item) => item.errors.length > 0);
    return errors.length === 0;
  };

  const hasEmptyValues = () => {
    const values = Object.values(form.getFieldsValue());
    return values.includes(undefined);
  };

  const onFinish = (formValues: IJointAccountsForm) => {
    inviteJointAccountHolderAPI({ isPrimaryOwner: isFromStarterPage, ...formValues });
    jointAccountModal.show();
  };

  const onFieldsChange = () => {
    setIsActive(isValid() && !hasEmptyValues());
  };

  return (
    <Form onFinish={onFinish} onFieldsChange={onFieldsChange} autoComplete="off" layout="vertical" requiredMark={false} form={form}>
      <JointAccountModal open={jointAccountModal.isActive} onClose={jointAccountModal.hide} isFromStarterPage={isFromStarterPage} />
      <CustomCard borderRadius={16} marginBottom={48} marginTop={3}>
        <Form.Item
          style={{ marginTop: '16px' }}
          label={<CustomRequiredLabel marginLeft={20} translation="accountOpening." label="Joint Accountholder's First Name" />}
          name="firstName"
          validateTrigger={['onBlur', 'onChange']}
          validateFirst
          rules={[getRequiredRule('errors.PleaseInputTheirFirstName')]}
        >
          <BaseInput placeholder={t(`accountOpening.EnterTheirFirstName`)} />
        </Form.Item>

        <Form.Item
          label={<CustomRequiredLabel marginLeft={20} translation="accountOpening." label="Joint Accountholder's Last Name" />}
          name="lastName"
          validateTrigger={['onBlur', 'onChange']}
          validateFirst
          rules={[getRequiredRule('errors.PleaseInputTheirLastName')]}
        >
          <BaseInput placeholder={t(`accountOpening.EnterTheirLastName`)} />
        </Form.Item>

        <Form.Item
          label={<CustomRequiredLabel marginLeft={20} translation="accountOpening." label="Joint Accountholder's Email" />}
          name="email"
          validateTrigger={['onBlur', 'onChange']}
          validateFirst
          rules={[getRequiredRule('errors.PleaseInputTheirEmail'), getEmailRulesOptional()]}
        >
          <BaseInput placeholder={t(`accountOpening.EnterTheirEmail`)} inputMode="email" autoCapitalize="off" />
        </Form.Item>

        <Form.Item
          label={<CustomRequiredLabel marginLeft={20} translation="accountOpening." label="Joint Accountholder's Mobile Number" />}
          name="phone"
          validateTrigger={['onBlur', 'onChange']}
          validateFirst
          rules={[getPhoneValidator('errors.PleaseInputTheirMobileNumber', 11)]}
        >
          <MaskedInput mask={PHONE_MASK} maskOptions={PHONE_MASK_OPTIONS} placeholder={t(`accountOpening.EnterTheirMobileNumber`)} inputMode="tel" />
        </Form.Item>
      </CustomCard>

      <Form.Item>
        <CustomButton type="submit" disabled={!isActive} preset={!isActive ? 'primary-red' : 'primary'}>
          {t('myInfo.Continue')}
        </CustomButton>
      </Form.Item>
    </Form>
  );
};
