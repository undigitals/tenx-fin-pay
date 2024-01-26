import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { images } from 'assets';
import { useSendToEmailMutation } from 'store/user/consents/consents.api';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText, Title } from 'components/general/Typography';
import { getRequiredRule } from 'utils/helpers/validationRules';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { Loader } from 'components/general/Loader/Loader';
import { SSendViaEmailLayout, SSentSuccessfully, SSuccessTopIcon } from './Consent.styles';

export interface ISendViaEmailSheet {
  isOpen: boolean;
  consentId?: string;
  onClose: () => void;
  consentTitle?: string;
}

export const SendViaEmailSheet: React.FC<ISendViaEmailSheet> = ({ onClose, isOpen, consentId, consentTitle }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled] = useState(true);
  const [sentTo, setSentTo] = useState('');
  const [wasSent, setWasSent] = useState(false);
  const [sendToEmail, { isLoading }] = useSendToEmailMutation();

  const handleFieldsChange = () => {
    const hasErrors = form.isFieldsTouched() && form.getFieldsError().some(({ errors }) => errors.length);
    setIsDisabled(hasErrors);
  };

  const handleClose = () => {
    setSentTo('');
    setWasSent(false);
    onClose();
  };

  const handleSubmit = (values: { email: string }) => {
    if (consentId) {
      sendToEmail({
        email: values.email,
        consentId,
      })
        .unwrap()
        .then(() => {
          setSentTo(values.email);
          setWasSent(true);
        });
    }
  };

  return (
    <CustomSheet isOpen={isOpen} onClose={handleClose} header={false} className="send-consent-by-email-sheet" wrapperPadding={false}>
      {wasSent ? (
        <SSentSuccessfully>
          <SSuccessTopIcon src={images.success} alt="successVerification" />
          <Title marginBottom={16} textAlign="start" fontWeight="M" size="M" font="Poppins">
            {t(`myInfo.Email sent successfully`)}
          </Title>
          <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" textAlign="start" lineHeight={1.4}>
            {t(`myInfo.Electronic Consent has been sent to the following email address`)} <span className="email">{sentTo}</span>
          </BodyText>
          <CustomButton marginTop={32} size="large" preset="primary" onClick={handleClose}>
            {t(`myInfo.Continue`)}
          </CustomButton>
        </SSentSuccessfully>
      ) : (
        <SSendViaEmailLayout>
          <Title textAlign="start" fontWeight="SB" size="S" font="Poppins" lineHeight={1.3} paddingRight={22} marginBottom={10}>
            {t(`myInfo.EnterEmailToGetConsent`, { consentName: consentTitle })}
          </Title>
          <Form onFieldsChange={handleFieldsChange} onFinish={handleSubmit} autoComplete="off" layout="vertical" requiredMark={false} form={form}>
            <Form.Item
              name="email"
              rules={[
                getRequiredRule('myInfo.Please input your email'),

                {
                  type: 'email',
                  message: t('myInfo.This is not a valid email'),
                },
              ]}
            >
              <BaseInput placeholder={t('myInfo.Your email address')} data-testid="eSign-email" inputMode="email" autoCapitalize="off" />
            </Form.Item>
            <CustomButton preset="primary" size="middleStretch" marginBottom={15} disabled={isDisabled}>
              {t(`myInfo.Send email`)}
            </CustomButton>
          </Form>
        </SSendViaEmailLayout>
      )}
      {isLoading && <Loader />}
    </CustomSheet>
  );
};
