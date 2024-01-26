import React from 'react';
import clsx from 'clsx';
import { Icon } from 'components/general/Icon/Icon';
import { STransactionSign } from './BalancesTransactionsPage.styles';

interface ISignProps {
  type: 'income' | 'expense';
}

export const Sign = ({ type }: ISignProps) => (
  <STransactionSign className="transaction-sign">
    <Icon name="creditCard2" size="normal" color="charcoal70" />
    <div className={clsx('arrow', type)} />
  </STransactionSign>
);
