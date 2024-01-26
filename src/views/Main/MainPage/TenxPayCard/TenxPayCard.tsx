import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { SRow } from 'components/theme/CustomRow/CustomRow.styles';
import { BodyText, Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCurrentAuthState, setTenxPayCollapsed } from 'store/user/authentication.slice';
import { useSetUIPreferenceMutation } from 'store/user/properties/userProperties.api';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { useAppDispatch } from 'utils/hooks/store';
import { canHaveTenxPayOrEnroll } from 'vars/const/USER_PROFILE_IDS';
import { Loader } from 'components/general/Loader/Loader';
import { TenxPay } from './TenxPay/TenxPay';
import { SBox, STenxPayImage } from './TenxPayCard.styles';

interface ITenxPayCard {
  isLoading: boolean;
}

export const TenxPayCard: React.FC<ITenxPayCard> = ({ isLoading }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isDesktopSize } = useDeviceDimension();
  const [setUIPreference] = useSetUIPreferenceMutation();
  const currentUser = useSelector(selectCurrentAuthState);
  const isUserWithPercPayOrEnroll = !!currentUser?.user?.systemProfileId && canHaveTenxPayOrEnroll(currentUser.user.systemProfileId);
  const { t } = useTranslation();

  const isTenxPayVisible = isUserWithPercPayOrEnroll && Boolean(currentUser?.thirdPartyIds?.Immediate);

  const isEnrollVisible = isUserWithPercPayOrEnroll && !currentUser?.thirdPartyIds?.Immediate;

  const handleEnrollNow = () => navigate(ROUTES.enroll.path);

  const handleCollapseChange = () => {
    const data = {
      value: {
        isTenxPayCollapsed: !currentUser.UIPreferences?.isTenxPayCollapsed,
        isMyAccountCollapsed: currentUser.UIPreferences?.isMyAccountCollapsed,
      },
    };

    setUIPreference(data);
    dispatch(setTenxPayCollapsed(!currentUser.UIPreferences?.isTenxPayCollapsed));
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {isTenxPayVisible && (
        <>
          <SRow justifyContent="space-between" marginBottom={16}>
            <Title fontWeight="SB" color="charcoal" size="S" font="Poppins">
              {t('tenxPayHome.Tenx Pay')}
            </Title>
            <BodyText textType="bodyText" color="blue" size="T" fontWeight="B" cursorPointer onClick={handleCollapseChange}>
              {currentUser.UIPreferences?.isTenxPayCollapsed ? t('homeScreen.Show more') : t('homeScreen.Show less')}
            </BodyText>
          </SRow>

          <TenxPay isEnrollDisplay={false} isCollapsed={!!currentUser.UIPreferences?.isTenxPayCollapsed} />
        </>
      )}

      {isEnrollVisible && (
        <>
          <SRow justifyContent="space-between">
            <Title fontWeight="SB" color="charcoal" size="S" font="Poppins">
              {t('tenxPayHome.Tenx Pay')}
            </Title>
          </SRow>

          <SBox>
            <CustomRow flexDirection={isDesktopSize ? 'row' : 'column'}>
              <div>
                <STenxPayImage isDesktop={isDesktopSize} />
              </div>
              <div>
                <CustomRow flexDirection="column" alignItems="start">
                  <Title fontWeight={isDesktopSize ? 'M' : 'SB'} size={isDesktopSize ? 'L' : 'T'} marginBottom={16} font="Poppins" color="charcoal" textAlign="center">
                    {t(`homeScreen.Need your money now?`)}
                  </Title>
                  <BodyText textType="bodyText" size="N" color="charcoal70" fontWeight="R" marginBottom={24} textAlign="start" font="DM Sans">
                    {t(`homeScreen.See how many hours you've ...`)}
                  </BodyText>
                </CustomRow>

                <CustomButton preset="primary" size="middle" onClick={handleEnrollNow} width={isDesktopSize ? 'auto' : '100%'}>
                  {t(`homeScreen.Enroll now`)}
                </CustomButton>
              </div>
            </CustomRow>
          </SBox>
        </>
      )}
    </>
  );
};
