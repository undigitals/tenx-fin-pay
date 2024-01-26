import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { useConsents } from 'utils/hooks/useConsents';
import { useToggle } from 'utils/hooks/useToggle';
import { shortenLinks } from 'utils/helpers/urlString/urlString';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { IConsentData } from 'store/user/consents/consents.types';
import { SendViaEmailSheet } from './SendViaEmailSheet';
import { SCustomSheet } from './Consent.styles';

interface IConsentSheetProps {
  consentData: IConsentData;
  flowName?: string;
  isOpen: boolean;
  isReadonly?: boolean;
  onClose: () => void;
  onAccepted?: () => void;
}

export const ConsentSheet: React.FC<IConsentSheetProps> = ({ consentData, flowName, isOpen, onClose, onAccepted, isReadonly = false }) => {
  const { acceptConsent, acceptConsentResult } = useConsents();
  const { t } = useTranslation();

  const sendToEmailSheet = useToggle();
  const consentCheck = useToggle();
  const isAcceptBtnDisabled = (consentData?.acceptCheckBoxText && !consentCheck.isActive) || acceptConsentResult?.isLoading;
  const shouldShowFooter = !isReadonly && isOpen;

  const SheetSendEmail = (
    <BodyText
      display="inline-flex"
      textType="bodyText"
      fontWeight="R"
      size="T"
      font="DM Sans"
      color="charcoal"
      marginTop={25}
      onClick={sendToEmailSheet.show}
      icon={<Icon name="sendByEmail" color="blue" />}
      cursorPointer
    >
      {t('cashAccount.Send statement by email')}
    </BodyText>
  );

  const handleAcceptBtn = () => {
    if (!consentData || !flowName) {
      return;
    }
    acceptConsent?.(consentData.id, flowName);
  };

  const SheetFooter = shouldShowFooter && (
    <div className="consent-sheet-footer">
      {consentData?.acceptCheckBoxText && (
        <Checkbox id={`eConsent-checkbox-${consentData.id}`} checked={consentCheck.isActive} onChange={() => consentCheck.toggle()} disabled={consentData?.accepted}>
          {consentData?.acceptCheckBoxText}
        </Checkbox>
      )}
      {consentData?.acceptButtonText && (
        <CustomButton size="large" disabled={isAcceptBtnDisabled} onClick={handleAcceptBtn} marginTop={24} marginBottom={40}>
          {consentData?.acceptButtonText}
        </CustomButton>
      )}
    </div>
  );

  useEffect(() => {
    consentCheck.toggle(consentData?.accepted);
  }, [consentData?.accepted]);

  useEffect(() => {
    if (acceptConsentResult.isSuccess) {
      onClose();
      consentCheck.toggle(consentData?.accepted);
      onAccepted?.();
    }
  }, [acceptConsentResult]);

  return (
    <>
      <SCustomSheet
        height="90%"
        title={consentData?.name}
        isOpen={isOpen}
        onClose={onClose}
        subtitle={consentData?.subTitle || ''}
        footer={SheetFooter}
        titleExtra={SheetSendEmail}
        className="consent-sheet"
      >
        <div dangerouslySetInnerHTML={{ __html: isOpen ? shortenLinks(consentData?.text, 35) : '' }} />
      </SCustomSheet>
      <SendViaEmailSheet isOpen={sendToEmailSheet.isActive} onClose={sendToEmailSheet.hide} consentId={consentData?.id} consentTitle={consentData?.name} />
    </>
  );
};
