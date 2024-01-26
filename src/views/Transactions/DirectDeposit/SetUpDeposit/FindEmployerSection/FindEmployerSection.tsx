import React, { useState, useEffect } from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { useGetBridgeTokenMutation } from 'store/user/truv/truv.api';
import { ListItem } from 'views/Transactions/DirectDeposit/SetUpDeposit/ListItem/ListItem';
import { TruvBridgeElement } from 'views/Transactions/DirectDeposit/TruvBridge/TruvBridge';
import { SBodyText, SCustomCard, SDivider, SWrapper } from 'views/Transactions/DirectDeposit/SetUpDeposit/SetUpDepositPage.styles';
import { Loader } from 'components/general/Loader/Loader';

export const FindEmployerSection = () => {
  const { t } = useTranslation();
  const [getBridgeToken, getBridgeTokenResult] = useGetBridgeTokenMutation();
  const [openTruv, setOpenTruv] = useState(false);

  const openTruvBridge = () => {
    setOpenTruv(true);
  };

  const closeTruvBridge = () => {
    setOpenTruv(false);
  };

  useEffect(() => {
    getBridgeToken();
  }, []);

  if (getBridgeTokenResult.isLoading) return <Loader />;

  return (
    <SWrapper>
      <SCustomCard>
        <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="B" justifyContent="start" marginBottom={24}>
          {t('setUpDeposit.automatically.Title')}
        </BodyText>

        <ListItem order="1" text={t('setUpDeposit.automatically.LoginToYourEmployer')} />
        <ListItem order="2" text={t('setUpDeposit.automatically.SelectAmount')} />

        <CustomButton preset="primary" onClick={openTruvBridge}>
          {t('setUpDeposit.automatically.FindEmployer')} <Icon name="chevronRight" color="white" size="smaller" marginLeft={10} />
        </CustomButton>
      </SCustomCard>

      <SBodyText textType="bodyText" color="charcoal70" size="T" fontWeight="R" justifyContent="start" marginTop={20} paddingRight={10}>
        {t('setUpDeposit.automatically.TruvDescription')}
      </SBodyText>
      {getBridgeTokenResult.isSuccess && <TruvBridgeElement bridgeToken={getBridgeTokenResult.data.bridge_token} isOpen={openTruv} close={closeTruvBridge} />}

      <div className="autodeposit-footer">
        <SDivider />
        <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" nowrap>
          {t('setUpDeposit.Or')}
        </BodyText>
        <SDivider />
      </div>
    </SWrapper>
  );
};
