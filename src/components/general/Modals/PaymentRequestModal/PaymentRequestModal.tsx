import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectPaymentsAccountsData } from 'store/user/payments/payments.slice';
import { BodyText, Title } from 'components/general/Typography';
import { Trans, useTranslation } from 'react-i18next';
import { useLanguage } from 'utils/hooks/useLanguage';
import { CurrencyFormatters } from 'utils/helpers/CurrencyFormatters';

interface IPaymentRequestModal {
  open: boolean;
  onClose: () => void;
}

export const PaymentRequestModal: React.FC<IPaymentRequestModal> = ({ open, onClose }) => {
  const { fee } = useSelector(selectPaymentsAccountsData);
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const centPrecisionFormatter = CurrencyFormatters.getCentPrecisionFormatter(locale);
  const formattedFee = centPrecisionFormatter.format(Number(fee));

  return (
    <CustomModal open={open} onCancel={onClose} topPosition="19.5%" closeIconColor="charcoal70">
      <Title size="M" fontWeight="M" marginBottom={18}>
        {t('tenxPayHome.How do fees work')}
      </Title>

      <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.4}>
        <Trans i18nKey="tenxPayHome.FlatServiceFee" components={{ Bold: <strong /> }} values={{ formattedFee }} />
      </BodyText>
    </CustomModal>
  );
};
