import React from 'react';
import { BodyText } from 'components/general/Typography';
import { SAmericanExpressLogo, SAmericanExpressTitle, SCard, SDebit, SDiscover, SEmvChip, SMastercard, SOutline, SVisa } from './CreditCardSmall.styles';
import { ICreditCardSmall } from './CreditCardSmall.types';

export const CreditCardSmall: React.FC<ICreditCardSmall> = ({ color = 'blue', onClick, noCarousel, isSelected, accountDetails, accountTypeDetails }) => (
  <SOutline isSelected={isSelected}>
    <SCard styleId={accountDetails?.styleId ?? 1} color={color} onClick={onClick} noCarousel={noCarousel}>
      <>
        {accountTypeDetails === 'Mastercard' && (
          <BodyText textType="bodyText" fontWeight="M" size="N" color="white" marginLeft={14} marginTop={12}>
            Mastercard
          </BodyText>
        )}

        <SEmvChip />
        <SDebit />

        {accountTypeDetails === 'Visa' && <SVisa />}
        {accountTypeDetails === 'Mastercard' && <SMastercard />}
        {accountTypeDetails === 'Discover' && <SDiscover />}

        {accountTypeDetails === 'AmericanExpress' && (
          <>
            <SAmericanExpressTitle />
            <SAmericanExpressLogo />
          </>
        )}
      </>
    </SCard>
  </SOutline>
);
