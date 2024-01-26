import React from 'react';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText } from 'components/general/Typography';
import { SPageContainer } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { Form } from 'antd';
import { IVerifyEmailForm } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { Loader } from 'components/general/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { IRequestResult } from 'utils/helpers/request';
import { MyInfoVerifyEmailForm } from 'views/OpenCashAccount/MyInfo/EmailPage/EmailForm/EmailForm';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';

interface IEditEmailPageProps {
  getOnboardingDataIsLoading: boolean | undefined;
  setIsSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (values: IVerifyEmailForm) => void;
  isDisabled: boolean | undefined;
  generateCodeEmailStatus: IRequestResult | undefined;
  email: string;
  setIsEmailChanged: (isChanged: boolean) => void;
}
export const EditEmailPage: React.FC<IEditEmailPageProps> = ({ getOnboardingDataIsLoading, setIsSubmitDisabled, handleSubmit, isDisabled, generateCodeEmailStatus, email, setIsEmailChanged }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const initialValues = { email };

  return (
    <SPageContainer>
      <div>
        <Header title={t('myInfo.Email')} marginBottom={4} />
        <BodyText textType="bodyText" color="charcoal60" size="N" fontWeight="R" marginBottom={32} lineHeight={1.5}>
          {t('myInfo.ChangeYourEmailHere')}
        </BodyText>
        {getOnboardingDataIsLoading ? (
          <Loader />
        ) : (
          <MyInfoVerifyEmailForm setIsDisabled={setIsSubmitDisabled} form={form} handleSubmit={handleSubmit} initialValues={initialValues} setIsEmailChanged={setIsEmailChanged} isEditMode />
        )}
        {generateCodeEmailStatus?.isError && (
          <BodyText textType="bodyText" marginTop={30} color="red" size="N" fontWeight="R">
            {generateCodeEmailStatus?.errorMessage}
          </BodyText>
        )}
      </div>
      <CustomButton size="large" disabled={isDisabled} onClick={form.submit} preset="primary">
        {t('myInfo.SaveChanges')}
      </CustomButton>
    </SPageContainer>
  );
};
