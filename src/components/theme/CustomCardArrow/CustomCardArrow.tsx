import React from 'react';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Icon } from 'components/general/Icon/Icon';
import { TThemeColor } from 'styles/theme';
import { BodyText } from 'components/general/Typography';
import { SIcon, SInner } from './CustomCardArrow.styles';

interface ICustomCardDirectionProps {
  icon: string;
  title: string;
  iconColor?: TThemeColor;
  arrowColor?: TThemeColor;
  className?: string;
  marginBottom?: number;
  marginTop?: number;
  onClick?: () => void;
}

export const CustomCardArrow: React.FC<ICustomCardDirectionProps> = ({ icon, iconColor = 'charcoal', arrowColor = 'charcoal', className, title, marginBottom, marginTop, onClick = () => {} }) => (
  <CustomCard padding="33px 24px" marginTop={marginTop} marginBottom={marginBottom} onClick={onClick} className={className}>
    <SInner>
      <BodyText
        textType="bodyText"
        font="Poppins"
        fontWeight="SB"
        size="M"
        color="charcoal"
        marginBottom={0}
        marginTop={0}
        icon={<Icon marginRight={12} name={icon} color={iconColor} size="normal" />}
        cursorPointer
        lineHeight={1.3}
      >
        {title}
      </BodyText>
      <SIcon name="chevronRight" size="smallest" color={arrowColor} cursorPointer />
    </SInner>
  </CustomCard>
);
