import React from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { TTagProps } from 'views/Account/BalancesTransactionsPage/BalancesTransactionsPage.types';
import { SLayout } from './Tag.styles';

export const Tag: React.FC<TTagProps> = ({ title = 'default name', onClose, isClosable }) => (
  <SLayout>
    <BodyText color="charcoal" fontWeight="B" size="T" textType="bodyText" marginRight={4}>
      {title}
    </BodyText>

    {isClosable && <Icon name="close" size="mini" color="charcoal" onClick={onClose} cursorPointer />}
  </SLayout>
);
