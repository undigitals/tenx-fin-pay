import React from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { Title } from 'components/general/Typography';
import { FundsSheetProps } from './FundsModal.type';

export const FundsSheet: React.FC<FundsSheetProps> = ({ isVisible = false, title, onCancelHandler, children }) => (
  <CustomSheet
    className="move-money-accounts-sheet"
    isOpen={isVisible}
    onClose={onCancelHandler}
    header={false}
    closable={false}
    wrapperPadding={false}
    height="75%"
    contentWrapperStyle={{ borderRadius: '24px 24px 0px 0px' }}
  >
    <CustomRow minHeight="100%" flexDirection="column" paddingTop={15}>
      <CustomRow flexDirection="column" width="100%" justifyContent="flex-start" alignItems="flex-start">
        <CustomRow justifyContent="flex-start" alignItems="center" marginBottom={39}>
          <Icon name="arrowLeft" color="charcoal" cursorPointer size="small" onClick={onCancelHandler} />
          <Title size="S" fontWeight="SB" font="Poppins" marginLeft={15}>
            {title}
          </Title>
        </CustomRow>
        {children}
      </CustomRow>
    </CustomRow>
  </CustomSheet>
);
