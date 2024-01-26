import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { useAppDispatch } from 'utils/hooks/store';
import { selectDisplayChangePasswordModal, setShowChangePasswordModal } from 'store/ui.slice';
import { useSelector } from 'react-redux';
import { images } from 'assets';
import { BodyText, Title } from 'components/general/Typography';

export const ChangePasswordModal = () => {
  const dispatch = useAppDispatch();
  const isModalVisible = useSelector(selectDisplayChangePasswordModal);
  const { t } = useTranslation();

  const handleOnCancel = () => {
    dispatch(setShowChangePasswordModal(false));
  };

  return (
    <CustomModal open={isModalVisible} onCancel={handleOnCancel} closeIconColor="charcoal70">
      <div className="center-image">
        <img src={images.success} alt="passwordChangeFinished" />
      </div>
      <Title fontWeight="M" color="charcoal" size="M" marginTop={20} marginBottom={20}>
        {t(`profile.Password Saved!`)}
      </Title>
      <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" textAlign="start">
        {t(`profile.You can now use your new password.`)}
      </BodyText>
    </CustomModal>
  );
};
