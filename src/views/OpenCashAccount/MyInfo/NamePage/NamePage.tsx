import React, { useState } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { useEditUserProfileDataMutation, useLazyGetCurrentUserQuery } from 'store/user/users.api';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { BodyText } from 'components/general/Typography';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { filterEmptyStrings } from 'utils/helpers/object';
import { SPageContainer } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { INameForm, IMyInfoEditFromVerify } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';
import { Loader } from 'components/general/Loader/Loader';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { NameForm } from './NameForm/NameForm';
import { EditNamePage } from './EditNamePage/EditNamePage';

export const NamePage = () => {
  const navigate = useNavigate();
  const location = useLocation() as IMyInfoEditFromVerify;
  const isEditing = location?.state?.isEditing;
  const [editUserProfileData, editUserProfileDataResult] = useEditUserProfileDataMutation();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();
  const { saveOnboardingData, openingAccountData, getOnboardingDataIsLoading } = useCashAccountOpening();
  const [form] = Form.useForm();
  const [isContinueActive, setIsContinueActive] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = async (values: INameForm) => {
    const nextUrl = isEditing ? ROUTES.myInfoSummary.path : ROUTES.myInfoHomeAddress.path;
    await editUserProfileData({ profileData: filterEmptyStrings(values) }).unwrap();
    saveOnboardingData?.({ ...values, currentUrl: nextUrl });
    getCurrentUser();
    navigate(nextUrl);
  };

  if (isEditing) {
    return <EditNamePage handleSubmit={handleSubmit} />;
  }

  return (
    <SPageContainer>
      {(getOnboardingDataIsLoading || editUserProfileDataResult.isLoading) && <Loader />}
      <div>
        <Header title={t('myInfo.WhatsYourName')} stage="Name" marginTop={6} />

        {isEditing && (
          <BodyText textType="bodyText" fontWeight="R" color="charcoal70" size="N" marginTop={4}>
            {t('myInfo.ChangeYourNameHere')}
          </BodyText>
        )}

        {getOnboardingDataIsLoading ? (
          <Loader />
        ) : (
          <CustomCard marginBottom={8} marginTop={32} borderRadius={20} padding="32px 24px 20px">
            <NameForm handleSubmit={handleSubmit} form={form} onCompletion={setIsContinueActive} openingAccountData={openingAccountData} />
          </CustomCard>
        )}
      </div>
      <CustomRow flexDirection="column" marginTop={186}>
        <CustomButton size="large" preset={!isContinueActive && !isEditing ? '' : 'primary'} disabled={!isContinueActive} onClick={form.submit} marginBottom={16}>
          {t(isEditing ? 'myInfo.SaveChanges' : 'myInfo.Continue')}
        </CustomButton>

        <BodyText textType="bodyText" fontWeight="M" size="T" color="charcoal70" textAlign="end" className="next-step" extraStyles={{ alignSelf: 'flex-end' }}>
          {t('accountOpening.NextStep')} {t('stepper.Address')}
        </BodyText>

        <BodyText textType="helperText" fontWeight="R" color="charcoal50" textAlign="start" size="N" marginTop={24} lineHeight={1.3} paddingRight={10} paddingLeft={10}>
          {t('myInfo.IMPORTANT INFORMATION ABOUT PROCEDURES FOR OPENING A NEW ACCOUNT')}
        </BodyText>
      </CustomRow>
    </SPageContainer>
  );
};
