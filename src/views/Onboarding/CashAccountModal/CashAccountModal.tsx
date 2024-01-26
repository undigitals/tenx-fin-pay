import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { StarterPage } from 'views/OpenCashAccount/StarterPage/StarterPage';
import { SCloseIcon, SContent } from './CashAccountModal.styles';

export type TCashAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CashAccountModal: React.FC<TCashAccountModalProps> = ({ isOpen, onClose }) => (
  <CustomModal open={isOpen} closable={false} topPosition="5%" width="55%">
    <SCloseIcon name="closeCircle" color="charcoal70" size="big" onClick={onClose} cursorPointer />
    <SContent>
      <StarterPage ignoreDimension />
    </SContent>
  </CustomModal>
);
