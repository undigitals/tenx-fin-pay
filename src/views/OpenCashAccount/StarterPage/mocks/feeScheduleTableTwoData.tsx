import React from 'react';
import { Trans } from 'react-i18next';

export const tableData = [
  {
    fee: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.mobileCheckCapture" />,
    amount: (
      <>
        <div style={{ marginBottom: 10 }}>
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.moneyIn10Days" />
          <br />
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.noFeeStrong" components={{ 1: <b /> }} />
        </div>

        <div>
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.MoneyInMinutes" />
          <br />
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.checkAmountForPayroll" />
          <br />
        </div>
      </>
    ),
  },
];
