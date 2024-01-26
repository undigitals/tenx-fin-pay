import React from 'react';
import { Trans } from 'react-i18next';
import { useConsents } from 'utils/hooks/useConsents';
import { useToggle } from 'utils/hooks/useToggle';
import { BodyText } from 'components/general/Typography';
import { ConsentSheet } from 'components/general/Consent/ConsentSheet';
import { ConsentType } from 'components/general/Consent/Consents.types';
import { SLink } from 'views/MoveMoney/NewSourceAndFunds/NewSourceAndFunds.styles';

interface IDisclosureFull {
  isForExternalTransfer?: boolean;
  marginBottom?: number;
  marginTop?: number;
}

export const SuttonDisclaimerNote: React.FC<IDisclosureFull> = ({ isForExternalTransfer, marginBottom, marginTop }) => {
  const { consentsData } = useConsents(ConsentType.SUTTON);
  const disclosureSheet = useToggle();

  return (
    <>
      <BodyText textType="bodyText" color="charcoal70" size="T" fontWeight="R" lineHeight={1.4} paddingRight={5} marginBottom={marginBottom} marginTop={marginTop}>
        {isForExternalTransfer ? (
          <Trans i18nKey="moveMoney.ExternalTransferDisclosureNote" components={{ Link: <SLink onClick={disclosureSheet.show} /> }} />
        ) : (
          <Trans i18nKey="internalTransfer.WhatIsTenx" components={{ Link: <SLink onClick={disclosureSheet.show} /> }} />
        )}
      </BodyText>

      {consentsData?.map((disclosure) => (
        <ConsentSheet key={disclosure.id} consentData={disclosure} isOpen={disclosureSheet.isActive} onClose={disclosureSheet.hide} isReadonly />
      ))}
    </>
  );
};
