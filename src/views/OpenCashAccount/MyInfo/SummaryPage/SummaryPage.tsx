import React, { useEffect } from 'react';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { BodyText } from 'components/general/Typography';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dateOfBirthFormatter } from 'utils/helpers/dateOfBirthFormatter';
import { taxFormatter } from 'utils/helpers/taxFormatter';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { ROUTES } from 'vars/const/ROUTES';
import { SPageContainer } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { useTranslation } from 'react-i18next';
import { useKYC } from 'utils/hooks/useKYC';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';
import { implodeString } from 'utils/helpers/stringFormatter';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Loader } from 'components/general/Loader/Loader';
import { DataItem } from './DataItem/DataItem';

export const SummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { primaryPhone: phone, email: currentUserEmail } = useSelector(selectCurrentUser) || {};
  const { validateUser, validateUserStatus, openingAccountData, saveOnboardingData } = useCashAccountOpening();
  const { t } = useTranslation();
  const { pii } = useKYC();

  const {
    firstName,
    suffix,
    middleName,
    lastName,
    dateOfBirth,
    address,
    address2,
    city,
    stateProvince,
    zipCode,
    taxId,
    mailingCity,
    mailingState,
    mailingPostalCode,
    mailingAddress1,
    mailingAddress2,
    isMailingAddressTheSame,
  } = openingAccountData;

  const email = openingAccountData?.email || currentUserEmail;

  const hasAllData = !!(firstName && lastName && dateOfBirth && address && city && stateProvince && zipCode && taxId && email);

  const fullName = `${suffix ? `${suffix} ` : ''}${firstName} ${middleName} ${lastName}`;
  const fullAddress = implodeString([address, address2, city, `${stateProvince} ${zipCode}`]);
  const mailingAddress = implodeString([mailingAddress1, mailingAddress2, mailingCity, `${mailingState} ${mailingPostalCode}`]);
  const taxtIdStr = taxFormatter(taxId);
  const isPii3Attempts = pii.attemptsCount >= 3;

  const formattedDateOfBirthArray = dateOfBirthFormatter(dateOfBirth || '');

  const onSubmit = () => {
    if (hasAllData && pii.attemptsLeft) {
      let paramsForValidate = {
        firstName,
        middleName,
        lastName,
        dayOfBirth: formattedDateOfBirthArray[1],
        monthOfBirth: formattedDateOfBirthArray[0],
        yearOfBirth: formattedDateOfBirthArray[2],
        city,
        state: stateProvince,
        postalCode: zipCode,
        address1: address,
        address2,
        phone,
        email,
        id: taxId,
        // It's SocialService value for any type of tax id
        idType: 'SocialService',
        mailingCity,
        mailingState,
        mailingPostalCode,
        mailingAddress1,
        mailingAddress2,
        isMailingAddressTheSame,
      };
      if (!isMailingAddressTheSame) {
        paramsForValidate = {
          ...paramsForValidate,
          mailingCity,
          mailingState,
          mailingPostalCode,
          mailingAddress1,
          mailingAddress2,
        };
      }
      validateUser?.(paramsForValidate);
    } else {
      saveOnboardingData({ currentUrl: ROUTES.myInfoVeriticationResult.path });
      navigate(ROUTES.myInfoVeriticationResult.path, { state: { verificationStatus: isPii3Attempts && !pii.status ? 'piiFailure' : 'unable' } });
    }
  };

  useEffect(() => {
    if (validateUserStatus?.isSuccess) {
      if (validateUserStatus?.data?.status === 'nomatch') {
        saveOnboardingData({ currentUrl: ROUTES.myInfoVeriticationResult.path });
        navigate(ROUTES.myInfoVeriticationResult.path, { state: { verificationStatus: isPii3Attempts ? 'piiFailure' : 'invalid' } });
      } else {
        saveOnboardingData({ currentUrl: ROUTES.myId.path });
        navigate(ROUTES.myId.path);
      }
    }

    if (validateUserStatus?.isError) {
      saveOnboardingData({ currentUrl: ROUTES.myInfoVeriticationResult.path });

      if (pii.attemptsLeft && isPii3Attempts && !pii.status) {
        navigate(ROUTES.myInfoVeriticationResult.path, { state: { verificationStatus: 'piiFailure' } });
      }
      navigate(ROUTES.myInfoVeriticationResult.path, { state: { verificationStatus: pii.attemptsLeft ? 'unable' : 'invalid' } });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateUserStatus?.isSuccess, validateUserStatus?.isError]);

  return (
    <SPageContainer>
      {validateUserStatus?.isLoading && <Loader />}

      <div>
        <Header title={t('verification.LetsDoubleCheckYourInformation')} stage="Verification" marginBottom={28} />

        <CustomCard marginTop={32} padding="30px">
          <DataItem name="myInfo.Name" value={fullName} editUrl={ROUTES.myInfoName.path} />
          <DataItem name="myInfo.HomeAddress" value={fullAddress || ''} editUrl={ROUTES.myInfoHomeAddress.path} />
          <DataItem name="myInfo.MailingAddress" value={isMailingAddressTheSame ? `${t('myInfo.TheSameAddress')}` : mailingAddress} editUrl={ROUTES.myInfoHomeAddress.path} />
          <DataItem name="myInfo.Email" value={email} editUrl={ROUTES.myInfoEmailUsername.path} />
          <DataItem name="myInfo.DateOfBirth" value={dateOfBirth} editUrl={ROUTES.myInfoAge.path} />
          <DataItem name="myInfo.TaxID" value={taxtIdStr} editUrl={ROUTES.myInfoTaxId.path} />
        </CustomCard>

        <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" textAlign="start" marginTop={24}>
          {t('myInfo.ItMayTakeAFewMinutes')}
        </BodyText>
      </div>

      <CustomRow flexDirection="column" paddingTop={48}>
        <CustomButton size="large" preset="primary" type="submit" onClick={onSubmit} marginBottom={24}>
          {t('myInfo.Continue')}
        </CustomButton>

        <BodyText textType="bodyText" fontWeight="M" size="T" color="charcoal70" textAlign="end" marginBottom={16} className="next-step" extraStyles={{ alignSelf: 'flex-end' }}>
          {t('accountOpening.NextStep')} {t('myId.Document Verification')}
        </BodyText>
      </CustomRow>
    </SPageContainer>
  );
};
