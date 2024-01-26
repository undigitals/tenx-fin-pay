import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/general/Spinner/Spinner';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';
import { useChangePasswordMutation } from 'store/user/forgotPassword/forgotPassword.api';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { ChangePasswordForm } from './ChangePasswordForm/ChangePasswordForm';
import { SLayout } from './ChangePasswordPage.styles';
import { SuccessModal } from './SuccessModal/SuccessModal';

export const ChangePasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isDesktopSize } = useDeviceDimension();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <SLayout>
      {isLoading && <Spinner />}

      <CustomTitle size="bigger" fontWeight="light" align="start" marginBottom="normal">
        {t('header.Forgot password')}
      </CustomTitle>
      {isDesktopSize ? (
        <>
          <CustomCard>
            <ChangePasswordForm handleChangePassword={changePassword} isLoading={isLoading} handleOpen={handleOpen} />
          </CustomCard>
          <SuccessModal isOpen={isOpen} onClose={handleClose} />
        </>
      ) : (
        <ChangePasswordForm handleChangePassword={changePassword} isLoading={isLoading} />
      )}
    </SLayout>
  );
};
