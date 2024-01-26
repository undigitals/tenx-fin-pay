import { images } from 'assets';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomText } from 'components/theme/CustomText/CustomText';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectDisplayAddStuffSaveAccountModal } from 'store/ui.slice';
import { ROUTES } from 'vars/const/ROUTES';

export const SuccessfulStuffSaveAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const modalParams = useSelector(selectDisplayAddStuffSaveAccountModal);

  const handleBackToHomeClick = () => {
    navigate(ROUTES.home.path);
  };

  return (
    <CustomRow flexDirection="column" justifyContent="space-between" width="100%" minHeight="100%">
      <CustomRow flexDirection="column" width="100%">
        <CustomRow justifyContent="center" marginBottom={32} marginTop={34}>
          <img src={images.successVerification} alt="success" />
        </CustomRow>
        <CustomText size="xxl" textAlign="center">
          Congrats! You’ve Opened a {modalParams.addStuffSaveAccountModalType === 'Stuff' ? 'Goals' : 'Needs'} Account
        </CustomText>
        <CustomText textAlign="center" marginTop={20}>
          Lorem ipsum dolor sit amet.
        </CustomText>
      </CustomRow>
      <CustomRow marginTop={30} marginBottom={30} flexDirection="column" width="100%">
        <CustomButton preset="primary" size="large" onClick={handleBackToHomeClick} marginBottom={17}>
          Transfer Money to my {modalParams.addStuffSaveAccountModalType === 'Stuff' ? 'Goals' : 'Needs'} Account
        </CustomButton>
        <CustomButton preset="primary" size="large" onClick={handleBackToHomeClick}>
          Back to Home
        </CustomButton>
      </CustomRow>
    </CustomRow>
  );
};
