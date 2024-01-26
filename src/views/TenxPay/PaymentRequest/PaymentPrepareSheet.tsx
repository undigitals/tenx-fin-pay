import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { SAmountInputPercPay, SAmountResult, SIFrame, SIframeCloseButton } from 'views/TenxPay/Home/Home.styles';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { IAccount } from 'store/user/payments/payments.types';
import { Icon } from 'components/general/Icon/Icon';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { mobileApiCall } from 'services/mobileService';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { useSelector } from 'react-redux';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { CardCarousel } from 'views/TenxPay/Home/components/CardCarousel/CardCarousel';
import { BodyText, Title } from 'components/general/Typography';
import { Loader } from 'components/general/Loader/Loader';
import { useTranslation, Trans } from 'react-i18next';
import { CurrencyFormatters } from 'utils/helpers/CurrencyFormatters';
import { useLanguage } from 'utils/hooks/useLanguage';
import './PaymentPrepareSheet.css';
import { useToggle } from 'utils/hooks/useToggle';
import { PaymentRequestModal } from 'components/general/Modals/PaymentRequestModal/PaymentRequestModal';

type KeyboardInputType = React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>;

interface IPaymentPrepareSheet {
  isOpen: boolean;
  isLoading: boolean;
  fee: number | string;
  selectedAccount: number | null;
  availableAmount: number;
  availableMin: number;
  accounts: IAccount[];
  getAccounts: (param: {}) => void;
  handleAddAccountClick: () => void;
  toggleRequestPercPay: () => void;
  handleSelectAccount: (accountId: number) => void;
  onConfirm: (transferAmount: number) => void;
}

interface IErrorData {
  isError: boolean;
  message?: string;
}

