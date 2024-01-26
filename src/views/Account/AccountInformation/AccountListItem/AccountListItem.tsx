import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import i18next from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { IAccountItem } from 'store/user/accounts/accounts.types';

interface IAccountListItem {
  onClick: () => void;
  account: IAccountItem;
}

export const AccountListItem: React.FC<IAccountListItem> = ({ onClick, account }) => {
  const { firstName, preferredName } = useSelector(selectCurrentUser) || {};
  const isOwner = account?.owner;

  const getTitle = () => {
    if (isOwner) return i18next.t('accountInformation.OwnerAccountName', { name: preferredName || firstName });

    return i18next.t('accountInformation.JointAccountName', { accountNumber: account?.fiservAccountId.slice(-4) });
  };

  return (
    <CustomCard onClick={onClick} marginBottom={15} cursorPointer width="100%">
      <CustomRow cursorPointer>
        <BodyText textType="bodyText" size="M" fontWeight="M" color="charcoal" cursorPointer>
          {getTitle()}
        </BodyText>

        <Icon name="chevronRight" color="blue" size="smaller" cursorPointer />
      </CustomRow>
    </CustomCard>
  );
};
