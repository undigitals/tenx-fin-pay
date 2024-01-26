import React from 'react';
import { IConsentData } from 'store/user/consents/consents.types';
import { useToggle } from 'utils/hooks/useToggle';
import { ConsentSheet } from 'components/general/Consent/ConsentSheet';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText } from 'components/general/Typography';

export interface IDisclosureItem {
  consentData: IConsentData;
  arrowIcon?: string | null;
}

export const DisclosureItem: React.FC<IDisclosureItem> = ({ consentData, arrowIcon = 'chevronRight' }) => {
  const consentSheet = useToggle();

  return (
    <>
      <CustomRow onClick={consentSheet.show} cursorPointer className="disclosure-item">
        <CustomRow justifyContent="flex-start">
          <BodyText textType="bodyText" size="M" color="charcoal70" fontWeight="R" marginLeft={12} cursorPointer lineHeight={1.4} paddingRight={45}>
            {consentData.name}
          </BodyText>
        </CustomRow>
        {arrowIcon && <Icon name={arrowIcon} color="charcoal" size="smallest" cursorPointer />}
      </CustomRow>
      <ConsentSheet consentData={consentData} isOpen={consentSheet.isActive} onClose={consentSheet.hide} isReadonly />
    </>
  );
};