export const PaymentPrepareSheet: React.FC<IPaymentPrepareSheet> = ({
  isOpen,
  fee,
  selectedAccount,
  toggleRequestPercPay,
  accounts,
  getAccounts,
  availableAmount,
  availableMin,
  handleAddAccountClick,
  handleSelectAccount,
  onConfirm,
  isLoading,
}) => {
  const [isIframeOpen, setIframeOpen] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrorData>({ isError: false, message: '' });
  const [amountToPay, setAmountToPay] = useState<number>(availableAmount);
  const [isAmountEditable, setAmountEditable] = useState<boolean>(true);
  const { immediatePayFrameUrl } = useSelector(selectAccountsData);
  const paymentRequestInfoModal = useToggle(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const centPrecisionFormatter = CurrencyFormatters.getCentPrecisionFormatter(locale);
  const valueAvailableUpTo = centPrecisionFormatter.format(availableAmount);

  const handleAmountChange = (event: KeyboardInputType) => {
    const value = Number((event.target as HTMLInputElement).value);

    if (value > availableAmount) {
      setErrorData({ isError: true, message: t('tenxPayHome.The amount you have requested is more...') });
    } else if (value < availableMin) {
      setErrorData({
        isError: true,
        message: t('tenxPayHome.The amount you have requested is less...', { minAmount: availableMin }),
      });
    } else {
      setErrorData({ isError: false });
    }
    if (value !== availableAmount) {
      setAmountToPay(value || 0);
    }
  };

  const handleContinueClick = () => {
    onConfirm(amountToPay);
  };

  const handleCloseIframe = () => {
    setIframeOpen(false);
    getAccounts({});
  };

  const handleInfoClick = () => {
    paymentRequestInfoModal.show();
  };

  const onClickAmountValue = () => {
    setAmountEditable(false);
  };

  const onBlurAmountInput = (event: KeyboardInputType) => {
    handleAmountChange(event);
    setAmountEditable(true);
  };

  const onKeyDownAmountInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onBlurAmountInput(event);
  };

  const onInfoModalClose = () => {
    paymentRequestInfoModal.hide();
  };

  useEffect(() => {
    mobileApiCall('backgroundChange', isOpen ? theme.white : theme.blue);
    setAmountToPay(availableAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return !paymentRequestInfoModal.isActive ? (
    <CustomSheet
      id="payment-prepare-sheet"
      isOpen={isOpen}
      header={false}
      wrapperPadding={false}
      headerStyle={{ minHeight: 0, padding: 0 }}
      className="payment-prepare-sheet"
      onClose={toggleRequestPercPay}
    >
      {isLoading && <Loader />}
      <Title font="Poppins" size="S" fontWeight="SB" color="charcoal" marginBottom={10}>
        {t('tenxPayHome.Request Tenx Pay')}
      </Title>

      <div className="flex">
        <BodyText font="Poppins" size="M" fontWeight="SB" color="charcoal" textType="bodyText">
          {t('tenxPayHome.Enter Amount')}
        </BodyText>

        <div className="flex">
          <BodyText color="charcoal70" marginRight={2} fontWeight="B" textType="bodyText" size="T">
            {t(`tenxPayHome.Fee`)}
          </BodyText>

          <CustomAmount className="fee" amount={Number(fee)} multiSizable size="smallerStrong" remainingSize="smallest" remainingWeight={700} color="blue" />

          <Icon name="info" color="blue" size="smaller" cursorPointer onClick={handleInfoClick} />
        </div>
      </div>

      <CustomCard border={`2px solid ${errorData?.isError ? theme.red : theme.blue}`} marginBottom={32} extraStyles={{ minHeight: 114, padding: '24px 24px 2px !important' }}>
        <div className="flex flex-column flex-end">
          {isAmountEditable ? (
            <SAmountResult onClick={onClickAmountValue}>
              <CustomAmount amount={amountToPay} color="charcoal" size="larger" remainingSize="xl" remainingWeight={600} multiSizable isPoppins />
            </SAmountResult>
          ) : (
            <SAmountInputPercPay
              defaultValue={amountToPay}
              onChange={(value: KeyboardInputType) => handleAmountChange(value)}
              onBlur={onBlurAmountInput}
              onKeyDown={onKeyDownAmountInput}
              type="text"
              maxLength={44}
              autoFocus
              inputMode="decimal"
            />
          )}

          <BodyText color="charcoal70" size="T" textType="helperText" fontWeight="R" marginTop={2}>
            <Trans
              i18nKey="tenxPayHome.One transfer of up to..."
              values={{
                valueAvailableUpTo,
              }}
            />
          </BodyText>

          {errorData?.isError && (
            <BodyText color="red" size="T" marginTop={5} fontWeight="R" textType="helperText">
              {errorData?.message}
            </BodyText>
          )}
        </div>
      </CustomCard>

      {!accounts?.length ? (
        <div className="flex flex-column flex-start payment-prepare-sheet-account-part">
          <BodyText font="Poppins" size="M" textType="bodyText" color="charcoal" marginBottom={4} fontWeight="SB">
            {t('tenxPayHome.AddDebitOrBankAccount')}
          </BodyText>

          <BodyText color="charcoal70" marginRight={5} size="N" fontWeight="R" textType="helperText">
            {t('tenxPayHome.YourMoneyWillBeDelivered')}
          </BodyText>
        </div>
      ) : (
        <div className="flex flex-column flex-start payment-prepare-sheet-account-part">
          <BodyText font="Poppins" size="M" textType="bodyText" color="charcoal" marginBottom={4} fontWeight="SB">
            {t('tenxPayHome.SelectAccountOrCard')}
          </BodyText>

          <BodyText color="charcoal70" marginRight={5} size="N" fontWeight="R" textType="helperText">
            {t('tenxPayHome.DebitCardAvailable')}
          </BodyText>
        </div>
      )}

      <CardCarousel className="carousel" accounts={accounts} handleAddAccountClick={handleAddAccountClick} handleSelectAccount={handleSelectAccount} selectedAccount={selectedAccount} />

      <div className="flex flex-row flex-end payment-prepare-sheet-button-part">
        <CustomButton size="middleAlt" marginBottom={32} marginRight={10} marginTop={24} onClick={() => toggleRequestPercPay()}>
          {t('tenxPayHome.Cancel')}
        </CustomButton>

        <CustomButton size="middleAlt" disabled={errorData?.isError} preset="primary" marginBottom={32} marginTop={24} onClick={handleContinueClick}>
          {t('tenxPayHome.Continue')}
        </CustomButton>
      </div>

      <CustomModal
        open={isIframeOpen}
        onCancel={handleCloseIframe}
        padding="7px"
        topPosition="0"
        closeIcon={
          <SIframeCloseButton>
            <Icon name="close" size="small" color="blue" />
          </SIframeCloseButton>
        }
      >
        <SIFrame width="100%" height="100%" title="add account" src={immediatePayFrameUrl} />
      </CustomModal>
    </CustomSheet>
  ) : (
    <PaymentRequestModal open={paymentRequestInfoModal.isActive} onClose={onInfoModalClose} />
  );
};
