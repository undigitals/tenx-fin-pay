import React from 'react';
import isBefore from 'date-fns/isBefore';
import { useTranslation, Trans } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { useSelector } from 'react-redux';
import { selectDisplayTenxPayModal, setShowTenxPayModal } from 'store/ui.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { usePayments } from 'utils/hooks/usePayments';
import { SAmountText } from './TenxPayModal.styles';

export const TenxPayModal: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { displayTenxPayModal, tenxPayModalType } = useSelector(selectDisplayTenxPayModal);
  const { paymentsInfo } = usePayments();
  const payPeriod = Number(paymentsInfo.maxPayPeriodTransactionsCount) - Number(paymentsInfo.transfersAvailable);

  const onCancel = () => dispatch(setShowTenxPayModal({ displayTenxPayModal: false }));
  const DAILY_PAY_LIMIT = 250;
  const isPayAvailable = tenxPayModalType === 'earned' && Number(paymentsInfo.availableNow) <= DAILY_PAY_LIMIT;

  const submitByDate = new Date(paymentsInfo.submitByDate ?? '');
  const endDate = new Date(paymentsInfo.earnCicleEndDate ?? '');
  const hasAvailableTransfers = paymentsInfo.transfersAvailable ? paymentsInfo.transfersAvailable > 0 : false;
  const isPeriodClosed = isBefore(submitByDate, new Date()) && isBefore(submitByDate, endDate);

  return (
    <CustomModal open={displayTenxPayModal} onCancel={onCancel} topPosition="19.5%" closeIconColor="charcoal70">
      {isPayAvailable && (
        <>
          <Title font="Poppins" color="charcoal" marginBottom={16} marginTop={15} fontWeight="M" size="M" extraStyles={{ paddingRight: '15px' }}>
            {t('tenxPayEarnedModal.Title')}
          </Title>

          <BodyText lineHeight={1.4} textType="bodyText" size="N" fontWeight="R" color="charcoal70" marginBottom={16}>
            <Trans
              i18nKey="tenxPayEarnedModal.EarnedTotal"
              values={{
                earnedThisCycle: paymentsInfo?.earnedThisCycle,
              }}
              components={{ strong: <strong style={{ color: '#353131' }} /> }}
            />

            {hasAvailableTransfers && (
              <Trans
                i18nKey="tenxPayEarnedModal.Available"
                values={{
                  availableNow: paymentsInfo?.availableNow,
                }}
                components={{ strong: <strong style={{ color: '#353131' }} /> }}
              />
            )}
            {!hasAvailableTransfers && isPeriodClosed && t('tenxPayHome.Of that, a total of $0... because pay period is already closed.')}
            {!hasAvailableTransfers && !isPeriodClosed && t('tenxPayHome.Of that, a total of $0... because you have already maxed out...')}
          </BodyText>

          <BodyText lineHeight={1.4} textType="bodyText" size="N" fontWeight="R" color="charcoal70" marginBottom={16}>
            <Trans
              i18nKey="tenxPayEarnedModal.YouAreLimited"
              values={{
                limit: DAILY_PAY_LIMIT,
              }}
              components={{ strong: <strong style={{ color: '#353131' }} /> }}
            />
          </BodyText>

          <BodyText lineHeight={1.4} textType="bodyText" size="N" fontWeight="R" color="charcoal70">
            {t('tenxPayEarnedModal.IfYouDontMakeRequest')}
          </BodyText>
        </>
      )}

      {tenxPayModalType === 'earned' && Number(paymentsInfo?.availableNow) > DAILY_PAY_LIMIT && Number(paymentsInfo?.transfersAvailable) > 0 && (
        <>
          <Title font="Poppins" color="charcoal" marginBottom={16} marginTop={15} fontWeight="M" size="M" extraStyles={{ paddingRight: '15px' }}>
            {t('tenxPayHome.Amount Available')}
          </Title>

          <BodyText lineHeight={1.4} textType="bodyText" size="N" fontWeight="R" color="charcoal70" marginBottom={16}>
            {/* prettier-ignore */}
            <Trans
              i18nKey="tenxPayHome.You have earned..."
              values={{
                earnedThisCycle: paymentsInfo?.earnedThisCycle,
                availableNow: paymentsInfo?.availableNow,
              }}
            >
              {/* eslint-disable-next-line */}
              You have earned <SAmountText>${paymentsInfo?.earnedThisCycle}</SAmountText> so far this pay period.
            </Trans>
            {/* prettier-ignore */}
            <Trans
                i18nKey="tenxPayHome.Of that, a total of is available..."
                values={{
                  availableNow: paymentsInfo?.availableNow,
                }}
            >
              {/* eslint-disable-next-line */}
              Of that, a total of <SAmountText>{paymentsInfo?.availableNow}</SAmountText> is available to request now through Tenx Pay.
            </Trans>
          </BodyText>

          <BodyText lineHeight={1.4} textType="bodyText" size="N" fontWeight="R" color="charcoal70" marginBottom={16}>
            {/* prettier-ignore */}
            <Trans i18nKey="tenxPayHome.Individual Tenx Pay requests are capped. You can...">
              {/* eslint-disable-next-line */}
              Individual Tenx Pay requests are capped at <SAmountText>{DAILY_PAY_LIMIT}</SAmountText>. You can request up to <SAmountText>{paymentsInfo?.availableMax}</SAmountText> right now. The remaining <SAmountText>{paymentsInfo?.remainingAmount}</SAmountText> will be available for future requests during this pay period.
            </Trans>
          </BodyText>

          <BodyText lineHeight={1.4} textType="bodyText" size="N" fontWeight="R" color="charcoal70">
            {t('tenxPayHome.You can make up to two transfers...')}
          </BodyText>
        </>
      )}

      {tenxPayModalType === 'payPeriod' && (
        <>
          <Title font="Poppins" color="charcoal" marginBottom={16} marginTop={15} fontWeight="M" size="M">
            {t('tenxPayHome.So far this pay period')}
          </Title>

          <BodyText lineHeight={1.4} textType="bodyText" size="N" fontWeight="R" color="charcoal70" marginBottom={16}>
            <Trans
              i18nKey="tenxPayHome.You can make up to ..."
              values={{
                maxPayPeriodTransactionsCount: paymentsInfo?.maxPayPeriodTransactionsCount,
                payPeriod,
                transfersAvailable: paymentsInfo?.transfersAvailable,
              }}
            >
              You can make up to <SAmountText>{paymentsInfo?.maxPayPeriodTransactionsCount}</SAmountText> requests per pay period. You have made
              <SAmountText>{payPeriod}</SAmountText> requests so far this period, so you have
              <SAmountText>{paymentsInfo?.transfersAvailable}</SAmountText> remaining.
            </Trans>
          </BodyText>

          <BodyText lineHeight={1.4} textType="bodyText" size="N" fontWeight="R" color="charcoal70">
            {/* prettier-ignore */}
            <Trans
              i18nKey="tenxPayHome.You have already requested..."
              values={{
                transferredAmount: paymentsInfo?.transferredAmount,
              }}
            >
              You have already requested and received <SAmountText>{paymentsInfo?.transferredAmount}</SAmountText> this pay period. This amount has already been taken out of the amount available to you
            </Trans>
          </BodyText>
        </>
      )}

      {tenxPayModalType === 'amountRequested' && (
        <>
          <Title font="Poppins" color="charcoal" marginBottom={16} marginTop={4} fontWeight="M" size="M" extraStyles={{ paddingRight: '15px' }}>
            {t('tenxPayHome.How does requested amount work?')}
          </Title>

          <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70">
            {t('tenxPayHome.This is the amount you requested...')}
          </BodyText>
        </>
      )}

      {tenxPayModalType === 'CardVsAccount' && (
        <>
          <Title font="Poppins" color="charcoal" marginBottom={16} marginTop={15} fontWeight="M" size="M" extraStyles={{ paddingRight: '15px' }}>
            {t('tenxPayHome.CardVsAccount')}
          </Title>

          <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal70" lineHeight={1.5} marginBottom={22}>
            <Trans i18nKey="tenxPayHome.If you enter your debit card credentials ...">
              {/* prettier-ignore */}
              If you enter your <SAmountText>debit card</SAmountText> credentials, your money will be pushed to your card and the money will be <SAmountText>available in minutes</SAmountText>.
            </Trans>
          </BodyText>

          <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal70" lineHeight={1.5}>
            {/* prettier-ignore */}
            <Trans i18nKey="tenxPayHome.If you choose to use your bank account ...">
              If you choose to use your <SAmountText>bank account</SAmountText> by inputting your bank&apos;s routing number and account number, your money will be sent to your account via ACH, which
              may <SAmountText>take 2-3 days</SAmountText>.
            </Trans>
          </BodyText>
        </>
      )}
    </CustomModal>
  );
};
