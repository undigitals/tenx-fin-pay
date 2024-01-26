import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Title, BodyText } from 'components/general/Typography';
import { IThirdParty } from 'store/user/accounts/accounts.types';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { useDeleteThirdPartyAccountMutation, useLazyGetThirdPartyDataQuery } from 'store/user/accounts/accounts.api';
import { Loader } from 'components/general/Loader/Loader';
import { handleError } from 'utils/helpers/errorHelper';
import { useToggle } from 'utils/hooks/useToggle';
import { SLayout } from './MoneySection.style';
import { ConfirmRemoveModal } from './ConfirmRemoveModal';

interface IMoneySectionProps {
  items: IThirdParty[];
  isSendType: boolean;
}
export const MoneySection: React.FC<IMoneySectionProps> = ({ items, isSendType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deleteThirdPartyAccountAPI, deleteThirdPartyAccountAPIResult] = useDeleteThirdPartyAccountMutation();
  const [getThirdPartyDataAPI, getThirdPartyDataAPIResult] = useLazyGetThirdPartyDataQuery();
  const confirmRemove = useToggle();

  const handleAccountClick = (selectedExternalAccountId: string) => {
    navigate(isSendType ? ROUTES.sendFunds.path : ROUTES.addFunds.path, { state: { selectedExternalAccountId } });
  };

  const onRemoveClick = (accountId: string) => {
    confirmRemove.setData(accountId);
    confirmRemove.show();
  };

  const handleRemove = (selectedExternalAccountId: string) => {
    deleteThirdPartyAccountAPI(selectedExternalAccountId);
    confirmRemove.hide();
    confirmRemove.setData(null);
  };

  const handleCloseModal = () => {
    confirmRemove.hide();
    confirmRemove.setData(null);
  };

  useEffect(() => {
    if (deleteThirdPartyAccountAPIResult.isSuccess) {
      getThirdPartyDataAPI({});
    }

    if (deleteThirdPartyAccountAPIResult.isError) {
      handleError(deleteThirdPartyAccountAPIResult.error);
    }
  }, [deleteThirdPartyAccountAPIResult]);

  if (deleteThirdPartyAccountAPIResult.isLoading || getThirdPartyDataAPIResult.isLoading) return <Loader />;

  return (
    <SLayout>
      <Title size="S" fontWeight="SB" color="charcoal" marginBottom={15}>
        {t('moveMoney.SelectExternalAccount')}
      </Title>
      <BodyText textType="bodyText" color="charcoal60" fontWeight="SM" size="M" font="DM Sans" marginBottom={32}>
        {t('moveMoney.SelectAccountToUse')}
      </BodyText>

      {items.map((item: IThirdParty) => (
        <CustomCard cursorPointer marginBottom={16} key={item.id} borderRadius={20}>
          <CustomRow justifyContent="space-between" gap={10}>
            <div onClick={() => handleAccountClick(item.id)}>
              <BodyText textType="bodyText" size="M" fontWeight="B" color="charcoal" display="inline" marginRight={10} cursorPointer>
                {item.externalDisplayAccountName}
              </BodyText>
              <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal70" display="inline" nowrap cursorPointer>
                {item.externalDisplayAccountNumber ? `(${item.externalDisplayAccountNumber})` : item.issuingNetwork}
              </BodyText>
            </div>

            <BodyText textType="bodyText" size="T" fontWeight="B" cursorPointer color="charcoal70" onClick={() => onRemoveClick(item.id)} nowrap>
              {t('moveMoney.Remove')}
            </BodyText>
          </CustomRow>
        </CustomCard>
      ))}

      <ConfirmRemoveModal isOpen={confirmRemove.isActive} onClose={handleCloseModal} remove={() => handleRemove((confirmRemove.data as string) || '')} />
    </SLayout>
  );
};
