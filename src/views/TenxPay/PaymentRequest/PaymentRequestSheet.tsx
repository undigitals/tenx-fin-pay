import React from 'react';
import { format, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Icon } from 'components/general/Icon/Icon';
import { useAppDispatch } from 'utils/hooks/store';
import { setShowTenxPayModal } from 'store/ui.slice';
import { BodyText, Title } from 'components/general/Typography';
import { Loader } from 'components/general/Loader/Loader';
import { ACCOUNT_TYPES } from 'views/TenxPay/constants/accountTypes';
import { useLanguage } from 'utils/hooks/useLanguage';
import { CurrencyFormatters } from 'utils/helpers/CurrencyFormatters';

interface IPaymentRequestSheet {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  checkDate: string;
  accountInfo: any;
  amountToTransfer: string | number;
  fee: string | number;
  amountSelected: string | number;
  estimatedDate: string;
  handleCloseStatusModal: () => void;
  handleRequestPayment: () => void;
  toggleRequestPercPay: () => void;
  isPaymentRequestStillOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PaymentRequestSheet: React.FC<IPaymentRequestSheet> = ({
  isOpen,
  onClose,
  isLoading,
  checkDate,
  accountInfo,
  amountToTransfer,
  fee,
  amountSelected,
  estimatedDate,
  handleCloseStatusModal,
  handleRequestPayment,
  toggleRequestPercPay,
  isPaymentRequestStillOpen,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const { locale } = useLanguage();
  const centPrecisionFormatter = CurrencyFormatters.getCentPrecisionFormatter(locale);
  const { details, accountType, alias } = accountInfo;
  const cardLastDigits = details?.slice(-4, details?.length);
  const aliasAdditional = `(${ACCOUNT_TYPES[accountType]} ${cardLastDigits})`;

  const handleConfirm = () => {
    handleRequestPayment();
    toggleRequestPercPay();
    isPaymentRequestStillOpen(false);
  };

  const handleOnBack = () => {
    handleCloseStatusModal();
  };

  const handleInfoClick = () => {
    isPaymentRequestStillOpen(true);
    onClose();
    dispatch(setShowTenxPayModal({ displayTenxPayModal: true, tenxPayModalType: 'amountRequested' }));
  };

  return (
    <CustomSheet header={false} isOpen={isOpen} headerStyle={{ minHeight: 0, padding: 0 }} onClose={handleOnBack} height="auto" wrapperPadding={false} className="tenx-pay-request">
      <Title font="Poppins" color="charcoal" marginTop={10} marginBottom={40} fontWeight="SB" size="S">
        {t('tenxPayHome.Tenx Pay Review')}
      </Title>

      {isLoading && <Loader />}
      <div className="flex flex-indent">
        <div className="flex flex-start">
          <BodyText marginRight={9} color="charcoal" textType="bodyText" size="N" fontWeight="R">
            {t('tenxPayHome.Amount Requested')}
          </BodyText>

          <Icon name="info" color="blue" size="smaller" cursorPointer onClick={handleInfoClick} />
        </div>

        <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="B">
          {centPrecisionFormatter.format(Number(amountSelected))}
        </BodyText>
      </div>

      <div className="flex flex-indent">
        <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="R">
          {t('tenxPayHome.Account')}
        </BodyText>

        <div className="flex">
          <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="B" marginRight={4}>
            {alias}
          </BodyText>

          <BodyText color="charcoal70" textType="bodyText" size="T" fontWeight="R">
            {aliasAdditional}
          </BodyText>
        </div>
      </div>

      <div className="flex flex-indent">
        <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="R">
          {t('tenxPayHome.Date')}
        </BodyText>

        <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="B">
          {format(new Date(), 'MMM dd, yyyy')}
        </BodyText>
      </div>

      <CustomCard border={`2px solid ${theme.charcoal5}`}>
        <BodyText color="charcoal" textType="bodyText" size="M" fontWeight="B" marginBottom={30}>
          {t('tenxPayHome.Transaction Receipt')}
        </BodyText>

        <div className="flex amount-transfer">
          <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="R">
            {t('tenxPayHome.Amount To Be Transferred')}
          </BodyText>

          <BodyText color="green" textType="bodyText" size="N" fontWeight="B">
            {centPrecisionFormatter.format(Number(amountToTransfer))}
          </BodyText>
        </div>

        <div className="flex tenx-pay-format">
          <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="R">
            {t('tenxPayHome.Early Access Fee')}
          </BodyText>

          <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="B">
            {centPrecisionFormatter.format(Number(fee))}
          </BodyText>
        </div>

        {estimatedDate.length && (
          <div className="flex tenx-pay-format">
            <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="R">
              {t('tenxPayHome.Estimated Delivery Time')}
            </BodyText>

            <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="B">
              {format(parseISO(estimatedDate), 'PP')}
            </BodyText>
          </div>
        )}

        {checkDate.length && (
          <div className="flex">
            <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="R" paddingRight={20}>
              {t('tenxPayHome.Deducted From Next Paycheck On')}
            </BodyText>

            <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="R">
              {format(parseISO(checkDate), 'PP')}
            </BodyText>
          </div>
        )}
      </CustomCard>

      <BodyText color="charcoal70" textType="bodyText" size="T" fontWeight="R" textAlign="center" marginTop={20} marginBottom={20}>
        {t('tenxPayHome.This transaction will appear ...')}
      </BodyText>

      <CustomButton preset="primary" size="middleStretch" onClick={handleConfirm} marginBottom={30}>
        {t('tenxPayHome.Confirm')}
      </CustomButton>
    </CustomSheet>
  );
};
