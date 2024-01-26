import React, { useEffect, useMemo, useState } from 'react';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { SPageContainer } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { useTranslation } from 'react-i18next';
import { BodyText } from 'components/general/Typography';
import { Consent } from 'components/general/Consent/Consent';
import { ConsentId, ConsentType } from 'components/general/Consent/Consents.types';
import { useConsents } from 'utils/hooks/useConsents';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';
import { useNavigate } from 'react-router-dom';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';

export const Disclosures: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { saveOnboardingData } = useCashAccountOpening();
  const { consentsData } = useConsents(ConsentType.ACCOUNT_OPENING);
  const DepositAccountAgreementData = consentsData?.find((c) => c.id === ConsentId.DEPOSIT_ACCOUNT_AGREEMENT);

  const { consentsData: accountDetailsData } = useConsents(ConsentType.ACCOUNT_OPENING_DETAILS);
  const EsignConsentData = useMemo(() => accountDetailsData?.find((c) => c.id === ConsentId.ESIGN_CONSENT), [accountDetailsData]);
  const TenxTermsOfUseData = useMemo(() => accountDetailsData?.find((c) => c.id === ConsentId.PERCAPITA_TERMS_OF_USE), [accountDetailsData]);
  const TenxPrivacyPolicyData = useMemo(() => accountDetailsData?.find((c) => c.id === ConsentId.PERCAPITA_PRIVACY_POLICY), [accountDetailsData]);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    saveOnboardingData({ currentUrl: ROUTES.myInfoDisclosures.path });
  }, []);

  useEffect(() => {
    setIsDisabled(!EsignConsentData?.accepted || !DepositAccountAgreementData?.accepted);
  }, [EsignConsentData?.accepted, DepositAccountAgreementData?.accepted]);

  return (
    <SPageContainer>
      <div>
        <Header title={t('myInfo.Disclosures')} stage="eConsent" marginTop={7} />
        <BodyText textType="bodyText" size="N" color="charcoal50" fontWeight="R" textAlign="start" paddingTop={20}>
          {t('cashAccount.ReviewAgreeDisclosure')}
        </BodyText>

        {DepositAccountAgreementData && <Consent consentData={DepositAccountAgreementData} flowName={ConsentType.ACCOUNT_OPENING} />}
        {EsignConsentData && <Consent consentData={EsignConsentData} flowName={ConsentType.ACCOUNT_OPENING_DETAILS} />}

        <div className="eConsentDisclosures">
          {TenxTermsOfUseData && <Consent consentData={TenxTermsOfUseData} flowName={ConsentType.ACCOUNT_OPENING_DETAILS} isLink isReadonly />}
          {TenxPrivacyPolicyData && <Consent consentData={TenxPrivacyPolicyData} flowName={ConsentType.ACCOUNT_OPENING_DETAILS} isLink isReadonly />}
        </div>

        <BodyText textType="bodyText" size="N" color="charcoal50" fontWeight="R" textAlign="start" marginTop={10} marginBottom={10}>
          {t('cashAccount.DisclosureAvailable')}
        </BodyText>
      </div>

      <CustomRow flexDirection="column">
        <CustomButton size="large" preset={isDisabled ? '' : 'primary'} disabled={isDisabled} marginBottom={16} onClick={() => navigate(ROUTES.myInfoName.path)}>
          {t('myInfo.Continue')}
        </CustomButton>
        <BodyText textType="bodyText" fontWeight="M" size="T" color="charcoal70" textAlign="end" marginBottom={16} className="next-step" extraStyles={{ alignSelf: 'flex-end' }}>
          {t('accountOpening.NextStep')} {t('stepper.Name')}
        </BodyText>
      </CustomRow>
    </SPageContainer>
  );
};
