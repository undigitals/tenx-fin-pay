import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { useLazyGetThirdPartyDataQuery } from 'store/user/accounts/accounts.api';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { AddNewSourceSection } from './AddNewSourceSection/AddNewSourceSection';
import { MoneySection } from './MoneySection/MoneySection';
import { SLayout } from './NewSourceAndFunds.styles';

interface INewSourceAndFundsProps {
  isSendType?: boolean;
}
export const NewSourceAndFunds: React.FC<INewSourceAndFundsProps> = ({ isSendType = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { thirdPartyData } = useSelector(selectAccountsData);
  const [getThirdPartyData] = useLazyGetThirdPartyDataQuery();

  useEffect(() => {
    window.onpopstate = () => {
      if (location?.state?.isFromModal) {
        navigate(ROUTES.home.path);
      }
    };
  }, [navigate, location]);

  useEffect(() => {
    getThirdPartyData({});
  }, [getThirdPartyData]);

  return (
    <SLayout>
      <div>
        {thirdPartyData.length > 0 && <MoneySection items={thirdPartyData} isSendType={isSendType} />}
        <AddNewSourceSection noAccounts={thirdPartyData.length === 0} />
      </div>

      <div className="sutton-disclaimer-note">
        <SuttonDisclaimerNote isForExternalTransfer={thirdPartyData.length === 0} />
      </div>
    </SLayout>
  );
};
