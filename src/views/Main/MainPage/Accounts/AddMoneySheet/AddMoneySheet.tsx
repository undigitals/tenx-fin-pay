import { BodyText, Title } from 'components/general/Typography';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'vars/const/ROUTES';
import { useSelector } from 'react-redux';
import { selectDisplayAddMoneySheet, setShowAddMoneySheet } from 'store/ui.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { OptionItem } from './OptionItem/OptionItem';

export const AddMoneySheet: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isOpen = useSelector(selectDisplayAddMoneySheet);

  const handleOnClose = () => {
    dispatch(setShowAddMoneySheet(false));
  };

  return (
    <CustomSheet isOpen={isOpen} header={false} height="auto" wrapperPadding={false} onClose={handleOnClose}>
      <Title fontWeight="SB" size="S" marginBottom={8} justifyContent="start">
        {t('addMoney.Title')}
      </Title>

      <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" justifyContent="start" marginBottom={32}>
        {t('addMoney.Description')}
      </BodyText>

      <OptionItem iconName="externalAccount" title={t('addMoney.UsingOutsideAccount')} to={ROUTES.addMoney.path} externalTransfer />
      <OptionItem iconName="pennyJar" title={t('addMoney.BySettingDeposit')} to={ROUTES.setUpDeposit.path} />
    </CustomSheet>
  );
};
