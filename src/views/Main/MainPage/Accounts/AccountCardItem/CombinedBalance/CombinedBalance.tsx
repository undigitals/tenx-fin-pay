import React from 'react';
import { BodyText } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { SContainer } from './CombinedBalance.styles';

interface ICombinedBalance {
  balance: number | undefined;
  className: string;
}

export const CombinedBalance: React.FC<ICombinedBalance> = ({ balance, className }) => {
  const { t } = useTranslation();

  return (
    <SContainer className={className}>
      <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70">
        {t('homeScreen.CombinedBalance')}
      </BodyText>

      {balance !== undefined && <CustomAmount amount={balance} color="charcoal" size="smaller" remainingSize="smaller" multiSizable remainingWeight={700} className="amount" />}
    </SContainer>
  );
};
