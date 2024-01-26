import React from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { TIconName } from 'components/general/Icon/Icon.types';
import { IconSign } from 'components/general/Icon/IconSign';
import { Title, BodyText } from 'components/general/Typography';
import { setShowAdditionalInformationModal } from 'store/ui.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { SIconWrapper, SCustomRow, SSpan } from './Card.style';

interface CardProps {
  title: string;
  titleInline?: string;
  subtitle?: string;
  subtitleInline?: string;
  iconName: TIconName;
  onClick?: (() => void) | undefined;
  showInfo?: boolean;
  showNext?: boolean;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, subtitleInline, titleInline, iconName, onClick, showInfo = false, showNext = true, padding = 0 }) => {
  const dispatch = useAppDispatch();

  const onShowModalHandler = () => {
    dispatch(
      setShowAdditionalInformationModal({
        displayAdditionalInformationModal: true,
        additionalInformationModalType: 'universalInfo',
      })
    );
  };

  return (
    <CustomCard onClick={onClick} marginTop={0} padding="0">
      <SCustomRow padding={padding}>
        <div className="move-money-card">
          <Title icon={<IconSign iconName={iconName} iconColor="blue" bgColor="blue5" />} size="sS" font="DM Sans" fontWeight="B" color="charcoal" lineHeight={1.5}>
            <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="B" display="inline" className="move-money-card-title">
              {title}
            </BodyText>
            {subtitleInline && (
              <BodyText textType="bodyText" color="charcoal70" size="T" fontWeight="R" marginLeft={10} display="inline" className="move-money-card-subtitle">
                {subtitleInline}
              </BodyText>
            )}
            {titleInline && <SSpan> {titleInline}</SSpan>}
            {subtitle && (
              <BodyText textType="bodyText" color="charcoal70" size="T" fontWeight="R" marginRight={showNext ? 16 : 40} className="move-money-card-subtitle">
                {subtitle}
              </BodyText>
            )}
          </Title>
          {showInfo && (
            <SIconWrapper>
              <Icon color="blue" name="circleInfo" size="smallest" onClick={onShowModalHandler} cursorPointer />
            </SIconWrapper>
          )}
        </div>
        {showNext && <Icon name="chevronRight" color="blue" size="smaller" cursorPointer />}
      </SCustomRow>
    </CustomCard>
  );
};
