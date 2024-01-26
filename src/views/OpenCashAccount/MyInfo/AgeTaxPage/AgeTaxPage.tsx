import React, { useEffect, useState, useMemo } from 'react';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText, Title } from 'components/general/Typography';
import { useNavigate } from 'react-router-dom';
import { Rule } from 'antd/lib/form';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { SPageContainer } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { Form } from 'antd';
import { IAgeTaxForm } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { DigitalCodeInput } from 'components/general/DigitalCodeInput/DigitalCodeInput';
import { Loader } from 'components/general/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { ageDateStringRules, getRequiredRule } from 'utils/helpers/validationRules';
import { formatDate, parseDate } from 'utils/helpers/date';
import { MaskedInput } from 'components/general/MaskedInput/MaskedInput';
import { differenceInYears, intervalToDuration, parse } from 'date-fns';
import { getUnmaskedTax } from 'utils/helpers/taxFormatter';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { SCustomDivider } from './AgeTaxPage.styles';

export const AgeTaxPage = () => {
  const navigate = useNavigate();
  const { openingAccountData, saveOnboardingData, getOnboardingDataIsLoading } = useCashAccountOpening();
  const [isContinueActive, setIsContinueActive] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  // eslint-disable-next-line consistent-return
  const isUnder18 = (dob: string | undefined) => {
    if (dob) {
      const birthDate = parse(dob, 'MM/dd/yyyy', new Date());
      const { years } = intervalToDuration({ start: birthDate, end: new Date() });
      return years && years < 18;
    }
  };

  const handleSubmit = ({ dateOfBirth, taxId }: IAgeTaxForm) => {
    const nextUrl = isUnder18(dateOfBirth) ? ROUTES.myAccountJointAccounts.path : ROUTES.myInfoAdditionalDetails.path;
    saveOnboardingData?.({ dateOfBirth, taxId: getUnmaskedTax(taxId), currentUrl: nextUrl });
    navigate(nextUrl);
  };

  const onFieldsChange = () => {
    const formErrors = !form.getFieldValue('dateOfBirth') || !form.getFieldValue('taxId') || form.getFieldsError().some(({ errors }): number => errors.length);

    setIsContinueActive(!formErrors);
  };

  const ageValidationRules: Rule[] = useMemo(
    () => [
      ...ageDateStringRules(),
      {
        transform: (value: string | Date) => value && (typeof value === 'string' ? parseDate(value) : value),
        validator: async (_, value) => {
          if (value && differenceInYears(new Date(), value) < 16) {
            throw new Error(t('preRegOnboarding.ShouldBe16'));
          }
        },
      },
    ],
    [t]
  );

  useEffect(() => {
    setIsContinueActive?.(Boolean(openingAccountData?.dateOfBirth) && Boolean(openingAccountData?.taxId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openingAccountData]);

  return (
    <SPageContainer>
      <div className="ageTaxPageHeader">
        <Header title={t('myInfo.AgeAndTaxID')} stage="Age & Tax ID" />

        <Title textAlign="start" fontWeight="M" size="S" font="Poppins" color="charcoal" marginTop={18} marginBottom={19}>
          {t('myInfo.EnterInputsBelow')}
        </Title>
        {getOnboardingDataIsLoading ? (
          <Loader />
        ) : (
          <CustomCard borderRadius={20}>
            <Form
              onFieldsChange={onFieldsChange}
              onFinish={handleSubmit}
              autoComplete="off"
              layout="vertical"
              requiredMark={false}
              form={form}
              initialValues={{ dateOfBirth: openingAccountData?.dateOfBirth, taxId: openingAccountData?.taxId }}
            >
              <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginBottom={11} marginTop={10}>
                {t('myInfo.DateOfBirth')}
              </BodyText>
              <Form.Item name="dateOfBirth" validateTrigger={['onBlur', 'onChange']} validateFirst rules={ageValidationRules}>
                <MaskedInput
                  mask={Date}
                  maskOptions={{
                    pattern: 'm/d/Y',
                    parse: parseDate,
                    format: formatDate,
                    lazy: true,
                  }}
                  placeholder={t(`myInfo.DateFormat`)}
                  data-testid="dateOfBirth"
                />
              </Form.Item>

              <BodyText textType="bodyText" color="charcoal50" size="N" fontWeight="R" marginBottom={30} lineHeight={1.4}>
                {t('myInfo.ShouldMatchDateIDAtLeast18ToOpenAccountIf16-17Needs18+GuardianForJoint')}
              </BodyText>

              <SCustomDivider />

              <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginBottom={11} marginTop={30}>
                {t('myInfo.TaxID')}
              </BodyText>
              <Form.Item name="taxId" initialValue="" shouldUpdate rules={[getRequiredRule(t('myInfo.EnterYourTaxID')), { type: 'string', min: 9, message: t('myInfo.Please input complete number') }]}>
                <DigitalCodeInput name="taxId" separatorsAfter={[2, 4]} size={9} borderRadius="20px" isWrapped showCaret />
              </Form.Item>

              <BodyText textType="bodyText" color="charcoal50" size="N" fontWeight="R" marginBottom={22} lineHeight={1.4}>
                {t('myInfo.EnterTaxID')}
              </BodyText>
            </Form>
          </CustomCard>
        )}
      </div>

      <CustomRow flexDirection="column" paddingTop={40}>
        <CustomButton size="large" disabled={!isContinueActive} onClick={form.submit} preset={isContinueActive ? 'primary' : 'primary-red'} marginBottom={24}>
          {t('myInfo.Continue')}
        </CustomButton>

        <BodyText textType="bodyText" fontWeight="M" size="T" color="charcoal70" textAlign="end" marginBottom={16} className="next-step" extraStyles={{ alignSelf: 'flex-end' }}>
          {t('accountOpening.NextStep')} {t('accountOpening.My Details')}
        </BodyText>

        <div className="ageTagPageFooter">
          <BodyText textType="bodyText" fontWeight="B" size="T" color="charcoal70" lineHeight="16px">
            {t('myInfo.OurPriority')}
          </BodyText>
          <BodyText textType="bodyText" fontWeight="R" size="T" color="charcoal70" lineHeight="16px">
            {t('myInfo.OurSecurityMeasures')}
          </BodyText>
        </div>
      </CustomRow>
    </SPageContainer>
  );
};
