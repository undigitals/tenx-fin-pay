import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { BodyText, Title } from 'components/general/Typography';
import { Trans, useTranslation } from 'react-i18next';
import { ConsentId, ConsentType } from 'components/general/Consent/Consents.types';
import { useConsents } from 'utils/hooks/useConsents';
import { ConsentSheet } from 'components/general/Consent/ConsentSheet';
import { useToggle } from 'utils/hooks/useToggle';
import { IConsentData } from 'store/user/consents/consents.types';
import { SLayout } from './FeeScheduleModal.styles';
import { FeeScheduleTableOne } from './FeeScheduleTableOne/FeeScheduleTableOne';
import { FeeScheduleTableTwo } from './FeeScheduleTableTwo/FeeScheduleTableTwo';

type TModalProps = {
  isActive: boolean;
  hide: () => void;
};

export const FeeScheduleModal: React.FC<TModalProps> = ({ isActive, hide }) => {
  const { t } = useTranslation();
  const depAccAgrConsentSheet = useToggle();
  const otherConsents = useConsents(ConsentType.OTHERS);
  const consentData = otherConsents?.consentsData?.find((item) => item?.id === ConsentId.ESIGN_CONSENT) ?? ({} as IConsentData);

  const onDepositAccAgrClick = () => {
    if (consentData?.id) depAccAgrConsentSheet.show();
  };

  return (
    <>
      <CustomModal open={isActive} onClose={hide} topPosition="4%">
        <SLayout>
          <Title fontWeight="SB" size="S" font="Poppins" textAlign="start" color="charcoal" marginBottom={8}>
            {t('starter.benefits.noSurpriseFees.feeScheduleModal.feeSchedule')}
          </Title>

          <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="N" color="charcoal80" marginTop={10} marginBottom={20}>
            {t('starter.benefits.noSurpriseFees.feeScheduleModal.allFeeAmountsSetForthInTable')}
          </BodyText>

          <FeeScheduleTableOne />

          <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="N" color="charcoal80" marginTop={10} marginBottom={20}>
            {t('starter.benefits.noSurpriseFees.feeScheduleModal.theFollowingFeesSetForthInTable')}
          </BodyText>

          <FeeScheduleTableTwo />

          <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="N" color="charcoal80" marginTop={10} marginBottom={20}>
            <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.forFurtherInformation">
              For further information about the Cash Account, please see the
              <a onClick={onDepositAccAgrClick}>Deposit Account Agreement</a>.
            </Trans>
          </BodyText>
        </SLayout>
      </CustomModal>

      <ConsentSheet consentData={consentData} isOpen={depAccAgrConsentSheet.isActive} onClose={depAccAgrConsentSheet.hide} isReadonly />
    </>
  );
};
