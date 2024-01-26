import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { Title, BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { useGetUserProfileDataMutation, useGetCurrentUserQuery } from 'store/user/users.api';
import { getLastFourDigits } from 'utils/helpers/phoneNumber';
import { SRow } from 'components/theme/CustomRow/CustomRow.styles';
import { Icon } from 'components/general/Icon/Icon';
import { useToggle } from 'utils/hooks/useToggle';
import { implodeString } from 'utils/helpers/stringFormatter';
import { Loader } from 'components/general/Loader/Loader';
import { ProfileEditSheet } from './ProfileEditSheet/ProfileEditSheet';
import { DataItem } from './DataItem/DataItem';
import { ChangePasswordModal } from './ChangePasswordModal';
import { DeleteAccountModal } from './DeleteAccountModal/DeleteAccountModal';
import { EditEmailVerificationSheet } from './ProfileEditSheet/EditEmail/EditEmailVerificationSheet';
import { EditPhoneNumberSheet } from './ProfileEditSheet/EditPhoneNumber/EditPhoneNumberSheet';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState({
    userLegalName: '',
    userPreferredName: '',
    address: '',
    mailingAddress: '',
    email: '',
    phoneNumber: '',
    password: '',
    username: '',
  });

  const userProfileData = useSelector(selectCurrentUser);
  const userId = userProfileData?.userId;
  const [getUserProfileData] = useGetUserProfileDataMutation();
  const currentUserDataQuery = useGetCurrentUserQuery();

  const deleteAccountModal = useToggle(false);
  const handleOnClick = () => deleteAccountModal.show();

  const editProfileSheet = useToggle(false, '');
  const onCloseProfileSheet = () => {
    editProfileSheet.setData('');
    editProfileSheet.hide();
  };

  useEffect(() => {
    getUserProfileData({ userId });
  }, []);

  useEffect(() => {
    setUserProfile({
      userLegalName: `${userProfileData?.firstName ?? ''} ${userProfileData?.lastName ?? ''}`,
      userPreferredName: `${userProfileData?.preferredName || ''}`,
      address: implodeString([userProfileData?.address1, userProfileData?.address2, userProfileData?.city, userProfileData?.stateProvince, userProfileData?.postalCode]),
      mailingAddress: implodeString([
        userProfileData?.mailingAddress1,
        userProfileData?.mailingAddress2,
        userProfileData?.mailingCity,
        userProfileData?.mailingStateProvince,
        userProfileData?.mailingPostalCode,
      ]),
      email: `${userProfileData?.email ?? ''}`,
      phoneNumber: `${userProfileData?.primaryPhone ?? ''}`,
      password: `${userProfileData?.middleName ?? ''}`,
      username: `${userProfileData?.username ?? ''}`,
    });
  }, [userProfileData]);

  return (
    <>
      {(currentUserDataQuery.isLoading || currentUserDataQuery.isFetching) && <Loader />}
      <Title fontWeight="SB" color="charcoal" marginBottom={30} font="Poppins" size="S">
        {t(`profile.Profile`)}
      </Title>

      <CustomCard marginTop={17} padding="24px 24px 20px">
        <DataItem label="Name" value={userProfile.userLegalName} sheetType="legalName" showEditIcon={false} />
        <DataItem label="Preferred Name" value={userProfile.userPreferredName} sheetType="preferredName" showInfoIcon setSheetType={editProfileSheet.setData} showSheet={editProfileSheet.show} />
        <DataItem label="Username" value={userProfile.username} sheetType="username" setSheetType={editProfileSheet.setData} showSheet={editProfileSheet.show} />
        <DataItem label="Home Address" value={userProfile.address} sheetType="address" setSheetType={editProfileSheet.setData} showSheet={editProfileSheet.show} />
        <DataItem
          label="Mailing Address"
          value={userProfileData?.isMailingAddressTheSame ? t('myInfo.TheSameAddress') : userProfile.mailingAddress}
          sheetType="mailingAddress"
          setSheetType={editProfileSheet.setData}
          showSheet={editProfileSheet.show}
        />
        <DataItem label="Email" value={userProfile.email} sheetType="email" setSheetType={editProfileSheet.setData} showSheet={editProfileSheet.show} />
        <DataItem label="Phone Number" value={getLastFourDigits(userProfile?.phoneNumber) || ''} sheetType="phoneNumber" setSheetType={editProfileSheet.setData} showSheet={editProfileSheet.show} />
      </CustomCard>

      {/* Delete Account Button */}
      <CustomCard marginTop={20} marginBottom={25} borderRadius={16} onClick={handleOnClick} cursorPointer>
        <SRow>
          <Icon name="brokenHeart" size="small" color="red" marginRight={19} />
          <BodyText textType="errorText" size="N" color="red" fontWeight="SM" cursorPointer>
            {t(`profile.MenuDeleteAccount`)}
          </BodyText>
        </SRow>
      </CustomCard>

      <ProfileEditSheet isOpen={editProfileSheet.isActive} type={editProfileSheet.data || ''} closeSheet={onCloseProfileSheet} />

      <EditEmailVerificationSheet />
      <EditPhoneNumberSheet />
      <ChangePasswordModal />
      <DeleteAccountModal open={deleteAccountModal.isActive} onClose={deleteAccountModal.hide} />
    </>
  );
};
