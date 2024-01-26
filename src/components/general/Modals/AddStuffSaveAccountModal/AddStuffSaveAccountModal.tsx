import React, { useEffect } from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { SIconClose, SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';
import { useAppDispatch } from 'utils/hooks/store';
import { selectDisplayAddStuffSaveAccountModal, setShowAddStuffSaveAccountModal, setShowStuffSaveAccountErrorModal } from 'store/ui.slice';
import { useSelector } from 'react-redux';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Icon } from 'components/general/Icon/Icon';
import { useAddAccountMutation } from 'store/user/accounts/accounts.api';
import { Loader } from 'components/general/Loader/Loader';
import { SArrowRight, SList, SListItem } from './AddStuffSaveAccountModal.styles';

export const AddStuffSaveAccountModal: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const modalParams = useSelector(selectDisplayAddStuffSaveAccountModal);
  const [addAccountAPI, addAccountAPIResult] = useAddAccountMutation();

  const addAccount = async () => {
    await addAccountAPI({
      tenxAccountType: modalParams.addStuffSaveAccountModalType,
      nickname: '',
    });
  };

  useEffect(() => {
    if (addAccountAPIResult?.isError) {
      dispatch(setShowStuffSaveAccountErrorModal(true));
    }

    if (addAccountAPIResult?.isSuccess) {
      navigate(ROUTES.successfulAccountOpen.path);
    }
  }, [addAccountAPIResult?.isError, addAccountAPIResult?.isSuccess, dispatch, navigate]);

  const handleOnContinue = () => {
    addAccount();

    dispatch(
      setShowAddStuffSaveAccountModal({
        displayAddStuffSaveAccountModal: false,
        addStuffSaveAccountModalType: modalParams.addStuffSaveAccountModalType,
      })
    );
  };

  const handleOnCancel = () => {
    dispatch(
      setShowAddStuffSaveAccountModal({
        displayAddStuffSaveAccountModal: false,
        addStuffSaveAccountModalType: modalParams.addStuffSaveAccountModalType,
      })
    );
  };

  return (
    <CustomModal open={modalParams.displayAddStuffSaveAccountModal} centered onCancel={handleOnCancel} destroyOnClose footer={null} maskStyle={SMaskStyle} closeIcon={<SIconClose />} topPosition="0">
      <CustomRow marginBottom={32} justifyContent="center">
        <Icon name="placeholder" color="blue" size="xxl" />
      </CustomRow>

      <CustomRow flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
        <CustomText fontWeight="stronger" textColor="charcoal" size="xl" marginBottom={24} font="Poppins">
          Open A {modalParams.addStuffSaveAccountModalType === 'Stuff' ? 'Stuff' : 'Save'} Account
        </CustomText>
        <CustomText textColor="charcoal" marginBottom={32}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus ipsum non commodo pharetra. Vivamus efficitur volutpat nulla, eget vestibulum sapien.
        </CustomText>

        <CustomText textColor="charcoal" size="16" fontWeight="strongest" marginBottom={32}>
          Tools for Budgeting & Saving
        </CustomText>

        <SList>
          <SListItem>Goals Account: Set aside money intended for your monthly expenses</SListItem>
          <SListItem>Needs Account: Save for future financial goals or set aside money for a rainy day</SListItem>
        </SList>
      </CustomRow>

      <CustomButton preset="primary" size="large" onClick={handleOnContinue} marginBottom={24} marginTop={24}>
        Open a {modalParams.addStuffSaveAccountModalType === 'Stuff' ? 'Stuff' : 'Save'} Account Now <SArrowRight />
      </CustomButton>

      <CustomText textColor="charcoal70" textAlign="center" size="small">
        Tenx Group, Inc., is a digital company that provides access to products and services to help improve financial wellness. Tenx deposit accounts are provided by Sutton Bank, Member FDIC
      </CustomText>
      {addAccountAPIResult?.isLoading && <Loader />}
    </CustomModal>
  );
};
