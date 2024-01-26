import React from 'react';

export interface IBankAccountSmall {
  bankName: string;
  accountNumber: string;
  isSelected: boolean;
  onClick?: (e: React.MouseEvent<any>) => void;
}

export interface IOutline {
  isSelected: boolean;
}
