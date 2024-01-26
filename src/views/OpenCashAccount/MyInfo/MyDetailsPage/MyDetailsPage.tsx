import React, { useEffect, useState } from 'react';
import { BodyText } from 'components/general/Typography';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { Loader } from 'components/general/Loader/Loader';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { useEditUserProfileDataMutation, useGetUserProfileDataMutation } from 'store/user/users.api';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';
import { SMyDetailsWrapper, SLayout } from './MyDetailsPage.styles';
import { PrimarySource } from './PrimarySource/PrimarySource';
import { EstimatedSource } from './EstimatedSource/EstimatedSource';
import { EmploymentStatus } from './EmploymentStatus/EmploymentStatus';
import { MilitaryStatus } from './MilitaryStatus/MilitaryStatus';
import { TRecord } from './MyDetailsPage.types';

interface TUserDetailsState {
  incomeSource: string;
  annualIncome: string;
  employmentStatus: string;
  militaryStatus: string;
  employerName: string;
}

const EMPLOYER_NAME_RELATION = {
  Student: 'N/A - Student',
  Retired: 'N/A - Retired',
  'Unemployed (currently looking for work)': 'N/A - Unemployed',
  'Unemployed (not currently looking for work)': 'N/A - Unemployed',
};

const initUserDetails = {
  incomeSource: '',
  annualIncome: '',
  employmentStatus: '',
  militaryStatus: '',
  employerName: '',
};

export const MyDetailsPage: React.FC = () => {
  const { saveOnboardingData } = useCashAccountOpening();
  const [userDetails, setUserDetails] = useState<TUserDetailsState>(initUserDetails);
  const { primarySourceOfIncome, annualHouseholdIncome, employmentStatus, militaryStatus, employerName, userId } = useSelector(selectCurrentUser) || {};
  const [editUserProfileData, editUserProfileDataResult] = useEditUserProfileDataMutation();
  const [getUserProfileData] = useGetUserProfileDataMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isDisable = !userDetails.annualIncome || !userDetails.incomeSource || !userDetails.employmentStatus || !userDetails.militaryStatus || !userDetails.employerName;

  const handleOnContinue = async () => {
    const userData = {
      primarySourceOfIncome: userDetails.incomeSource,
      annualHouseholdIncome: userDetails.annualIncome,
      employmentStatus: userDetails.employmentStatus,
      militaryStatus: userDetails.militaryStatus,
      employerName: userDetails.employerName,
    };

    await saveOnboardingData({ ...userData, currentUrl: ROUTES.myInfoSummary.path });
    await editUserProfileData({ profileData: userData });
    if (userId) {
      getUserProfileData({ userId });
    }
    navigate(ROUTES.myInfoSummary.path);
  };

  const handleStatusChange = (event: TRecord) => {
    const newEmployerName = EMPLOYER_NAME_RELATION[event.value as keyof typeof EMPLOYER_NAME_RELATION] || userDetails.employerName;
    setUserDetails({ ...userDetails, employmentStatus: event.value, employerName: newEmployerName });
  };

  useEffect(() => {
    setUserDetails({
      incomeSource: primarySourceOfIncome || '',
      annualIncome: annualHouseholdIncome || '',
      employmentStatus: employmentStatus || '',
      militaryStatus: militaryStatus || '',
      employerName: employerName || '',
    });
  }, []);

  return (
    <SLayout>
      {editUserProfileDataResult.isLoading && <Loader />}
      <Header title={t(`accountOpening.AFewMoreDetails`)} stage="My Details" marginBottom={28} />
      <SMyDetailsWrapper>
        <CustomCard marginBottom={32} background="blue5" borderRadius={16} padding="16px 50px" className="card-header">
          <BodyText textType="bodyText" size="T" fontWeight="B" color="charcoal" textAlign="center">
            {t('accountOpening.YourAnswersWillNotAffect')}
          </BodyText>
        </CustomCard>
        <EmploymentStatus value={userDetails.employmentStatus ? t(`incomeSource.${userDetails.employmentStatus}`) : ''} onChange={handleStatusChange} />

        <div className="primary-employer-name">
          <CustomRequiredLabel label={t('accountOpening.Primary Employer Name')} fontFamily="DM Sans" marginBottom={10} />
          <BaseInput
            value={userDetails.employerName}
            placeholder={t('accountOpening.Enter Your Primary Employer Name')}
            onChange={(e) => setUserDetails({ ...userDetails, employerName: e.target.value })}
          />
        </div>

        <MilitaryStatus value={userDetails.militaryStatus ? t(`incomeSource.${userDetails.militaryStatus}`) : ''} onChange={(data) => setUserDetails({ ...userDetails, militaryStatus: data.value })} />

        <PrimarySource value={userDetails.incomeSource ? t(`incomeSource.${userDetails.incomeSource}`) : ''} onChange={(data) => setUserDetails({ ...userDetails, incomeSource: data.value })} />

        <EstimatedSource value={userDetails.annualIncome ? t(`incomeSource.${userDetails.annualIncome}`) : ''} onChange={(data) => setUserDetails({ ...userDetails, annualIncome: data.name })} />
      </SMyDetailsWrapper>

      <div className="footer">
        <CustomButton disabled={isDisable} onClick={handleOnContinue} preset={!isDisable ? 'primary' : 'primary-red'} marginBottom={24}>
          {t('myInfo.Continue')}
        </CustomButton>

        <BodyText textType="bodyText" fontWeight="M" size="T" color="charcoal70" textAlign="end" className="next-step" marginBottom={16} extraStyles={{ alignSelf: 'flex-end' }}>
          {t('accountOpening.NextStep')} {t('accountOpening.Verification')}
        </BodyText>

        <BodyText textType="bodyText" fontWeight="R" size="T" color="charcoal50" textAlign="start" marginBottom={30}>
          {t('prepPage.TenxGroupInc')}
        </BodyText>
      </div>
    </SLayout>
  );
};
