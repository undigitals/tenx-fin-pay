import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText, Title } from 'components/general/Typography';
import { Form } from 'antd';
import { Loader } from 'components/general/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { IAgeForm, IMyInfoEditFromVerify } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { SAgeFormWrapper, SButtonWrapper, SPageContainer } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';
import { MyInfoAgeForm } from './MyInfoAgeForm';
import { SPage } from './EditAgePage.styles';

export const EditAgePage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation() as IMyInfoEditFromVerify;
  const isEditing = location?.state?.isEditing;
  const { openingAccountData, saveOnboardingData, getOnboardingDataIsLoading } = useCashAccountOpening();
  const [isContinueActive, setIsContinueActive] = useState(false);

  const handleSubmit = (values: IAgeForm) => {
    const nextUrl = isEditing ? ROUTES.myInfoSummary.path : ROUTES.myInfoTaxId.path;
    saveOnboardingData?.({ ...values, currentUrl: nextUrl });
    navigate(nextUrl);
  };

  useEffect(() => {
    setIsContinueActive?.(Boolean(openingAccountData?.dateOfBirth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openingAccountData]);

  return !isEditing ? (
    <SPage>
      <div>
        <Header title={t('accountOpening.WhenWereYouBorn')} stage="Age" />
        <CustomRow flexDirection="column" alignItems="inherit">
          {getOnboardingDataIsLoading ? (
            <Loader />
          ) : (
            <div className="birth-card">
              <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginBottom={11} marginTop={32}>
                {t('myInfo.DateOfBirth')}
              </BodyText>
              <MyInfoAgeForm onCompletion={setIsContinueActive} handleSubmit={handleSubmit} form={form} />
            </div>
          )}
        </CustomRow>
      </div>

      <div className="footer">
        <CustomButton size="large" disabled={!isContinueActive} onClick={form.submit} preset="primary-with-outline" marginBottom={16}>
          {t('myInfo.Continue')}
        </CustomButton>

        <BodyText textType="bodyText" fontWeight="M" size="T" color="charcoal70" textAlign="end" marginBottom={24} className="next-step" extraStyles={{ alignSelf: 'flex-end' }}>
          {t('accountOpening.NextStep')} {t('accountOpening.TaxID')}
        </BodyText>
        <BodyText textType="bodyText" fontWeight="B" size="T" color="charcoal70" lineHeight="16px">
          {t('myInfo.OurPriority')}
        </BodyText>
        <BodyText textType="bodyText" fontWeight="R" size="T" color="charcoal70" lineHeight="16px">
          {t('myInfo.OurSecurityMeasures')}
        </BodyText>
      </div>
    </SPage>
  ) : (
    <SPageContainer>
      <CustomRow flexDirection="column" alignItems="inherit">
        <CustomRow>
          <Title textAlign="start" size="M" fontWeight="SB" font="Poppins">
            {t('myInfo.DateOfBirth')}
          </Title>
        </CustomRow>
        <BodyText textType="bodyText" fontWeight="R" color="charcoal70" size="N" marginTop={4}>
          {t('myInfo.ChangeYourDateOfBirthHere')}
        </BodyText>
        {getOnboardingDataIsLoading ? (
          <Loader />
        ) : (
          <>
            <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginBottom={11} marginTop={32}>
              {t('myInfo.DateOfBirth')}
            </BodyText>
            <SAgeFormWrapper>
              <MyInfoAgeForm onCompletion={setIsContinueActive} handleSubmit={handleSubmit} form={form} isEditMode />
            </SAgeFormWrapper>
          </>
        )}
      </CustomRow>
      <SButtonWrapper>
        <CustomButton size="large" disabled={!isContinueActive} onClick={form.submit} preset="primary">
          {t('myInfo.SaveChanges')}
        </CustomButton>
      </SButtonWrapper>
    </SPageContainer>
  );
};
