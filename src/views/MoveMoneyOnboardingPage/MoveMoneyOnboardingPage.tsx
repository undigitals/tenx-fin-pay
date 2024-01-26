import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BodyText, Title } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useAppDispatch } from 'utils/hooks/store';
import { useSelector } from 'react-redux';
import { useWaitlistProducts } from 'utils/hooks/useWaitlistProducts';
import { selectCurrentAuthState } from 'store/user/authentication.slice';
import { setWaitlistLocation } from 'store/location.slice';
import { ROUTES } from 'vars/const/ROUTES';
import { useLazyGetUserAlertsQuery } from 'store/user/users.api';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { SLayout, SIconWrapper } from './MoveMoneyOnboardingPage.style';

export const MoveMoneyOnboardingPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  dispatch(setWaitlistLocation(ROUTES.moveMoneyOnboarding.path));
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentAuthState);
  const { isUserSubscribedToAnyProducts, filterWaitlistProductsPreferences } = useWaitlistProducts();
  const [getUserAlerts] = useLazyGetUserAlertsQuery();

  useEffect(() => {
    if (!currentUser?.user?.userId) return;

    getUserAlerts();
    filterWaitlistProductsPreferences();
  }, []);

  return (
    <SLayout>
      <div>
        <Title color="charcoal" size="S" fontWeight="SB" font="Poppins" marginLeft={5} marginBottom={20}>
          {t('moveMoneyOnboarding.Headline')}
        </Title>
        <CustomCard>
          <CustomRow marginBottom={22} justifyContent="flex-start">
            <SIconWrapper />
            <BodyText textType="bodyText" size="M" fontWeight="SB" font="Poppins" color="charcoal" marginLeft={24}>
              {t('moveMoneyOnboarding.Subheadline')}
            </BodyText>
          </CustomRow>
          <CustomRow justifyContent="flex-start" marginLeft={60}>
            <BodyText textType="bodyText" size="N" fontWeight="R" font="DM Sans" color="charcoal70">
              {t('moveMoneyOnboarding.Subtext')}
            </BodyText>
          </CustomRow>
          {!isUserSubscribedToAnyProducts && (
            <CustomRow justifyContent="flex-end">
              <CustomButton className="sing-up-btn" size="small" onClick={() => navigate(ROUTES.productsInterests.path)} marginTop={20}>
                {t('moveMoneyOnboarding.Button')}
              </CustomButton>
            </CustomRow>
          )}
        </CustomCard>
      </div>

      <BodyText font="DM Sans" textType="bodyText" fontWeight="R" size="T" color="charcoal70" textAlign="start" marginBottom={35} marginTop={30} lineHeight={1.3}>
        {t(`moveMoney.Tenx Group, LLC, is a digital company`)}
      </BodyText>
    </SLayout>
  );
};
