import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'utils/hooks/store';
import { selectDisplayCardHubModal, setShowCardHubModal } from 'store/ui.slice';
import { SCardHubModal } from './CardHubModal.styles';
import { CardHubFrame } from './CardHubFrame';

export const CardHubModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isModalVisible = useSelector(selectDisplayCardHubModal);
  const handleOnCancel = () => {
    dispatch(setShowCardHubModal(false));
  };
  return (
    <SCardHubModal open={isModalVisible} width={920} topPosition="0" footer={null} onCancel={handleOnCancel} className="cardHub-iframe-modal">
      <CardHubFrame />
    </SCardHubModal>
  );
};
