import React from 'react';
import { RadioButton } from 'components/general/RadioButton/RadioButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText } from 'components/general/Typography';
import { Icon } from 'components/general/Icon/Icon';
import { IThirdParty } from 'store/user/accounts/accounts.types';
import { SCustomCard } from './ExternalAccountItem.styles';

interface IExternalAccountItem {
  iconName?: string;
  item: IThirdParty;
  onChange: (id: string) => void;
  isSelected?: boolean;
}

export const ExternalAccountItem: React.FC<IExternalAccountItem> = ({ iconName = 'creditCard', item, onChange, isSelected = false }) => {
  const handleRadioChange = () => {
    onChange(item.id);
  };

  return (
    <SCustomCard bgColor={isSelected ? 'blue' : 'charcoal5'} width="100%" borderRadius={16} marginTop={0} marginBottom={20}>
      <CustomRow>
        <RadioButton onChange={handleRadioChange} checked={isSelected}>
          <CustomRow flexDirection="row" width="100%">
            <Icon name={iconName} size="normal" color="charcoal" cursorPointer marginLeft={5} marginRight={15} />
            <CustomRow alignItems="start" flexDirection="column" width="100%">
              <CustomRow flexDirection="row" width="100%">
                <BodyText textType="bodyText" color="charcoal" fontWeight="B" font="DM Sans" size="N">
                  {item.externalDisplayAccountName}
                </BodyText>
              </CustomRow>
              {item.externalDisplayAccountNumber && (
                <BodyText textType="bodyText" color="charcoal70" fontWeight="SM" font="DM Sans" size="N" marginTop={7}>
                  ({item.externalDisplayAccountNumber})
                </BodyText>
              )}
            </CustomRow>
          </CustomRow>
        </RadioButton>
      </CustomRow>
    </SCustomCard>
  );
};
