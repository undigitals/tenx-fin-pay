import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { BodyText } from 'components/general/Typography';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { IconSign } from 'components/general/Icon/IconSign';
import { TIconName } from 'components/general/Icon/Icon.types';

interface IListItem {
  amount: number;
  fee: number;
  accountNickName: string;
  accountType: string;
  icon: TIconName;
  first?: boolean;
  last?: boolean;
  additionalData: any;
}

export const ListItem: React.FC<IListItem> = ({ icon, accountNickName, accountType, additionalData, amount, first, last, fee }) => {
  const { t } = useTranslation();
  const getAttempts = () => {
    const fromNum = additionalData.attempt.slice(0, 1);
    const toNum = additionalData.attempt.slice(2);

    return `Attempt ${fromNum} of ${toNum}`;
  };

  const fullAmount: number = amount + fee;

  return (
    <CustomRow marginTop={first ? 0 : 20} marginBottom={last ? 0 : 20}>
      <CustomRow justifyContent="flex-start">
        <IconSign iconName={icon} bgColor="white" iconColor={icon === 'externalAccount' ? 'charcoal70' : 'charcoal'} />
        <CustomRow flexDirection="column" alignItems="flex-start" marginLeft={50}>
          {accountType !== 'REPROCESS' ? (
            <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="N">
              {accountNickName}
            </BodyText>
          ) : (
            <>
              <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="N">
                {t(`tenxPayHome.Deduction Reprocess`)}
              </BodyText>
              <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="N">
                {getAttempts()}
              </BodyText>
            </>
          )}
        </CustomRow>
      </CustomRow>
      <CustomRow flexDirection="column" alignItems="flex-end">
        <CustomAmount amount={amount} size="smallerStrong" />
        {accountType !== 'REPROCESS' && (
          <BodyText textType="helperText" color="charcoal40" size="T" fontWeight="R">
            <Trans
              i18nKey="tenxPayHome.full amount request - fee"
              values={{
                fullAmount,
                fee,
              }}
            >
              (${amount + fee} request - ${fee} fee)
            </Trans>
          </BodyText>
        )}
      </CustomRow>
    </CustomRow>
  );
};
