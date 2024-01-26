import React from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { RadioButton } from 'components/general/RadioButton/RadioButton';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText } from 'components/general/Typography';
import { Icon } from 'components/general/Icon/Icon';
import { IDestinationItem } from 'components/general/BottomDrawers/DestinationAccountSheet/DestinationAccountSheet.types';

export const DestinationAccount: React.FC<IDestinationItem> = ({
  id,
  alias,
  details = '0000',
  onChange,
  unAppliedDestinationAccount,
  accountType,
  name = '',
  accountTypeDetails = '',
  primaryAccount,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSelected = unAppliedDestinationAccount.id === id;
  const cardLastDigits = details.slice(-4, details.length);
  const title = `${alias} (${cardLastDigits})`;
  let subTitle = '';
  let iconName = '';

  switch (accountType) {
    case 'BANK':
      subTitle = name;
      iconName = 'cash';
      break;
    case 'CARD':
    default:
      subTitle = accountTypeDetails;
      iconName = primaryAccount ? 'goal' : 'needsAccount';
      break;
  }

  const handleRadioChange = () => {
    onChange(id, title, alias, iconName);
  };

  return (
    <CustomCard border={`2px solid ${isSelected ? theme.blue : theme.charcoal5}`} width="100%" borderRadius={16} padding="32px 24px" marginTop={0} marginBottom={14}>
      <CustomRow>
        <RadioButton onChange={handleRadioChange} checked={isSelected}>
          <CustomRow flexDirection="row" width="100%">
            <Icon name={iconName} color="orange" marginLeft={5} marginRight={15} size="big" />

            <CustomRow alignItems="start" flexDirection="column" width="100%">
              <BodyText textType="bodyText" color="charcoal" fontWeight="B" font="DM Sans" size="N">
                {id === 0 ? `Primary ${t(title)}` : `${t(title)}`}
              </BodyText>

              <BodyText textType="bodyText" color="charcoal70" fontWeight="R" font="DM Sans" size="N" marginTop={4}>
                {subTitle}
              </BodyText>
            </CustomRow>
          </CustomRow>
        </RadioButton>
      </CustomRow>
    </CustomCard>
  );
};
