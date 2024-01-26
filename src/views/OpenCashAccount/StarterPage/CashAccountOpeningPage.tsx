import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { images } from 'assets';
import { selectSystemProperties } from 'store/user/authentication.slice';
import { formatPhone } from 'utils/helpers/phone';
import { Title, BodyText } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomDetails } from 'components/theme/CustomDetails/CustomDetails';
import { moneyTransfer, securityAndControl, noFee, earnings } from 'assets/icons';
import { NeedSupportModal } from 'components/general/Modals/NeedSupportModal/NeedSupportModal';
import { useToggle } from 'utils/hooks/useToggle';
import { FeeScheduleModal } from './FeeScheduleModal/FeeScheduleModal';
import { SStarterPage, SWrapper } from './StarterPage.styles';

interface ICashAccountStarterPage {
  handleContinueClick: () => void;
  handleFeeScheduleClick?: () => void;
  hide?: () => void;
  isActive?: boolean;
  isStarterPage: boolean;
}

export const CashAccountOpeningPage: React.FC<ICashAccountStarterPage> = ({ handleContinueClick, handleFeeScheduleClick, isActive, hide, isStarterPage }) => {
  const { t } = useTranslation();

  const needSupportModal = useToggle(false);
  const { supportPhoneNumber } = useSelector(selectSystemProperties);
  const supportTelVal = useMemo(() => `tel:${formatPhone(supportPhoneNumber)}`, [supportPhoneNumber]);

  return (
    <>
      <SStarterPage isStarterPage={!isStarterPage}>
        <img src={images.cashAccountStarted} alt="depositAccountsModal" />
        <Title fontWeight="SB" size="M" font="Poppins" textAlign="start" color="charcoal" marginBottom={15}>
          {t('starter.heading')}
        </Title>
        <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="M" color="charcoal70" lineHeight={1.5} marginBottom={16} paddingRight={5}>
          {t('starter.welcome')}
        </BodyText>
        <section className="benefits">
          <BodyText textType="bodyText" font="DM Sans" fontWeight="B" size="M" color="charcoal" marginBottom={35}>
            {t('starter.benefits.heading')}
          </BodyText>
          <div className={`list ${!isStarterPage ? 'listColoredBorder' : ''}`}>
            <SWrapper>
              <CustomDetails summary={t('starter.benefits.convenienceAndFlexibility.summary')} summaryIconURL={moneyTransfer}>
                <ul className="benefit">
                  <li>
                    <span>{t('starter.benefits.convenienceAndFlexibility.card')}</span>
                  </li>
                  <li>
                    <span>{t('starter.benefits.convenienceAndFlexibility.atms')}</span>
                  </li>
                  <li>
                    <span>{t('starter.benefits.convenienceAndFlexibility.pennyJar')}</span>
                  </li>
                </ul>
              </CustomDetails>
            </SWrapper>
            <SWrapper>
              <CustomDetails summary={t('starter.benefits.securityAndControl.summary')} summaryIconURL={securityAndControl}>
                <ul className="benefit">
                  <li>
                    <span>{t('starter.benefits.securityAndControl.fdic')}</span>
                  </li>
                  <li>
                    <span>{t('starter.benefits.securityAndControl.bills')}</span>
                  </li>
                  <li>
                    <span>{t('starter.benefits.securityAndControl.alerts')}</span>
                  </li>
                  <li>
                    <span>{t('starter.benefits.securityAndControl.support')}</span>
                  </li>
                </ul>
              </CustomDetails>
            </SWrapper>
            <SWrapper>
              <CustomDetails summary={t('starter.benefits.noSurpriseFees.summary')} summaryIconURL={noFee}>
                <ul className="benefit">
                  <li>
                    <span>{t('starter.benefits.noSurpriseFees.balance')}</span>
                  </li>
                  <li>
                    <span>{t('starter.benefits.noSurpriseFees.expenditures')}</span>
                  </li>
                  <li>
                    <span>{t('starter.benefits.noSurpriseFees.atm')}</span>
                  </li>
                  <li>
                    {isStarterPage ? (
                      <>
                        <span>{t('starter.benefits.noSurpriseFees.extra')}</span>
                        <a onClick={handleFeeScheduleClick}>{t('starter.benefits.noSurpriseFees.feeSchedule')}</a>
                      </>
                    ) : (
                      <span>{t('starter.benefits.noSurpriseFees.alternative')}</span>
                    )}
                  </li>
                </ul>
              </CustomDetails>
            </SWrapper>
            <SWrapper>
              <CustomDetails summary={t('starter.benefits.planningAndBudgetingTools.summary')} summaryIconURL={earnings}>
                <ul className="benefit">
                  <li>
                    <span>{t('starter.benefits.planningAndBudgetingTools.money')}</span>
                  </li>
                  <li>
                    <span>{t('starter.benefits.planningAndBudgetingTools.accounts.summary')}</span>
                    <ul>
                      <li>
                        <span>{t('starter.benefits.planningAndBudgetingTools.accounts.needs')}</span>
                      </li>
                      <li>
                        <span>{t('starter.benefits.planningAndBudgetingTools.accounts.goals')}</span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>{t('starter.benefits.planningAndBudgetingTools.more')}</span>
                  </li>
                </ul>
              </CustomDetails>
            </SWrapper>
          </div>
        </section>
        <CustomButton preset="primary" size="large" onClick={handleContinueClick}>
          {t('starter.continue')}
        </CustomButton>
        <section className="help" onClick={needSupportModal.show}>
          <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="L" justifyContent="center" marginBottom={17}>
            {t('accountOpening.Need help?')}
          </BodyText>
          <address>
            <a href={supportTelVal}>{supportPhoneNumber}</a>
          </address>
        </section>
        <footer>
          <BodyText textType="bodyText" color="charcoal70" size="T" fontWeight="R" textAlign="start">
            {t('starter.legal')}
          </BodyText>
        </footer>
      </SStarterPage>
      {isActive && hide ? <FeeScheduleModal isActive={isActive} hide={hide} /> : null}

      <NeedSupportModal open={needSupportModal.isActive} onClose={needSupportModal.hide} />
    </>
  );
};
