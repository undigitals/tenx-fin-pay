import React, { useState } from 'react';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { Title } from 'components/general/Typography';
import { Account } from './Account/Account';
import { SAccountDrawer } from './AccountDrawer.styles';

const accountsMock: any = {
  accountsTypes: 'Cash Accounts',
  list: [
    {
      id: 0,
      type: 'cash',
      title: 'Primary Cash Account',
      amount: '1,400.80',
      description: 'Nick`s joint account (9010)',
      isDefault: true,
      nestedAccounts: {
        needs: {
          id: 0,
          type: 'needs',
          title: 'Needs Account 1',
          amount: '1,400.80',
          description: '',
        },
        goals: {
          id: 1,
          type: 'goals',
          title: 'Goals Account 2',
          amount: '1,400.80',
          description: '',
        },
      },
    },
    {
      id: 1,
      type: 'cash',
      title: 'Cash Account 2',
      amount: '1,400.80',
      description: '',
      isDefault: false,
      nestedAccounts: {
        needs: {
          id: 0,
          type: 'needs',
          title: 'Needs Account 2',
          amount: '1,400.80',
          description: '',
        },
        goals: {
          id: 1,
          type: 'goals',
          title: 'Goals Account 2',
          amount: '1,400.80',
          description: '',
        },
      },
    },
  ],
};

export const AccountDrawer: React.FC<any> = ({ isOpen, onClose }) => {
  const [isSelectedAccountId, setIsSelectedAccountId] = useState<null | number>(null);

  const onCheckedAccount = (id: number) => {
    setIsSelectedAccountId(id);
  };

  return (
    <SAccountDrawer isOpen={isOpen} onClose={onClose} header closable={false} wrapperPadding={false} headerStyle={{ minHeight: 0, padding: 0 }} bodyStyle={{ padding: '24px 24px 60px' }} height="90%">
      <CustomRow justifyContent="flex-start" alignItems="center" marginBottom={30}>
        <Icon name="arrowLeft" color="charcoal" cursorPointer size="small" />

        <Title size="S" fontWeight="SB" font="Poppins" marginLeft={15}>
          {accountsMock?.accountsTypes}
        </Title>
      </CustomRow>

      <CustomRow flex={1} flexDirection="column" justifyContent="flex-start">
        {accountsMock?.list?.map((item: any) => (
          <Account {...item} onChange={onCheckedAccount} isSelectedAccountId={isSelectedAccountId} />
        ))}
      </CustomRow>

      <CustomButton type="button" size="middleStretch" preset="primary" marginBottom={16}>
        Select Account
      </CustomButton>
    </SAccountDrawer>
  );
};
