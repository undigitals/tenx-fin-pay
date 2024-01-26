import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConsents } from 'utils/hooks/useConsents';
import { Title, BodyText } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Loader } from 'components/general/Loader/Loader';
import { ConsentType } from 'components/general/Consent/Consents.types';
import { DisclosureItem } from './DisclosureItem';
import { SDisclosureContainer } from './DisclosuresPage.styles';

export const DisclosuresPage: React.FC = () => {
  const tenxConsents = useConsents(ConsentType.PERCAPITA);
  const ingoConsents = useConsents(ConsentType.INGO);
  const otherConsents = useConsents(ConsentType.OTHERS);
  const isLoading = tenxConsents.getConsentByFlowNameResult.isLoading || ingoConsents.getConsentByFlowNameResult.isLoading || otherConsents.getConsentByFlowNameResult.isLoading;

  const { t } = useTranslation();

  return (
    <CustomRow alignItems="start" flexDirection="column" marginTop={6} paddingLeft={5} paddingRight={5}>
      {isLoading && <Loader />}
      <Title size="S" color="charcoal" fontWeight="SB" font="Poppins" marginLeft={4}>
        {t(`moveMoney.Disclosures`)}
      </Title>

      <BodyText textType="bodyText" size="M" fontWeight="R" font="DM Sans" color="charcoal60" marginTop={10} marginLeft={4} paddingRight={35} lineHeight={1.5}>
        {t(`moveMoney.You can view account disclosures here.`)}
      </BodyText>

      {!!tenxConsents?.consentsData?.length && (
        <>
          <BodyText textType="bodyText" size="M" color="charcoal" fontWeight="B" font="DM Sans" textAlign="start" marginTop={35}>
            {t(`moveMoney.Tenx Disclosures`)}
          </BodyText>
          <SDisclosureContainer>
            {tenxConsents?.consentsData?.map((data) => (
              <DisclosureItem consentData={data} />
            ))}
          </SDisclosureContainer>
        </>
      )}

      {!!ingoConsents?.consentsData?.length && (
        <>
          <BodyText textType="bodyText" size="M" color="charcoal" fontWeight="B" font="DM Sans" textAlign="start" marginTop={30}>
            {t(`moveMoney.Ingo Disclosures`)}
          </BodyText>

          <SDisclosureContainer>
            {ingoConsents.consentsData.map((data) => (
              <DisclosureItem consentData={data} />
            ))}
          </SDisclosureContainer>
        </>
      )}

      {!!otherConsents?.consentsData?.length && (
        <>
          <BodyText textType="bodyText" size="M" color="charcoal" fontWeight="B" font="DM Sans" textAlign="start" marginTop={30}>
            {t(`moveMoney.Others`)}
          </BodyText>
          <SDisclosureContainer>
            {otherConsents?.consentsData?.map((data) => (
              <DisclosureItem consentData={data} />
            ))}
          </SDisclosureContainer>
        </>
      )}
    </CustomRow>
  );
};
