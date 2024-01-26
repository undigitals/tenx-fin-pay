import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetUserAllAlertsQuery, usePutAllAlertsMutation } from 'store/user/users.api';
import { UNSUBSCRIBED_PRODUCTS_FOR_SUBSCRIPTIONS } from 'vars/const/SUBS_CONFIG';
import { changeAllWaitlistProducts, changeWaitlistProduct, selectWaitlistProductsData } from 'store/user/waitlistProducts/waitlistProducts.slice';
import { IAlertItem } from 'store/user/waitlistProducts/waitlistProducts.types';
import { setShowSubscriptionsModal } from 'store/ui.slice';
import { ESubscriptionModalType } from 'vars/types/subscription.types';
import { useAppDispatch } from './store';

export const CREDIT_CARDS_ALERT = '409547ce-edcd-46c7-8e33-7cfe457af738';
export const BUDGET_AND_SAVE_ALERT = '973b6de8-91c7-4a46-a2ed-9b23659d94e8';
export const TEST_ALERT = '0b4ce5b2-95c8-4c58-b3e5-f1ceae373cd8';

interface IAlertItemState {
  alertId: string;
  isSubscribed: boolean;
}

export const useWaitlistProducts = () => {
  const dispatch = useAppDispatch();
  const [getAllAlertsAPI, getAllAlertsAPIResult] = useLazyGetUserAllAlertsQuery();
  const [saveAllAlertsAPI, saveAllAlertsAPIResult] = usePutAllAlertsMutation();
  const { waitlistProductsPreferences, isDefaultProductsStateChanged } = useSelector(selectWaitlistProductsData);
  const [subscriptionsPageProducts, setSubscriptionsPageProducts] = useState<IAlertItemState[]>([]);

  const getAllAlerts = async () => {
    await getAllAlertsAPI({});
  };

  const areAllSubscriptionPagesActive = useMemo(() => subscriptionsPageProducts.every((alert: IAlertItemState) => alert.isSubscribed), [subscriptionsPageProducts]);
  const isUserSubscribedToAnyProducts = useMemo(() => subscriptionsPageProducts.some((alert: IAlertItemState) => alert.isSubscribed), [subscriptionsPageProducts]);

  const changeAlert = (isSubscribed: boolean, alertId: string) => {
    dispatch(changeWaitlistProduct({ alertId, isSubscribed }));
    const findAlertIndex = subscriptionsPageProducts.findIndex((item: IAlertItemState) => item.alertId === alertId);
    setSubscriptionsPageProducts((prev: IAlertItemState[]) => {
      const updatedSubscriptionsPageProducts = [...prev];
      updatedSubscriptionsPageProducts[findAlertIndex] = {
        ...updatedSubscriptionsPageProducts[findAlertIndex],
        isSubscribed,
      };
      return updatedSubscriptionsPageProducts;
    });
  };

  const changeAllAlerts = (isSubscribed: boolean) => {
    dispatch(changeAllWaitlistProducts(isSubscribed));
    setSubscriptionsPageProducts((prev: IAlertItemState[]) => {
      const updatedSubscriptionsPageProducts = prev.map((prevItem: IAlertItemState) => ({
        ...prevItem,
        isSubscribed,
      }));

      return updatedSubscriptionsPageProducts;
    });
  };

  const saveAlerts = async () => {
    await saveAllAlertsAPI(waitlistProductsPreferences);
    getAllAlerts();
  };

  const saveAlert = async (alert: IAlertItem) => {
    await saveAllAlertsAPI([alert]);
  };

  // For /subscriptions page
  const saveUnsubscribedProducts = async () => {
    await saveAllAlertsAPI(UNSUBSCRIBED_PRODUCTS_FOR_SUBSCRIPTIONS);
    getAllAlerts();
  };

  const isAlertChecked = (alertId: string) => {
    const alert = subscriptionsPageProducts.find((alertItem: IAlertItemState) => alertItem.alertId === alertId);
    return alert?.isSubscribed;
  };

  const showInfoModal = (modalType?: ESubscriptionModalType) => {
    if (modalType) {
      dispatch(
        setShowSubscriptionsModal({
          displaySubscriptionsModal: true,
          subscriptionModalType: modalType,
        })
      );
    }
  };

  useEffect(() => {
    if (saveAllAlertsAPIResult?.isSuccess) {
      dispatch(
        setShowSubscriptionsModal({
          displaySubscriptionsModal: true,
          subscriptionModalType: ESubscriptionModalType.SUBSCRIBE,
        })
      );
    }
  }, [saveAllAlertsAPIResult?.isSuccess, dispatch]);

  const filterWaitlistProductsPreferences = useCallback(() => {
    const filteredWaitlistProductsPreferences = waitlistProductsPreferences
      .map((item: IAlertItem) => ({ alertId: item.alertId, isSubscribed: item.isNotifyByEmail || item.isNotifyByPush || item.isNotifyBySms }))
      .filter((filterWaitlistProductsObj) => ![CREDIT_CARDS_ALERT, BUDGET_AND_SAVE_ALERT, TEST_ALERT].includes(filterWaitlistProductsObj.alertId));
    setSubscriptionsPageProducts([...filteredWaitlistProductsPreferences]);
  }, [waitlistProductsPreferences]);

  return {
    getAllAlertsAPIResult,
    getAllAlerts,
    changeAllAlerts,
    changeAlert,
    saveAlerts,
    saveAlert,
    saveAllAlertsAPIResult,
    filterWaitlistProductsPreferences,
    areAllSubscriptionPagesActive,
    subscriptionsPageProducts,
    isUserSubscribedToAnyProducts,
    isAlertChecked,
    showInfoModal,
    isDefaultProductsStateChanged,
    waitlistProductsPreferences,
    saveUnsubscribedProducts,
  };
};
