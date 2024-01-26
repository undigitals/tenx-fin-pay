import React from 'react';
import { Trans } from 'react-i18next';

export const tableData = [
  {
    fee: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.monthlyFee" />,
    amount: '$3.00',
  },
  {
    fee: (
      <>
        <div style={{ marginBottom: 10 }}>
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.atmWithdrawalFee" />
        </div>

        <div>
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.inNetwork" />
        </div>
      </>
    ),
    amount: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.noFee" />,
  },
  {
    fee: (
      <>
        <div style={{ marginBottom: 10 }}>
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.atmWithdrawalFee" />
        </div>

        <div>
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.outOfNetwork" />
        </div>
      </>
    ),
    amount: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.noFee" />,
  },
  {
    fee: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.ATMBalanceInquiry" />,
    amount: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.noFee" />,
  },
  {
    fee: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.overdraftFee" />,
    amount: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.noFee" />,
  },
  {
    fee: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.foreignTransactionFee" />,
    amount: '1%',
  },
  {
    fee: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.stopPayment" />,
    amount: '$15.00',
  },
  {
    fee: (
      <>
        <div>
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.replacementCard" />
        </div>

        <div>
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.standardShipping" />
        </div>
      </>
    ),
    amount: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.noFee" />,
  },
  {
    fee: (
      <>
        <div>
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.replacementCard" />
        </div>

        <div>
          <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.expeditedShipping" />
        </div>
      </>
    ),
    amount: '$20.00',
  },
];
