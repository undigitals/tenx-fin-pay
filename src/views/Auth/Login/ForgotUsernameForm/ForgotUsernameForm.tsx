import React, { useMemo, useState } from 'react';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { Rule } from 'antd/lib/form';
import { MaskedInput } from 'components/general/MaskedInput/MaskedInput';
import { useLanguage } from 'utils/hooks/useLanguage';
import { getEmailRulesOptional } from 'utils/helpers/validationRules';
import { TForgotUsernameFormProps } from 'views/Auth/Login/Login.types';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { PHONE_MASK, PHONE_MASK_OPTIONS } from 'views/Invite/InviteAndEarnPage/InviteAndEarnForm/inviteMasks';
import { SFormWrapper } from './ForgotUsernameForm.styles';

type TFormData = {
  username: string;
  phone: string;
  email: string;
};

const usernameFormInitial: TFormData = {
  username: '',
  phone: '',
  email: '',
};

export const ForgotUsernameForm: React.FC<TForgotUsernameFormProps> = ({ onFinish }) => {
  const { t } = useTranslation();
  const [usernameForm] = useForm();
  const { language } = useLanguage();
  const { isDesktopSize } = useDeviceDimension();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleValidateFields: Rule = useMemo(
    () =>
      ({ getFieldsValue }) => ({
        validator: async () => {
          const { email, phone } = getFieldsValue();

          if (!email && !phone) {
            throw new Error(t('loginScreen.FillInOneOfTheFields'));
          }
        },
      }),
    [language]
  );

  const onValuesChange = async () => {
    usernameForm.validateFields(['email', 'phone']).catch((err) => setIsButtonDisabled(err.errorFields.length));
  };

  return (
    <SFormWrapper>
      <Form name="forgotUsernameForm" form={usernameForm} initialValues={usernameFormInitial} onValuesChange={onValuesChange} onFinish={onFinish}>
        <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal" font="DM Sans" lineHeight={1.5} marginBottom={10}>
          {t('loginScreen.MobileNumber')}
        </BodyText>

        <Form.Item
          className="enter-mobile-number"
          name="phone"
          validateTrigger={['onBlur', 'onChange']}
          rules={[
            handleValidateFields,
            {
              type: 'string',
              pattern: /.{10}/,
              message: t('loginScreen.PleaseInputCompleteMobileNumber'),
            },
          ]}
        >
          <MaskedInput mask={PHONE_MASK} maskOptions={PHONE_MASK_OPTIONS} placeholder={t('loginScreen.EnterYourMobileNumber')} inputMode="tel" />
        </Form.Item>

        <div className="separate-wrapper">
          <hr className="separator" />
          <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5} marginLeft={10} marginRight={10}>
            {t('loginScreen.or')}
          </BodyText>
          <hr className="separator" />
        </div>

        <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal" font="DM Sans" lineHeight={1.5} marginBottom={10}>
          {t('loginScreen.EmailAddress')}
        </BodyText>

        <Form.Item name="email" validateTrigger={['onBlur', 'onChange']} rules={[handleValidateFields, getEmailRulesOptional()]} style={{ marginBottom: 28 }}>
          <BaseInput placeholder={t('loginScreen.EnterYourEmailAddress')} />
        </Form.Item>

        <div className="forgot-username-button-wrapper">
          <Form.Item style={{ marginBottom: isDesktopSize ? 0 : 32 }}>
            <CustomButton preset="primary" type="submit" size="middleStretch" disabled={isButtonDisabled}>
              {t('loginScreen.Confirm')}
            </CustomButton>
          </Form.Item>
        </div>
      </Form>
    </SFormWrapper>
  );
};
