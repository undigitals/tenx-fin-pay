import React, { useState } from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { IPayAccountModalProps } from './PayAccountModal.types';
import { SIconClose } from './PayAccountModal.styles';

export const PayAccountModal: React.FC<IPayAccountModalProps> = ({ header, isVisible }) => {
  const [isModalVisible, setIsModalVisible] = useState(isVisible);

  const onCancelHandler = () => {
    setIsModalVisible(false);
  };

  return (
    <CustomModal open={isModalVisible} onCancel={onCancelHandler} topPosition="30%" padding="30px 24px" closeIcon={<SIconClose name="closeCircle" />}>
      <CustomRow>
        <CustomTitle size="xl" fontWeight="light">
          {header}
        </CustomTitle>
      </CustomRow>
      <CustomRow>
        <CustomText font="DM Sans" textColor="charcoal60">
          testchildren
        </CustomText>
      </CustomRow>
    </CustomModal>
  );
};
