import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'utils/hooks/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from 'store/user/users.api';
import exclamation from 'assets/images/exclamation.svg';
import { lsGetItem } from 'utils/helpers/storage';
import { mobileApiCall } from 'services/mobileService';
import { Title, BodyText } from 'components/general/Typography';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { SList, SListItem } from 'components/general/Modals/AddStuffSaveAccountModal/AddStuffSaveAccountModal.styles';
import { ROUTES } from 'vars/const/ROUTES';
import { deleteUserData, selectCurrentAuthState, selectSystemProperties } from 'store/user/authentication.slice';
import { formatPhone } from 'utils/helpers/phone';
import { SDeleteAccountModal, SLink } from './DeleteAccountModal.styles';

interface IDeleteAccountModal {
  open: boolean;
  onClose: () => void;
}

export const DeleteAccountModal: React.FC<IDeleteAccountModal> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { supportPhoneNumber } = useSelector(selectSystemProperties);
  const supportTelVal = useMemo(() => `tel:${formatPhone(supportPhoneNumber)}`, [supportPhoneNumber]);

  const { user } = useSelector(selectCurrentAuthState);
  const hasCashAccounts = user?.accounts?.some((acc) => acc.type === 'Cash');

  const [deleteUser] = useDeleteUserMutation();
  const isMobileApp = lsGetItem('isMobileApp');

  const handleLogout = async () => {
    await deleteUser({});
    if (isMobileApp) {
      mobileApiCall('accountDeleted');
    }
    navigate(ROUTES.registration.path);
    onClose();
    dispatch(deleteUserData());
  };

  return (
    <CustomModal open={open} onCancel={onClose} topPosition="8%" padding="15px" display="none">
      <SDeleteAccountModal>
        <div className="centerImage">
          <img src={exclamation} alt="exclamation" />
        </div>
        <Title fontWeight="M" color="charcoal" font="Poppins" size="M" marginBottom={15} paddingLeft={10}>
          {t('profile.DeleteAccount')}
        </Title>

        {hasCashAccounts ? (
          <BodyText textType="bodyText" font="DM Sans" color="charcoal" size="N" fontWeight="R" lineHeight={1.4} marginTop={10} marginBottom={10} paddingLeft={10} paddingTop={5}>
            {t('profile.There is an open Cash Account')} <SLink href={supportTelVal}>{supportPhoneNumber}.</SLink>
          </BodyText>
        ) : (
          <>
            <BodyText textType="bodyText" font="DM Sans" color="charcoal" size="N" fontWeight="SB" marginTop={10} marginBottom={10} paddingLeft={10} paddingTop={5}>
              {t('profile.YouWill')}
            </BodyText>

            <SList>
              <SListItem>{t('profile.LoseProfileData')}</SListItem>
              <SListItem>{t('profile.LoseTenxProgress')}</SListItem>
              <SListItem>{t('profile.ContinueReceive')}</SListItem>
              <SListItem>{t('profile.CompleteAgain')}</SListItem>
            </SList>

            <BodyText textType="bodyText" font="DM Sans" color="charcoal" size="N" fontWeight="SB" paddingLeft={10} marginTop={30}>
              {t('profile.AreYouSure')}
            </BodyText>
          </>
        )}

        <div className="footer">
          <CustomButton preset="red" size="middle" onClick={onClose}>
            {t('profile.Cancel')}
          </CustomButton>

          <CustomButton preset="primary-red" size="middle" onClick={handleLogout} disabled={hasCashAccounts}>
            {t('profile.Confirm')}
          </CustomButton>
        </div>
      </SDeleteAccountModal>
    </CustomModal>
  );
};
