import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText } from 'components/general/Typography';
import { DigitalCodeInput } from 'components/general/DigitalCodeInput/DigitalCodeInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'vars/const/ROUTES';
import { selectAccountOpeningData } from 'store/user/properties/accountOpeningData.slice';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { getRequiredRule } from 'utils/helpers/validationRules';
import { useSelector } from 'react-redux';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { selectIsEmailVerifiedOrAbsent, selectUserEmail } from 'store/user/authentication.slice';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';
import { SPage } from './TaxPage.styles';

export const TaxPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { taxId } = useSelector(selectAccountOpeningData);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { saveOnboardingData } = useCashAccountOpening();
  const email = useSelector(selectUserEmail);
  const isEmailVerifiedOrAbsent = useSelector(selectIsEmailVerifiedOrAbsent);
  const isEmailVerified = isEmailVerifiedOrAbsent && email;
  const isEditing = location?.state?.isEditing;

  const [form] = Form.useForm();
  const { t } = useTranslation();

  const checkIsValid = () => {
    const activeItemErrors = form.getFieldError('taxId');
    const itemVal = form.getFieldValue('taxId');
    setIsSubmitDisabled(Boolean(itemVal.length < 9 || activeItemErrors.length));
  };

  const handleSubmit = (values: { taxId: string }) => {
    saveOnboardingData?.({ taxId: values.taxId });
    navigate(isEmailVerified || isEditing ? ROUTES.myInfoSummary.path : ROUTES.myInfoEmailUsername.path);
  };

  useEffect(() => {
    checkIsValid();
  }, [taxId]);

  return (
    <SPage>
      <Header title={t('accountOpening.WhatsYourTaxId')} stage="Tax ID" />
      <div>
        <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginBottom={32} paddingRight={10}>
          {t('accountOpening.TaxDescription')}
        </BodyText>
        <Form form={form} name="codeForm" onFieldsChange={checkIsValid} onFinish={handleSubmit} initialValues={{ taxId }}>
          <CustomCard borderRadius={20}>
            <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal" marginTop={10} marginBottom={10}>
              {t('stepper.Tax ID')}
            </BodyText>
            <Form.Item
              name="taxId"
              initialValue=""
              validateTrigger={['onChange']}
              shouldUpdate
              rules={[getRequiredRule(t('myInfo.EnterYourTaxID')), { type: 'string', min: 9, message: t('myInfo.Please input complete code') }]}
            >
              <DigitalCodeInput name="taxId" separatorsAfter={[2, 4]} size={9} borderRadius="20px" isWrapped />
            </Form.Item>
          </CustomCard>
        </Form>
      </div>

      <div className="footer">
        <CustomButton size="large" disabled={isSubmitDisabled} onClick={form.submit} preset="primary-with-outline" marginBottom={16}>
          {t('myInfo.Continue')}
        </CustomButton>

        <BodyText textType="bodyText" fontWeight="M" size="T" color="charcoal70" textAlign="end" marginBottom={24} className="next-step" extraStyles={{ alignSelf: 'flex-end' }}>
          {t('accountOpening.NextStep')} {t('accountOpening.Details')}
        </BodyText>
        <BodyText textType="bodyText" fontWeight="B" size="T" color="charcoal70" lineHeight="16px">
          {t('myInfo.OurPriority')}
        </BodyText>
        <BodyText textType="bodyText" fontWeight="R" size="T" color="charcoal70" lineHeight="16px">
          {t('myInfo.OurSecurityMeasures')}
        </BodyText>
      </div>
    </SPage>
  );
};
