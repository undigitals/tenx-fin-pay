import React from 'react';
import { useTranslation } from 'react-i18next';
import { SLayout } from './Cards.styles';
import { Card } from './Card/Card';

type TCardsProps = {
  onFeeScheduleClick: () => void;
};

export const Cards = ({ onFeeScheduleClick }: TCardsProps) => {
  const { t } = useTranslation();

  return (
    <SLayout>
      <Card
        title={t('starter.benefits.convenienceAndFlexibility.summary')}
        name="moneyTransferCircle"
        isCollapsible={false}
        bgIconName="moneyTransfer"
        list={[
          <li className="listItemLvl1">{t('starter.benefits.convenienceAndFlexibility.card')}</li>,
          <li className="listItemLvl1">{t('starter.benefits.convenienceAndFlexibility.atms')}</li>,
          <li className="listItemLvl1">{t('starter.benefits.convenienceAndFlexibility.pennyJar')}</li>,
        ]}
      />

      <Card
        title={t('starter.benefits.securityAndControl.summary')}
        name="securityAndControlCircle"
        bgIconName="securityAndControl"
        list={[
          <li className="listItemLvl1">{t('starter.benefits.securityAndControl.fdic')}</li>,
          <li className="listItemLvl1">{t('starter.benefits.securityAndControl.bills')}</li>,
          <li className="listItemLvl1">{t('starter.benefits.securityAndControl.alerts')}</li>,
          <li className="listItemLvl1">{t('starter.benefits.securityAndControl.support')}</li>,
        ]}
      />

      <Card
        title={t('starter.benefits.noSurpriseFees.summary')}
        name="noFeeIconCircle"
        bgIconName="noFee"
        isCollapsedInitially
        list={[
          <li className="listItemLvl1">{t('starter.benefits.noSurpriseFees.balance')}</li>,
          <li className="listItemLvl1">{t('starter.benefits.noSurpriseFees.expenditures')}</li>,
          <li className="listItemLvl1">{t('starter.benefits.noSurpriseFees.atm')}</li>,
          <li className="listItemLvl1">
            <span>
              <span>{t('starter.benefits.noSurpriseFees.extra')}</span>
              <a onClick={onFeeScheduleClick} className="link">
                {t('starter.benefits.noSurpriseFees.feeSchedule')}
              </a>
            </span>
          </li>,
        ]}
      />

      <Card
        title={t('starter.benefits.planningAndBudgetingTools.summary')}
        name="earningsCircle"
        bgIconName="earnings"
        isCollapsedInitially
        list={[
          <li className="listItemLvl1">{t('starter.benefits.planningAndBudgetingTools.money')}</li>,
          <li className="listItemLvl1">{t('starter.benefits.planningAndBudgetingTools.accounts.summary')}</li>,
          <li className="listItemLvl2">{t('starter.benefits.planningAndBudgetingTools.accounts.needs')}</li>,
          <li className="listItemLvl2">{t('starter.benefits.planningAndBudgetingTools.accounts.goals')}</li>,
          <li className="listItemLvl1">{t('starter.benefits.planningAndBudgetingTools.more')}</li>,
        ]}
      />
    </SLayout>
  );
};
