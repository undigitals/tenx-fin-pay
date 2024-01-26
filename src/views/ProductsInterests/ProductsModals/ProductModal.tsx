import React from 'react';
import { Title } from 'components/general/Typography';
import { Icon } from 'components/general/Icon/Icon';
import { SContentWrapper, SProductModal, STopImgWrapper } from './ProductModal.styles';

export interface IProductModalProps {
  visible: boolean;
  title: string;
  content: React.ReactNode;
  topImg: React.ReactNode;
  badgeName: string;
  handleClose: () => void;
}

export interface IProductModalCompactProps {
  visible: boolean;
  handleClose: () => void;
}

export const ProductModal: React.FC<IProductModalProps> = ({ visible, title, content, topImg, badgeName, handleClose }) => (
  <SProductModal open={visible} footer={null} onCancel={handleClose} topPosition="0">
    <STopImgWrapper>{topImg}</STopImgWrapper>
    <Title font="Poppins" color="charcoal" fontWeight="SB" size="S">
      <Icon name={badgeName} color="blue" /> {title}
    </Title>
    <SContentWrapper>{content}</SContentWrapper>
  </SProductModal>
);
