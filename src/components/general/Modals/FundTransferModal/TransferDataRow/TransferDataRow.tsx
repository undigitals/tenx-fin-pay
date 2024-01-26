import React from 'react';
import { BodyText } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';

interface ITransferDataRowProps {
  title: string;
  value?: string | number;
  subvalue?: string;
  isAmount?: boolean;
  isLast?: boolean;
}
export const TransferDataRow: React.FC<ITransferDataRowProps> = ({ title, value = '', subvalue, isAmount = false, isLast = false }) => (
  <CustomRow marginBottom={isLast ? 0 : 27}>
    <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" nowrap marginRight={10}>
      {title}
    </BodyText>
    <CustomRow justifyContent="flex-end">
      {isAmount ? (
        <CustomAmount amount={value as number} size="smallerStrong" color="charcoal" />
      ) : (
        <>
          <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" textAlign="end" extraStyles={{ flex: 1 }}>
            {value}
          </BodyText>
          {subvalue && (
            <BodyText textType="bodyText" color="charcoal70" size="T" fontWeight="R" marginLeft={10}>
              {subvalue}
            </BodyText>
          )}
        </>
      )}
    </CustomRow>
  </CustomRow>
);
