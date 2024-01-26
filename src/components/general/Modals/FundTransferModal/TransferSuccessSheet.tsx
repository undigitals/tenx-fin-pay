import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'vars/const/ROUTES';
import { format } from 'date-fns';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { IThirdParty, IAccountItem } from 'store/user/accounts/accounts.types';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Title } from 'components/general/Typography';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { images } from 'assets';
import { getSlicedAccountId } from 'utils/helpers/accounts/accountsHelper';
import { TransferDataRow } from './TransferDataRow/TransferDataRow';
import { SImg } from './TransferSuccessSheet.styles';

interface IFundTransferSheetProps {
  thirdPartyAccount?: IThirdParty;
  amountTransferred: number;
  tenxAccount?: IAccountItem;
  isSendType?: boolean;
  isOpen: boolean;
  handleClose: () => void;
}
export const TransferSuccessSheet: React.FC<IFundTransferSheetProps> = ({ isOpen, handleClose, thirdPartyAccount, amountTransferred, tenxAccount, isSendType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const thirdPartyAccountDisplayNumber = thirdPartyAccount?.externalDisplayAccountNumber ? `(${thirdPartyAccount?.externalDisplayAccountNumber})` : thirdPartyAccount?.issuingNetwork;
  const tenxAccountDisplayNumber = getSlicedAccountId(tenxAccount?.fiservAccountId);

  const handleOnContinue = () => {
    handleClose();
    navigate(ROUTES.home.path);
  };

  const dateStr = useMemo(() => format(new Date(), 'MMM dd, yyyy'), [isOpen]);

  return (
    <CustomSheet isOpen={isOpen} onClose={handleClose} header={false} closable={false} wrapperPadding={false} contentWrapperStyle={{ borderRadius: '24px 24px 0px 0px' }}>
      <>
        <CustomRow marginBottom={32} alignItems="center" justifyContent="center">
          <SImg src={images.congratulation} alt="Transfer Success!" />
        </CustomRow>

        <Title justifyContent="start" fontWeight="SB" size="S" marginBottom={37}>
          {t('moveMoney.TransferComplete')}
        </Title>

        <TransferDataRow
          title={t('externalTransfer.From')}
          value={isSendType ? `Tenx ${tenxAccount?.type} Account` : thirdPartyAccount?.externalDisplayAccountName}
          subvalue={isSendType ? tenxAccountDisplayNumber : thirdPartyAccountDisplayNumber}
        />
        <TransferDataRow
          title={t('externalTransfer.To')}
          value={isSendType ? thirdPartyAccount?.externalDisplayAccountName : `Tenx ${tenxAccount?.type} Account`}
          subvalue={isSendType ? thirdPartyAccountDisplayNumber : tenxAccountDisplayNumber}
        />
        <TransferDataRow title={t('externalTransfer.AmountTransferred')} value={amountTransferred} isAmount />
        <TransferDataRow title={t('externalTransfer.Date')} value={dateStr} />
        <TransferDataRow title={t('externalTransfer.FundsAvailability')} value={t('externalTransfer.WithinMins')} />

        <CustomButton preset="primary" onClick={handleOnContinue} marginTop={10} marginBottom={32}>
          {t('externalTransfer.Done')}
        </CustomButton>

        <SuttonDisclaimerNote />
      </>
    </CustomSheet>
  );
};
