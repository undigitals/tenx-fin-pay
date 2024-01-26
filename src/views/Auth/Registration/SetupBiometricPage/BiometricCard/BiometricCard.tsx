import React from 'react';
import { TThemeColor } from 'styles/theme';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { SIcon } from './BiometricCard.styles';

interface IBiometricCard {
  handleSelect: () => void;
  isSetUp?: boolean;
  iconName: string;
  color: TThemeColor;
  title: string;
}

export const BiometricCard: React.FC<IBiometricCard> = ({ handleSelect, isSetUp = false, color, title, iconName }) => {
  return (
    <CustomCard padding="26px 50px" onClick={handleSelect} cursorPointer>
      <CustomRow flexDirection="column">
        {isSetUp && <SIcon name="checked" size="xs" color="green" marginBottom={24} />}
        <Icon name={iconName} size="bigger" color={isSetUp ? 'green' : color} marginBottom={24} />
        <BodyText textType="bodyText" fontWeight="R" size="N" color={isSetUp ? 'green' : color}>
          {title}
        </BodyText>
      </CustomRow>
    </CustomCard>
  );
};
