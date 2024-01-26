import React from 'react';
import { ReactComponent as InternationalTransferModalSvg } from 'assets/images/internationalTransfer.svg';
import { IProductModalCompactProps, ProductModal } from './ProductModal';

export const InternationalTransferModal: React.FC<IProductModalCompactProps> = ({ visible = false, handleClose }) => {
  const InternationalTransferModalContent = () => (
    <>
      <p>Send money to friends and family outside the U.S. from your Tenx Cash Account.</p>

      <ul>
        <li>Fast and secure</li>
        <li>Send money at the real exchange rate with no hidden fees</li>
      </ul>
    </>
  );

  return (
    <ProductModal
      visible={visible}
      title="International Transfer"
      topImg={<InternationalTransferModalSvg />}
      badgeName="internationalTransferBadge"
      content={<InternationalTransferModalContent />}
      handleClose={handleClose}
    />
  );
};
