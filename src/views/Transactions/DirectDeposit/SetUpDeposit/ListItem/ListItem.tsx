import React from 'react';
import { BodyText } from 'components/general/Typography';
import { SCircle } from 'views/Transactions/DirectDeposit/SetUpDeposit/SetUpDepositPage.styles';

interface IListItem {
  order: string;
  text: string;
}

export const ListItem: React.FC<IListItem> = ({ order, text }) => {
  return (
    <div className="listItem">
      <SCircle>{order}</SCircle>
      <BodyText textType="bodyText" color="charcoal" fontWeight="R" size="N" paddingRight={10}>
        {text}
      </BodyText>
    </div>
  );
};
