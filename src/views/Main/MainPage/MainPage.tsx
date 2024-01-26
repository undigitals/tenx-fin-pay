import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { canHaveAccounts, canHaveTenxPayOrEnroll } from 'vars/const/USER_PROFILE_IDS';
import { selectCurrentAuthState, selectPolicies } from 'store/user/authentication.slice';
import { useLazyGetZogoTokenQuery } from 'store/user/zogo/zogo.api';
import { useLazyGetThirdPartyIdsQuery, useLazyGetCurrentUserQuery } from 'store/user/users.api';
import { useLazyGetUIPreferenceQuery } from 'store/user/properties/userProperties.api';
import { usePayments } from 'utils/hooks/usePayments';
import { BodyText } from 'components/general/Typography';
import { Loader } from 'components/general/Loader/Loader';
import { useAppDispatch } from 'utils/hooks/store';
import { chatActions } from 'store/chat/chat.slice';
import { IAccountItem, IFeatureItem } from 'store/user/accounts/accounts.types';
import { usePennyJar } from 'utils/hooks/usePennyJar';
import { Discover } from './Discover/Discover';
import { Accounts } from './Accounts/Accounts';
import { WatchAndLearn } from './WatchAndLearn/WatchAndLearn';
import { TenxPayCard } from './TenxPayCard/TenxPayCard';
import { SCards, SDisclosureContainer, SPage } from './MainPage.styles';
import { PennyJar } from './PennyJar/PennyJar';

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { setPolicies } = chatActions;
  const policies = useSelector(selectPolicies);
  const currentAuthState = useSelector(selectCurrentAuthState);
  const { getPaymentsInfoQueryResult } = usePayments(false);
  const [getZogoToken, getZogoTokenResult] = useLazyGetZogoTokenQuery();
  const { getFeatures, getAccountFeaturesResult } = usePennyJar();
  const [getUIPreference, getUIPReferenceResult] = useLazyGetUIPreferenceQuery();
  const [getThirdPartyIds, getThirdPartyIdsResult] = useLazyGetThirdPartyIdsQuery();
  const [getCurrentUser, getCurrentUserResult] = useLazyGetCurrentUserQuery();
  const isDisplay = !!currentAuthState?.user?.systemProfileId && canHaveAccounts(currentAuthState.user.systemProfileId);
  const isDisplayPercPay = !!currentAuthState?.user?.systemProfileId && canHaveTenxPayOrEnroll(currentAuthState.user.systemProfileId) && Boolean(currentAuthState?.thirdPartyIds?.Immediate);
  const isDisplayEnroll = !!currentAuthState?.user?.systemProfileId && canHaveTenxPayOrEnroll(currentAuthState.user.systemProfileId) && !currentAuthState?.thirdPartyIds?.Immediate;
  const isDisplayTenxCard = isDisplayPercPay || isDisplayEnroll;
  const isLoading = getThirdPartyIdsResult.isLoading || getCurrentUserResult.isLoading || getAccountFeaturesResult.isFetching;
  const hasSaveOrStuffAcc = currentAuthState?.user?.accounts?.some((item: IAccountItem) => item.type === 'Save' || item.type === 'Stuff');
  const primaryCashAcc = currentAuthState?.user?.accounts?.find((item: IAccountItem) => item.type === 'Cash' && item.owner);
  const isDisplayPennyJar =
    policies?.PennyJarEnabled &&
    !currentAuthState?.UIPreferences?.isPennyJarDismissed &&
    hasSaveOrStuffAcc &&
    !getAccountFeaturesResult.currentData?.find((item: IFeatureItem) => item.type === 'RoundUp').isEnabled;

  useEffect(() => {
    getUIPreference();
    getZogoToken();
    getThirdPartyIds();
    getCurrentUser();
    dispatch(setPolicies(policies));
  }, []);

  useEffect(() => {
    if (getUIPReferenceResult.isSuccess && !getUIPReferenceResult.currentData?.isPennyJarDismissed && primaryCashAcc?.accountId) {
      getFeatures(primaryCashAcc.accountId);
    }
  }, [getUIPReferenceResult]);

  return (
    <SPage>
      {isLoading && <Loader />}
      <SCards>
        {isDisplay && <Accounts />}
        {isDisplayPennyJar && <PennyJar />}
        {isDisplayTenxCard && <TenxPayCard isLoading={getPaymentsInfoQueryResult.isFetching} />}

        <Discover isZogoLoading={getZogoTokenResult.isFetching} />
        <WatchAndLearn />

        <SDisclosureContainer>
          <BodyText textType="bodyText" size="T" fontWeight="R" marginTop={23} marginBottom={15} marginRight={5} marginLeft={5} color="charcoal70" textAlign="start" lineHeight={1.4}>
            {t('home.Tenx Group, LLC, is a digital company')}
          </BodyText>
        </SDisclosureContainer>
      </SCards>
    </SPage>
  );
};
