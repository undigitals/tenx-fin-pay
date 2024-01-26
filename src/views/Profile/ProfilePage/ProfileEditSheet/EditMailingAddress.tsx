import React from 'react';
import { EditAddress } from './EditAddress';

interface IProps {
  closeSheet?: () => void;
}

export const EditMailingAddress = ({ closeSheet }: IProps) => <EditAddress closeSheet={closeSheet} />;
