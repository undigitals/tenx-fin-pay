import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { Trans, useTranslation } from 'react-i18next';
import { BodyText } from 'components/general/Typography';
import { AMOUNT_LIMITS, AMOUNT_LIMITS_STRING, TRANSACTIONS_COUNT_LIMIT } from 'vars/const/AMOUNT_LIMITS';
import { SMediaLayout } from './InfoModal.styles';

interface IInfoModalProps {
  isModalVisible?: boolean;
  handleOnCancel?: () => void;
}

export const InfoModal: React.FC<IInfoModalProps> = ({ isModalVisible = false, handleOnCancel }) => {
  const { t } = useTranslation();
  return (
    <CustomModal open={isModalVisible} onCancel={handleOnCancel} topPosition="25%" display="flex" closeIconColor="charcoal70">
      <SMediaLayout>
        <BodyText textType="bodyText" font="DM Sans" color="charcoal" size="N" fontWeight="R" marginBottom={5} lineHeight={1.5} paddingRight={15}>
          <Trans
            i18nKey="externalTransfer.TransfersInfo"
            values={{
              amountMax: AMOUNT_LIMITS_STRING.SINGLE_MAX,
              amountMin: AMOUNT_LIMITS_STRING.SINGLE_MIN,
              transactionCountLimit: TRANSACTIONS_COUNT_LIMIT,
              amountDailyMax: AMOUNT_LIMITS_STRING.DAILY_MAX,
              amountWeeklyMax: AMOUNT_LIMITS_STRING.WEEKLY_MAX,
              amount15DayMax: AMOUNT_LIMITS_STRING.DAY_15_MAX,
              amountMonthlyMax: AMOUNT_LIMITS_STRING.MONTHLY_MAX,
            }}
          >
            {`External account transfers are currently limited to ${AMOUNT_LIMITS.SINGLE_MAX} per transaction (with a ${AMOUNT_LIMITS.SINGLE_MIN} minimum).  You may do up to {TRANSACTIONS_COUNT_LIMIT} transfers per month, with a daily limit of ${AMOUNT_LIMITS.DAILY_MAX}; a weekly limit of ${AMOUNT_LIMITS.WEEKLY_MAX}; a 15-day limit of ${AMOUNT_LIMITS.DAY_15_MAX}, and a monthly limit of ${AMOUNT_LIMITS.MONTHLY_MAX}.`}
          </Trans>
        </BodyText>

        <BodyText textType="bodyText" font="DM Sans" color="charcoal" size="N" fontWeight="R" marginBottom={5} lineHeight={1.5} paddingRight={15}>
          {t(`externalTransfer.TransfersInfoNote`)}
        </BodyText>
      </SMediaLayout>
    </CustomModal>
  );
};
