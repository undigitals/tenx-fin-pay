import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText, Title } from 'components/general/Typography';
import { IAccountItem, IThirdParty } from 'store/user/accounts/accounts.types';
import { format } from 'date-fns';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { getSlicedAccountId } from 'utils/helpers/accounts/accountsHelper';
import { TransferDataRow } from 'components/general/Modals/FundTransferModal/TransferDataRow/TransferDataRow';
import { IRiskSessionResponse } from 'vars/types/ingo.types';
import { FingerprintAndBehavioralData } from './FingerprintAndBehavioralData/FingerprintAndBehavioralData';

interface IFundConfirmationSheetProps {
  thirdPartyAccount?: IThirdParty;
  tenxAccount?: IAccountItem;
  fingerPrintData?: IRiskSessionResponse;
  isOpen?: boolean;
  onClose?: () => void;
  isSendType?: boolean;
  amountTransferred: number;
  onConfirm?: () => void;
}
export const TransferConfirmationSheet: React.FC<IFundConfirmationSheetProps> = ({ isOpen, thirdPartyAccount, tenxAccount, isSendType, amountTransferred, onClose, fingerPrintData, onConfirm }) => {
  const { t } = useTranslation();
  const dateStr = useMemo(() => format(new Date(), 'MMM dd, yyyy'), [isOpen]);
  const thirdPartyAccountDisplayNumber = thirdPartyAccount?.externalDisplayAccountNumber ? `(${thirdPartyAccount?.externalDisplayAccountNumber})` : thirdPartyAccount?.issuingNetwork;
  const tenxAccountDisplayNumber = getSlicedAccountId(tenxAccount?.fiservAccountId);

  return (
    <CustomSheet isOpen={isOpen} onClose={onClose} header={false} wrapperPadding={false} contentWrapperStyle={{ borderRadius: '24px 24px 0px 0px' }}>
      <CustomRow justifyContent="flex-start" marginBottom={32}>
        <Icon name="arrowLeft" color="charcoal" cursorPointer onClick={onClose} />
        <Title font="Poppins" color="charcoal" marginLeft={15} fontWeight="SB" size="S">
          {t('externalTransfer.ConfirmTransfer')}
        </Title>
      </CustomRow>
      <BodyText textType="bodyText" font="Poppins" justifyContent="start" fontWeight="SB" size="M" color="charcoal">
        {t('moveMoney.ExternalTransferDetails')}
      </BodyText>
      <CustomCard border="2px solid #F5F4F4">
        <TransferDataRow title={t('externalTransfer.AmountTransferred')} value={amountTransferred} isAmount />
        <TransferDataRow
          title={t('externalTransfer.AccountFrom')}
          value={isSendType ? `Tenx ${tenxAccount?.type} Account` : thirdPartyAccount?.externalDisplayAccountName}
          subvalue={isSendType ? tenxAccountDisplayNumber : thirdPartyAccountDisplayNumber}
        />
        <TransferDataRow
          title={t('externalTransfer.AccountTo')}
          value={isSendType ? thirdPartyAccount?.externalDisplayAccountName : `Tenx ${tenxAccount?.type} Account`}
          subvalue={isSendType ? thirdPartyAccountDisplayNumber : tenxAccountDisplayNumber}
        />
        <TransferDataRow title={t('externalTransfer.Date')} value={dateStr} isLast />
      </CustomCard>
      <CustomRow justifyContent="flex-end" marginTop={32} marginBottom={24}>
        <CustomButton onClick={onClose} marginRight={8} size="middleAlt">
          {t('externalTransfer.Cancel')}
        </CustomButton>
        <CustomButton preset="primary" onClick={onConfirm} size="middleAlt">
          {t('externalTransfer.Confirm')}
        </CustomButton>
      </CustomRow>

      {fingerPrintData && <FingerprintAndBehavioralData data={fingerPrintData} />}

      <SuttonDisclaimerNote />
    </CustomSheet>
  );
};
