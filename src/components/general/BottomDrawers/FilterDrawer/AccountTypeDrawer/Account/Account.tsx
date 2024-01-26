import React from 'react';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { theme } from 'styles/theme';
import { RadioButton } from 'components/general/RadioButton/RadioButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText } from 'components/general/Typography';
import { SAccountDefaultLabel } from 'components/general/BottomDrawers/FilterDrawer/AccountTypeDrawer/AccountDrawer.styles';

export const Account: React.FC<any> = ({ id, title, description, amount, isDefault, nestedAccounts, onChange, isSelectedAccountId }) => {
  const isChecked = isSelectedAccountId === id;

  const onRadioChange = () => onChange(id);

  return (
    <CustomCard border={`2px solid ${isChecked ? theme.blue : theme.charcoal5}`} width="100%" borderRadius={16} padding={`${isDefault ? '0' : '32px'} 0 32px`} marginTop={0} marginBottom={14}>
      {isDefault && (
        <SAccountDefaultLabel>
          <BodyText color="white" fontWeight="R" size="T" textType="bodyText">
            Default account
          </BodyText>
        </SAccountDefaultLabel>
      )}

      <CustomRow flexDirection="column" justifyContent="flex-start" alignItems="stretch" paddingLeft={24} paddingRight={24}>
        <CustomRow flexDirection="column" alignItems="flex-start" marginBottom={34}>
          <RadioButton checked={isChecked} onChange={onRadioChange}>
            <CustomRow flex={1} justifyContent="space-between" alignItems="flex-start">
              <CustomRow flexDirection="column" justifyContent="center" alignItems="flex-start" paddingLeft={4}>
                <BodyText color="charcoal" fontWeight="B" size="M" textType="bodyText" marginBottom={description ? 6 : 0}>
                  {title}
                </BodyText>

                <BodyText color="charcoal70" fontWeight="R" size="N" textType="bodyText">
                  {description}
                </BodyText>
              </CustomRow>

              <BodyText color="charcoal" fontWeight="B" size="M" textType="bodyText">
                ${amount}
              </BodyText>
            </CustomRow>
          </RadioButton>
        </CustomRow>

        <CustomRow marginLeft={36} marginBottom={8}>
          <BodyText color="charcoal70" fontWeight="R" size="N" textType="bodyText">
            {nestedAccounts?.needs?.title}
          </BodyText>

          <BodyText color="charcoal70" fontWeight="R" size="N" textType="bodyText">
            ${nestedAccounts?.needs?.amount}
          </BodyText>
        </CustomRow>

        <CustomRow marginLeft={36}>
          <BodyText color="charcoal70" fontWeight="R" size="N" textType="bodyText">
            {nestedAccounts?.goals?.title}
          </BodyText>

          <BodyText color="charcoal70" fontWeight="R" size="N" textType="bodyText">
            ${nestedAccounts?.goals?.amount}
          </BodyText>
        </CustomRow>
      </CustomRow>
    </CustomCard>
  );
};
