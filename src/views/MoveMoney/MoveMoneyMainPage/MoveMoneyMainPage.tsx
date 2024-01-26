import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title } from 'components/general/Typography';
import { ROUTES } from 'vars/const/ROUTES';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPolicies } from 'store/user/authentication.slice';
import { useLazyCheckFreeQuery } from 'store/user/users.api';
import { Loader } from 'components/general/Loader/Loader';
import { mobileApiCall } from 'services/mobileService';
import { Card } from './Card/Card';
import { SLayout, SCircle, SIcon } from './MoveMoneyMainPage.style';
import { IFrameModal } from './IFrameModal';

export const MoveMoneyMainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const policies = useSelector(selectPolicies);
  const { CheckCashingEnabled } = policies ?? {};
  const [checkFreeApi, { isLoading }] = useLazyCheckFreeQuery();
  const [iFrameUrl, setIFrameUrl] = useState('');
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [iFrameIsLoading, setIFrameIsLoading] = useState(true);

  const payBillClickHandler = async () => {
    checkFreeApi()
      .unwrap()
      .then((res) => {
        setIsIframeOpen(true);
        setIFrameUrl(res.url);
      });
  };

  const handleCloseIframe = () => {
    setIsIframeOpen(false);
    setIFrameUrl('');
  };

  return (
    <SLayout>
      <Title size="S" color="charcoal" fontWeight="SB" font="Poppins" marginBottom={16}>
        {t('moveMoney.AddReceiveMoney')}
      </Title>
      <Card
        title={t('moveMoney.ExternalAccountTransfer')}
        isComingSoon={!policies?.ExternalTransferEnabled}
        route={ROUTES.addMoney.path}
        subtitle={t('moveMoney.MeToMe')}
        icon={
          <SCircle>
            <SIcon name="externalAccount" color="blue" />
          </SCircle>
        }
      />
      <Card
        title={t('moveMoney.DirectDepositSetup')}
        subtitle={t('moveMoney.EmployerGovBenefits')}
        onClick={() => navigate(ROUTES.setUpDeposit.path)}
        icon={
          <SCircle>
            <SIcon name="pennyJar" color="blue" />
          </SCircle>
        }
      />
      <Card
        title={t('moveMoney.MobileCheck')}
        isComingSoon={!CheckCashingEnabled}
        onClick={() => mobileApiCall('openCheckCashing')}
        icon={
          <SCircle>
            <SIcon name="checkCaptured" color="blue" />
          </SCircle>
        }
      />

      <Title size="S" color="charcoal" fontWeight="SB" font="Poppins" marginTop={32} marginBottom={16}>
        {t('moveMoney.SendPayMoney')}
      </Title>
      <Card
        title={t('moveMoney.ExternalAccountTransfer')}
        isComingSoon={!(policies?.ExternalTransferEnabled && policies?.ExternalTransferSendEnabled)}
        subtitle={t('moveMoney.MeToMe')}
        route={ROUTES.sendMoneyPage.path}
        icon={
          <SCircle>
            <SIcon name="externalTransfer" color="blue" />
          </SCircle>
        }
      />
      <Card
        title={t('moveMoney.BillPayCheckSend')}
        isComingSoon={!policies?.BillPayEnabled}
        onClick={payBillClickHandler}
        icon={
          <SCircle>
            <SIcon name="depositChecks" color="blue" />
          </SCircle>
        }
      />
      <Card
        title={t('moveMoney.InternationalTransfer')}
        isComingSoon
        icon={
          <SCircle>
            <SIcon name="internationalRemittance" color="blue" />
          </SCircle>
        }
      />

      <Title size="S" color="charcoal" fontWeight="SB" font="Poppins" marginTop={32} marginBottom={16}>
        {t('moveMoney.GetCash')}
      </Title>
      <Card
        title={t('moveMoney.AtmLocator')}
        onClick={() => navigate(ROUTES.atmLocations.path)}
        isComingSoon={!policies?.ATMLocationEnabled}
        icon={
          <SCircle>
            <SIcon name="atmWithdrawal" color="blue" />
          </SCircle>
        }
        last
      />

      {isLoading && <Loader />}
      <IFrameModal iFrameUrl={iFrameUrl} isIframeOpen={isIframeOpen} handleCloseIframe={handleCloseIframe} iFrameIsLoading={iFrameIsLoading} setIFrameIsLoading={setIFrameIsLoading} />
    </SLayout>
  );
};
