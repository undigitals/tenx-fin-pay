import React from 'react';

export interface ICreditCardSmall {
  color?: 'blue' | 'charcoal60';
  onClick?: (e: React.MouseEvent<any>) => void;
  noCarousel?: boolean;
  isSelected: boolean;
  accountDetails?: any;
  accountTypeDetails?: string;
}

export interface IOutline {
  isSelected: boolean;
}

export interface ICard {
  noCarousel?: boolean;
  color: 'blue' | 'charcoal60';
  styleId?: number;
}

export interface ILabel {
  top: string;
  left: string;
}
