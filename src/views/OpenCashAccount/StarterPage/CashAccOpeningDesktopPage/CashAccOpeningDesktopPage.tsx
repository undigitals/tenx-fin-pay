import React, { useMemo } from 'react';
import cashAccountStartedV2 from 'assets/images/cashAccountStartedV2.svg';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { ROUTES } from 'vars/const/ROUTES';
import { FeeScheduleModal } from 'views/OpenCashAccount/StarterPage/FeeScheduleModal/FeeScheduleModal';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useSelector } from 'react-redux';
import { formatPhone } from 'utils/helpers/phone';
import { selectSystemProperties } from 'store/user/authentication.slice';
import dottesInAngle from 'assets/images/dottesInAngle.svg';
import { SLayout } from './CashAccOpeningDesktopPage.styles';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';
import { Cards } from './Cards/Cards';

export type TBreadcrumbsPath = {
  id: number;
  name: string;
  path?: string;
};

interface ICashAccountStarterPage {
  onContinueClick: () => void;
  onFeeScheduleClick: () => void;
  hide?: () => void;
  isActive?: boolean;
}

const pathList: TBreadcrumbsPath[] = [
  { id: 0, name: ROUTES.home.title, path: ROUTES.home.path },
  { id: 1, name: ROUTES.myAccountAccounts.title },
];

export const CashAccOpeningDesktopPage: React.FC<ICashAccountStarterPage> = ({ onContinueClick, onFeeScheduleClick, isActive, hide }) => {
  const { t } = useTranslation();

  const { supportPhoneNumber } = useSelector(selectSystemProperties);
  const supportTelVal = useMemo(() => `tel:${formatPhone(supportPhoneNumber)}`, [supportPhoneNumber]);

  return (
    <>
      <SLayout bgFooterImage={dottesInAngle}>
        <Breadcrumbs paths={pathList} />

        <header className="header">
          <section className="titleContainer">
            <Title fontWeight="M" size="L" font="Poppins" textAlign="start" color="charcoal" marginBottom={15}>
              {t('starter.heading')}
            </Title>

            <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="N" color="charcoal70" lineHeight={1.4} marginBottom={16} paddingRight={5}>
              {t('starter.welcome')}
            </BodyText>
          </section>

          <div className="imageContainer">
            <img src={cashAccountStartedV2} alt="cash account start" width="228px" />
          </div>
        </header>

        <section className="content">
          <BodyText textType="bodyText" fontWeight="B" size="M" color="charcoal" font="Poppins" textAlign="start" marginBottom={20} extraStyles={{ width: '100%' }}>
            {t('starter.benefits.heading')}
          </BodyText>

          <Cards onFeeScheduleClick={onFeeScheduleClick} />
        </section>

        <section className="help">
          <CustomButton preset="primary" onClick={onContinueClick}>
            {t('starter.continue')}
          </CustomButton>

          <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="L" justifyContent="center" marginBottom={17}>
            {t('accountOpening.Need help?')}
          </BodyText>

          <address>
            <a href={supportTelVal}>{supportPhoneNumber}</a>
          </address>
        </section>

        <footer>
          <BodyText textType="bodyText" color="charcoal70" size="S" fontWeight="R" textAlign="start">
            {t('starter.legal')}
          </BodyText>
        </footer>
      </SLayout>

      {isActive && hide ? <FeeScheduleModal isActive={isActive} hide={hide} /> : null}
    </>
  );
};
