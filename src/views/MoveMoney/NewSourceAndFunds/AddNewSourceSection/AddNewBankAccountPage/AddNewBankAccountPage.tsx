import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useValidateThirdPartyMutation } from 'store/user/accounts/accounts.api';
import { Title, BodyText } from 'components/general/Typography';
import { Form } from 'antd';
import { getRequiredRule } from 'utils/helpers/validationRules';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useToggle } from 'utils/hooks/useToggle';
import { useFormHelpers } from 'utils/hooks/useFormHelpers';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { StateAddressSheet } from 'views/OpenCashAccount/MyInfo/AddressPage/AddressForm/StateAddressDrawer';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { ROUTES } from 'vars/const/ROUTES';
import { Loader } from 'components/general/Loader/Loader';
import { IValidateRequest } from 'store/user/accounts/accounts.types';
import { SuccessFailureModal } from './SuccessFailureModal/SuccessFailureModal';
import { SCustomCard, SIcon } from './AddNewBankAccountPage.style';

interface IAddNewBankAccountPage {
  state?: {
    pathBack: string;
  };
}

export const AddNewBankAccountPage = () => {
  const { t } = useTranslation();
  const location = useLocation() as IAddNewBankAccountPage;
  const stateAddressSheet = useToggle(false);
  const successFailureModal = useToggle(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const [form] = Form.useForm();
  const { hasErrors, checkErrors } = useFormHelpers(form);
  const pathBack = location?.state?.pathBack ?? ROUTES.addMoney.path;

  const [validateThirdPartyMutationAPI, validateThirdPartyMutationAPIResult] = useValidateThirdPartyMutation();

  const handleFormChange = () =>
    setIsDisabledSubmit(
      hasErrors ||
        !form.getFieldValue('bankName') ||
        !form.getFieldValue('bankRoutingNumber') ||
        !form.getFieldValue('bankAccountNumber') ||
        !form.getFieldValue('first') ||
        !form.getFieldValue('last')
    );

  const onFinish = async (formValues: IValidateRequest) => {
    await validateThirdPartyMutationAPI(formValues)
      .unwrap()
      .then(() => setIsSuccess(true))
      .catch(() => setIsSuccess(false));
    successFailureModal.show();
  };

  return (
    <>
      <Title size="S" fontWeight="SB" color="charcoal" marginBottom={20}>
        {t('addNewSource.AddANewBankAccount')}
      </Title>
      <BodyText textType="bodyText" color="charcoal70" fontWeight="R" font="DM Sans" size="M" lineHeight={1.6} marginTop={8} marginBottom={32}>
        {t('addNewSource.AddANewBankAccountDescription')}
      </BodyText>
      <SCustomCard margin="35px 15px 20px" borderRadius={20}>
        <Form onFinish={onFinish} onFieldsChange={checkErrors} form={form} requiredMark={false} layout="vertical" autoComplete="off">
          <SIcon name="bank" color="blue" />

          <Form.Item label={t('addNewSource.BankName')} name="bankName" validateTrigger={['onBlur', 'onChange']} rules={[getRequiredRule('addNewSource.PleaseInputBankName')]}>
            <BaseInput onKeyUp={handleFormChange} data-testid="bank-name" />
          </Form.Item>

          <Form.Item label={t('moveMoney.Routing Number')} name="bankRoutingNumber" validateTrigger={['onBlur', 'onChange']} rules={[getRequiredRule('addNewSource.PleaseInputRoutingNumber')]}>
            <BaseInput onKeyUp={handleFormChange} data-testid="routing-number" inputMode="numeric" />
          </Form.Item>

          <Form.Item label={t('moveMoney.Account Number')} name="bankAccountNumber" validateTrigger={['onBlur', 'onChange']} rules={[getRequiredRule('addNewSource.PleaseInputAccountNumber')]}>
            <BaseInput onKeyUp={handleFormChange} data-testid="account-number" inputMode="numeric" />
          </Form.Item>

          <BodyText textType="bodyText" color="charcoal" fontWeight="R" size="N" marginBottom={8}>
            {t('addNewSource.NameOnAccount')}
          </BodyText>
          <CustomRow gap={10} alignItems="flex-start">
            <Form.Item style={{ width: '40%' }} name="first" validateTrigger={['onBlur', 'onChange']} rules={[getRequiredRule('addNewSource.PleaseInputFirstName')]}>
              <BaseInput onKeyUp={handleFormChange} placeholder={t('profile.FirstNameShort')} data-testid="first-name" />
            </Form.Item>
            <Form.Item style={{ width: '20%' }} name="middle" validateTrigger={['onBlur', 'onChange']}>
              <BaseInput placeholder="M" data-testid="middle" />
            </Form.Item>
            <Form.Item style={{ width: '40%' }} name="last" validateTrigger={['onBlur', 'onChange']} rules={[getRequiredRule('addNewSource.PleaseInputLastName')]}>
              <BaseInput onKeyUp={handleFormChange} placeholder={t('profile.Last Name')} data-testid="last-name" />
            </Form.Item>
          </CustomRow>

          <Form.Item>
            <CustomButton preset="primary" type="submit" disabled={isDisabledSubmit} marginTop={25} marginBottom={25}>
              {t(`myInfo.Submit`)}
            </CustomButton>
          </Form.Item>

          {validateThirdPartyMutationAPIResult.isLoading && <Loader />}
        </Form>
      </SCustomCard>
      <StateAddressSheet open={stateAddressSheet.isActive} onClose={stateAddressSheet.hide} form={form} value="" />
      <SuccessFailureModal isSuccess={isSuccess} navPath={pathBack} open={successFailureModal.isActive} onClose={successFailureModal.hide} />
    </>
  );
};
