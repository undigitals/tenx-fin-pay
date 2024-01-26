import React from 'react';
import { RadioButton } from 'components/general/RadioButton/RadioButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText } from 'components/general/Typography';
import { Icon } from 'components/general/Icon/Icon';
import { getAccountTitle } from 'utils/helpers/accounts/accountsHelper';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { useSelector } from 'react-redux';
import { useLanguage } from 'utils/hooks/useLanguage';
import { IInternalAccountItem, IAccountIcon } from './InternalAccountItem.type';
import { SCustomCard } from './InternalAccountItem.styles';

const ACCOUNTS_ICONS = [
  {
    type: 'Cash',
    iconName: 'cash',
  },
  {
    type: 'Save',
    iconName: 'goal',
  },
  {
    type: 'Stuff',
    iconName: 'needsAccount',
  },
];

export const InternalAccountItem: React.FC<IInternalAccountItem> = ({ item, onChange, isSelected = false }) => {
  const { language } = useLanguage();
  const { firstName, preferredName } = useSelector(selectCurrentUser) || {};

  const handleRadioChange = () => {
    onChange(item);
  };

  const getIconName = () => {
    const selectedIcon = ACCOUNTS_ICONS.find((acIcon: IAccountIcon) => acIcon.type === item.type);
    return selectedIcon ? selectedIcon.iconName : 'creditCard';
  };

  return (
    <SCustomCard bgColor={isSelected ? 'blue' : 'charcoal5'} width="100%" borderRadius={16} marginTop={0} marginBottom={20}>
      <CustomRow>
        <RadioButton onChange={handleRadioChange} checked={isSelected}>
          <CustomRow flexDirection="row" width="100%">
            <Icon name={getIconName()} size="normal" color="orange" cursorPointer marginLeft={5} marginRight={15} />
            <CustomRow alignItems="start" flexDirection="column" width="100%">
              <CustomRow flexDirection="column" alignItems="flex-start" width="100%" gap={10}>
                <BodyText textType="bodyText" color="charcoal" fontWeight="B" font="DM Sans" size="N">
                  {item.owner ? 'Primary ' : ''}
                  {item.type} Account
                </BodyText>
                <BodyText textType="bodyText" color="charcoal70" fontWeight="R" font="DM Sans" size="N">
                  {getAccountTitle(language, item, firstName, preferredName)}
                </BodyText>
              </CustomRow>
            </CustomRow>
          </CustomRow>
        </RadioButton>
      </CustomRow>
    </SCustomCard>
  );
};
