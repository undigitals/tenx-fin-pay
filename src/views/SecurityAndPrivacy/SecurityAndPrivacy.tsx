import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBiometryData, setBiometryState, selectCurrentUser } from 'store/user/authentication.slice';
import { Icon } from 'components/general/Icon/Icon';
import { useTranslation } from 'react-i18next';
import { Title, BodyText } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { DataItem } from 'views/Profile/ProfilePage/DataItem/DataItem';
import { CustomCheckSwitch } from 'components/theme/CustomCheckSwitch/CustomCheckSwitch';
import { ChangePasswordModal } from 'views/Profile/ProfilePage/ChangePasswordModal';
import { ProfileEditSheet } from 'views/Profile/ProfilePage/ProfileEditSheet/ProfileEditSheet';
import { mobileApiCall } from 'services/mobileService';
import { useToggle } from 'utils/hooks/useToggle';
import { SCustomCard } from './SecurityAndPrivacy.style';

export const SecurityAndPrivacy: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const biometryData = useSelector(selectBiometryData);
  const userProfileData = useSelector(selectCurrentUser);
  const [username, setUsername] = useState('');
  const isFaceId = biometryData?.type === 'FaceID';
  const isTouchId = biometryData?.type === 'TouchID';

  const handleToggle = (updatedState: boolean) => {
    mobileApiCall('setBiometry', String(updatedState));
    dispatch(setBiometryState(updatedState));
  };

  const editProfileSheet = useToggle(false, '');
  const onCloseProfileSheet = () => {
    editProfileSheet.setData('');
    editProfileSheet.hide();
  };

  useEffect(() => {
    setUsername(userProfileData?.username ?? '');
  }, [userProfileData]);

  return (
    <CustomRow alignItems="flex-start" flexDirection="column" paddingRight={5} paddingLeft={5} marginBottom={32} width="100%">
      <Title size="S" fontWeight="SB" color="charcoal" marginBottom={10} marginTop={6}>
        {t(`securityPrivacy.Security & Privacy`)}
      </Title>
      <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="M" font="DM Sans" lineHeight={1.4}>
        {t(`securityPrivacy.Change your Password or enable Face ID or Touch ID, based on your phone preferences below.`)}
      </BodyText>

      <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="M" font="DM Sans" lineHeight={1.4} marginTop={35}>
        {t(`securityPrivacy.ChangeUsername`)}
      </BodyText>
      <CustomCard marginTop={17} width="100%" padding="28px 25px 24px">
        <DataItem label="Username" value={username} sheetType="username" isLast setSheetType={editProfileSheet.setData} showSheet={editProfileSheet.show} />
      </CustomCard>

      <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="M" font="DM Sans" lineHeight={1.4} marginTop={35}>
        {t(`securityPrivacy.ChangePassword`)}
      </BodyText>
      <CustomCard marginTop={17} width="100%" padding="28px 25px 24px">
        <DataItem label="Password" value="*********" sheetType="password" isLast setSheetType={editProfileSheet.setData} showSheet={editProfileSheet.show} />
      </CustomCard>

      {isFaceId && (
        <>
          <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="M" font="DM Sans" lineHeight={1.4} marginTop={35}>
            {t(`securityPrivacy.Biometric login settings`)}
          </BodyText>
          <SCustomCard marginTop={15} marginBottom={8} cursorPointer width="100%">
            <CustomRow flexDirection="row" alignItems="flex-start" cursorPointer>
              <BodyText textType="bodyText" icon={<Icon name="faceId" />} size="N" font="DM Sans" fontWeight="B" color="charcoal" lineHeight={1.5}>
                {t(`securityPrivacy.Face ID`)}
              </BodyText>
              <CustomCheckSwitch checked={biometryData?.state} onChange={handleToggle} />
            </CustomRow>
          </SCustomCard>
        </>
      )}

      {isTouchId && (
        <>
          <SCustomCard marginTop={20} cursorPointer width="100%">
            <CustomRow flexDirection="row" alignItems="flex-start" cursorPointer>
              <BodyText textType="bodyText" icon={<Icon name="touchId" />} size="N" font="DM Sans" fontWeight="B" color="charcoal" lineHeight={1.5}>
                {t(`securityPrivacy.Touch ID`)}
              </BodyText>
              <CustomCheckSwitch checked={biometryData?.state} onChange={handleToggle} />
            </CustomRow>
          </SCustomCard>
          <BodyText textType="bodyText" color="charcoal60" fontWeight="SM" size="T" font="DM Sans" lineHeight={1.6}>
            {t(`securityPrivacy.If you want to update or change your Touch ID, you can do it here`)}
          </BodyText>
          <BodyText textType="bodyText" color="blue" fontWeight="SM" size="T" font="DM Sans" lineHeight={1.6}>
            {t(`securityPrivacy.Set up Touch ID.`)}
          </BodyText>
        </>
      )}

      <ProfileEditSheet isOpen={editProfileSheet.isActive} type={editProfileSheet?.data || ''} closeSheet={onCloseProfileSheet} />
      <ChangePasswordModal />
    </CustomRow>
  );
};
