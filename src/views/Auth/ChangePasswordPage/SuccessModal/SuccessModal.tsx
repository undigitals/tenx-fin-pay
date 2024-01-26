import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { SuccessPage } from 'views/Auth/SuccessPage/SuccessPage';
import { SCloseIcon, SContent } from './SuccessModal.styles';

type TSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SuccessModal: React.FC<TSuccessModalProps> = ({ isOpen, onClose }) => (
  <CustomModal open={isOpen} closable={false} onClose={onClose} topPosition="5%" width="60%">
    <SCloseIcon name="closeCircle" color="charcoal70" size="big" onClick={onClose} cursorPointer />
    <SContent>
      <SuccessPage />
    </SContent>
  </CustomModal>
);
