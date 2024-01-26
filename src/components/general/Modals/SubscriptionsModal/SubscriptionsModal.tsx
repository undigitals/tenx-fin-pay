import React from 'react';
import { useAppDispatch } from 'utils/hooks/store';
import { setShowSubscriptionsModal, selectDisplaySubscriptionsModal, selectSubscriptionsModalType, selectSubscriptionAdditional } from 'store/ui.slice';
import { useSelector } from 'react-redux';
import { images } from 'assets';
import { CashAccountOpeningPage } from 'views/OpenCashAccount/StarterPage/CashAccountOpeningPage';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { PaidAsYouGoContent } from './PaidAsYouGo/PaidAsYouGoContent';
import { InternationalTransferContent } from './InternationalTransfer/InternationalTransferContent';
import { CreditCardsContent } from './CreditCards/CreditCardsContent';
import { ConnectAndShareContent } from './ConnectAndShare/ConnectAndShareContent';
import { SUBSCRIPTION_MODAL_TEXT } from './SubscriptionsModalConstants';
import { SModal } from './SubscriptionsModal.styles';

export const SubscriptionsModal = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isModalVisible = useSelector(selectDisplaySubscriptionsModal);
  const modalType = useSelector(selectSubscriptionsModalType);
  const subscriptionAdditional = useSelector(selectSubscriptionAdditional);
  const isConnectContent = subscriptionAdditional?.contentPreset === 'CONNECT';

  const handleOnCancel = () => {
    dispatch(setShowSubscriptionsModal({ displaySubscriptionsModal: false }));
  };

  return (
    <SModal
      className={modalType}
      open={isModalVisible}
      onCancel={handleOnCancel}
      padding="24px 17px"
      topPosition={modalType !== 'subscribe' ? '5%' : '10%'}
      closeIconColor="charcoal70"
      bodyStyle={{ overflowY: 'auto', height: '95%' }}
      isFullHeight={modalType !== 'subscribe'}
    >
      {modalType === 'subscribe' && (
        <>
          <div className="subscribe-image">
            <img src={images.success} alt="Successful subscription" />
          </div>
          <Title marginBottom={10} marginTop={32} justifyContent="start" textAlign="center" fontWeight="M" size="M">
            {t('inviteEarn.ThankYou!')}
          </Title>
          {isConnectContent ? (
            <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" textAlign="start" justifyContent="start" marginTop={8}>
              {t(SUBSCRIPTION_MODAL_TEXT.KEEP_AN_EYE_OUT_FOR_PERCAPITA_COMMUNITY)}
            </BodyText>
          ) : (
            <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" textAlign="start" justifyContent="start" marginTop={8}>
              {t(SUBSCRIPTION_MODAL_TEXT.DEFAULT)}
            </BodyText>
          )}
          <CustomButton preset="primary" onClick={handleOnCancel}>
            {t(`myInfo.Continue`)}
          </CustomButton>
        </>
      )}
      {modalType === 'deposit' && <CashAccountOpeningPage handleContinueClick={handleOnCancel} isStarterPage={false} />}
      {modalType === 'paid' && <PaidAsYouGoContent />}
      {modalType === 'international' && <InternationalTransferContent />}
      {modalType === 'creditCard' && <CreditCardsContent />}
      {modalType === 'connect' && <ConnectAndShareContent />}
    </SModal>
  );
};
