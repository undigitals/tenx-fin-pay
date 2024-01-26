import React from 'react';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { TAddAccountType } from 'store/user/accounts/accounts.types';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { SContainer } from './Card.styles';

type TCardProp = {
  title: string;
  name: string;
  list: React.ReactNode[];
  handleOpenAccount: () => void;
  isAccountExist: boolean;
  addAccountType: TAddAccountType;
};

export const Card: React.FC<TCardProp> = ({ title, name, list, handleOpenAccount, isAccountExist, addAccountType }) => {
  const { t } = useTranslation();

  return (
    <SContainer>
      <CustomRow alignItems="flex-end">
        <div>
          <div className="title-container">
            <Title fontWeight="SB" size="sM">
              {title}
            </Title>
          </div>

          <ul>
            {list.map((cardData: React.ReactNode, index: number) => (
              <li className="listItemLvl1" id={`${name}=${index}`}>
                <BodyText textType="bodyText" fontWeight="R" size="M" color="charcoal70" marginBottom={8} lineHeight="24px">
                  {cardData}
                </BodyText>
              </li>
            ))}
          </ul>
        </div>
        <CustomRow>
          <CustomButton preset="primary" onClick={handleOpenAccount} disabled={isAccountExist}>
            {addAccountType === 'needs' ? t('addAccount.needs.Button') : t('addAccount.goals.Button')}
          </CustomButton>
        </CustomRow>
      </CustomRow>
    </SContainer>
  );
};
