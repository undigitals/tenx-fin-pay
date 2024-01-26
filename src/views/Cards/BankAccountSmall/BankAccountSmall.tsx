import { images } from 'assets';
import { BodyText } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';
import { SCard, SOutline } from './BankAccountSmall.styles';
import { IBankAccountSmall } from './BankAccountSmall.types';

export const BankAccountSmall: React.FC<IBankAccountSmall> = ({ bankName, accountNumber, isSelected, onClick }) => {
  const formattedAccountNumber = `**** **** **** ${accountNumber.slice(2)}`;

  return (
    <SOutline isSelected={isSelected}>
      <SCard onClick={onClick}>
        <CustomRow marginBottom={40}>
          <img src={images.bankAccount} alt="bankAccount" />
          <BodyText textType="bodyText" marginLeft={11} color="charcoal" size="N" fontWeight="SB">
            {bankName}
          </BodyText>
        </CustomRow>

        <BodyText textType="bodyText" color="charcoal" size="T" fontWeight="SB">
          {formattedAccountNumber}
        </BodyText>
      </SCard>
    </SOutline>
  );
};
