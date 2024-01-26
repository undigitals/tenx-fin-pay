import React, { useMemo } from 'react';
import { usePayments } from 'utils/hooks/usePayments';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setShowTenxPayModal } from 'store/ui.slice';
import { getFormattedDateFromString } from 'utils/helpers/dateHelpers';
import clsx from 'clsx';
import { differenceInDays } from 'date-fns';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { STenxPayMain } from './TenxPayMain.styles';

interface ITenxPayMainProps {
  isActive?: boolean;
  isCollapsed?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  canDisablePrimaryButton?: boolean;
  onPrimaryButtonClick: () => void;
}

export const TenxPayMain = ({ isActive = true, isCollapsed, primaryButtonText, secondaryButtonText, canDisablePrimaryButton, onPrimaryButtonClick }: ITenxPayMainProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { paymentsInfo, getPaymentsInfoQueryResult } = usePayments();
  const dispatch = useDispatch();

  const daysToNextPayCycle = useMemo(() => {
    if (!paymentsInfo.earnCicleEndDate) {
      return 0;
    }
    return differenceInDays(new Date(paymentsInfo.earnCicleEndDate), new Date());
  }, [paymentsInfo]);

  const onSecondaryButtonClick = () => {
    navigate(ROUTES.tenxPayHistory.path, { state: 1 });
  };

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (isCollapsed) {
      navigate(ROUTES.tenxPayHome.path);
    }
  };

  const handleAvailableAmountInfoClick = () => {
    dispatch(setShowTenxPayModal({ displayTenxPayModal: true, tenxPayModalType: 'earned' }));
  };

  const payPeriodStart = paymentsInfo.earnCicleStartDate ? getFormattedDateFromString(paymentsInfo.earnCicleStartDate) : null;
  const payPeriodEnd = paymentsInfo.earnCicleEndDate ? getFormattedDateFromString(paymentsInfo.earnCicleEndDate) : null;

  const isPrimaryButtonDisabled = (canDisablePrimaryButton && paymentsInfo.availableNow <= 0) || !isActive;

  return (
    /*
     * TODO: This `onClick` is an accessibility failure. Clicking non-focusable elements such as `<div>`s must never be
     * the only way to perform an action (which is the case for the `<TenxPayMain>` instance on `<HomePage>`
     * since clicking on the primary button on that page does not lead a user to the Tenx Pay home screen but clicking
     * on the card itself does) since such functionality cannot be accessed by assistive technologies. The UI/UX team should be
     * made aware of this and come up with a proper solution that would be accessible to all users.
     */
    <STenxPayMain className="tenx-pay-main" onClick={handleCardClick}>
      {paymentsInfo.earnedThisCycle !== undefined && paymentsInfo.availableNow !== undefined && (
        <dl className="balance">
          <div>
            <dt className="available">
              <span>{t('tenxPayHome.Available Today')}</span>
              <button type="button" onClick={handleAvailableAmountInfoClick}>
                <span>View info</span>
              </button>
            </dt>
            <dd>
              <CustomAmount amount={paymentsInfo.availableNow} color="charcoal" size="large" align="left" multiSizable remainingSize="xl" remainingWeight={600} />
            </dd>
          </div>
          <div>
            <dt className="earned">
              <div>{t('tenxPayHome.Earned this pay period')}</div>
              <div>{payPeriodStart && payPeriodEnd && ` (${payPeriodStart} - ${payPeriodEnd})`}</div>
            </dt>
            <dd>
              <CustomAmount amount={paymentsInfo.earnedThisCycle} color="charcoal30" size="large" align="left" multiSizable remainingSize="xl" remainingWeight={600} />
            </dd>
          </div>
        </dl>
      )}
      <div className={clsx('actions', isCollapsed && 'collapsed')}>
        <div className="buttons">
          <button type="button" className="new secondary outlined small" onClick={onSecondaryButtonClick}>
            {secondaryButtonText}
          </button>
          <button type="button" className="new primary small" onClick={onPrimaryButtonClick} disabled={isPrimaryButtonDisabled}>
            {primaryButtonText}
          </button>
        </div>
        <small
          className={clsx(
            'pay-period-days-left',
            !!daysToNextPayCycle && 'several',
            !daysToNextPayCycle && getPaymentsInfoQueryResult.isError && 'error',
            !daysToNextPayCycle && !getPaymentsInfoQueryResult.isError && 'last'
          )}
        >
          {!!daysToNextPayCycle && (
            <>
              <span>{daysToNextPayCycle}</span> {t('tenxPayHome.days left to next pay period')}
            </>
          )}
          {!daysToNextPayCycle && getPaymentsInfoQueryResult.isError && 'No data available'}
          {!daysToNextPayCycle && !getPaymentsInfoQueryResult.isError && t('tenxPayHome.LastDayOfPayPeriod')}
        </small>
      </div>
    </STenxPayMain>
  );
};
