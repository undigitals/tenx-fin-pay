import React from 'react';
import { Trans } from 'react-i18next';
import { AmountInputComponent } from 'components/general/AmountInput/AmountInputComponent';
import { BodyText } from 'components/general/Typography';
import { AMOUNT_LIMITS } from 'vars/const/AMOUNT_LIMITS';
import { SContainer } from './AmountCard.styles';

interface IAmountCardProps {
  amount?: string;
  handleAmountChange: (val: string) => void;
  wrapperClassName: string;
}
export const AmountCard: React.FC<IAmountCardProps> = ({ amount, handleAmountChange, wrapperClassName }) => (
  <SContainer>
    <AmountInputComponent value={amount} onChange={handleAmountChange} wrapperClassName={wrapperClassName} />
    <BodyText color="charcoal" fontWeight="M" size="N" justifyContent="end" textType="bodyText">
      <Trans
        i18nKey="externalTransfer.AmountRange"
        values={{
          minAmount: AMOUNT_LIMITS.SINGLE_MIN,
          maxAmount: AMOUNT_LIMITS.SINGLE_MAX,
        }}
      >
        {`The amount must be between $${AMOUNT_LIMITS.SINGLE_MIN} and $${AMOUNT_LIMITS.SINGLE_MAX}`}
      </Trans>
    </BodyText>
  </SContainer>
);
