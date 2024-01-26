import React, { useState } from 'react';
import { Form } from 'antd';
import { Loader } from 'components/general/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText, Title } from 'components/general/Typography';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { SButtonWrapper, SPageContainer } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { INameForm } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { NameForm } from 'views/OpenCashAccount/MyInfo/NamePage/NameForm/NameForm';

interface IEditNamePageProps {
  handleSubmit: (values: INameForm) => void;
}

export const EditNamePage: React.FC<IEditNamePageProps> = ({ handleSubmit }) => {
  const { openingAccountData, getOnboardingDataIsLoading } = useCashAccountOpening();
  const [form] = Form.useForm();
  const [isContinueActive, setIsContinueActive] = useState(false);
  const { t } = useTranslation();

  return (
    <SPageContainer>
      <div>
        <Title textAlign="start" size="M" fontWeight="SB" font="Poppins">
          {t('myInfo.Name')}
        </Title>
        <BodyText textType="bodyText" fontWeight="R" color="charcoal70" size="N" marginTop={4}>
          {t('myInfo.ChangeYourNameHere')}
        </BodyText>
        {getOnboardingDataIsLoading ? <Loader /> : <NameForm handleSubmit={handleSubmit} form={form} onCompletion={setIsContinueActive} openingAccountData={openingAccountData} isEditMode />}
      </div>
      <SButtonWrapper>
        <CustomButton size="large" disabled={!isContinueActive} onClick={form.submit} preset="primary">
          {t('myInfo.SaveChanges')}
        </CustomButton>
      </SButtonWrapper>
    </SPageContainer>
  );
};
