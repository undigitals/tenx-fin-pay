import React from 'react';
import { BodyText } from 'components/general/Typography';
import { ITransferItemProps } from './TransferItem.type';
import { SContent, SCircle, SCashTitleIcon, SMainTextBlock, SLastTextBlock } from './TransferItem.style';

export const TransferItem: React.FC<ITransferItemProps> = ({ iconName, title, value }) => (
  <SContent>
    <SCircle>
      <SCashTitleIcon name={iconName} color="blue" />
    </SCircle>

    <SMainTextBlock>
      <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="R">
        {title}
      </BodyText>
    </SMainTextBlock>

    <SLastTextBlock>
      <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="B">
        {value}
      </BodyText>
    </SLastTextBlock>
  </SContent>
);
