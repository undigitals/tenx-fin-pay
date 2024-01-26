import React from 'react';
import { CustomCardArrow } from 'components/theme/CustomCardArrow/CustomCardArrow';
import { useToggle } from 'utils/hooks/useToggle';
// import { Loader } from 'components/general/Loader/Loader';
import { IConsentData } from 'store/user/consents/consents.types';
import { BodyText } from 'components/general/Typography';
import { ConsentSheet } from './ConsentSheet';
import { SConsentWrapper } from './Consent.styles';
import { ConsentType } from './Consents.types';

interface IConsentProps {
  consentData: IConsentData;
  flowName?: ConsentType;
  isLink?: boolean;
  isReadonly?: boolean;
}

export const Consent: React.FC<IConsentProps> = ({ consentData, flowName = '', isLink = false, isReadonly = false }) => {
  const consentSheet = useToggle();

  return (
    <>
      {consentData && !isLink && (
        <SConsentWrapper className="consent-wrapper">
          <CustomCardArrow
            title={consentData?.name}
            icon={consentData?.accepted ? 'circleTick' : 'circleMinus'}
            iconColor={consentData?.accepted ? 'green' : 'charcoal40'}
            arrowColor={consentData?.accepted ? 'green' : 'purple'}
            onClick={consentSheet.show}
            marginTop={0}
            className="consent-bar"
          />
        </SConsentWrapper>
      )}
      {consentData && isLink && (
        <BodyText textType="bodyText" fontWeight="M" color="blue" size="N" font="Poppins" textAlign="center" cursorPointer extraStyles={{ padding: '16px 5px' }} onClick={consentSheet.show}>
          {consentData?.name}
        </BodyText>
      )}
      <ConsentSheet consentData={consentData} flowName={flowName} onClose={consentSheet.hide} isOpen={consentSheet.isActive} isReadonly={isReadonly} />
    </>
  );
};
