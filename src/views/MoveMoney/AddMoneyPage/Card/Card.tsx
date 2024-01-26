import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Title, BodyText } from 'components/general/Typography';
import { setShowAdditionalInformationModal } from 'store/ui.slice';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { SIconWrapper, SCustomRow } from './Card.style';

interface CardProps {
  title: string;
  subtitle?: string;
  icon?: ReactElement;
  onClick?: (() => void) | undefined;
  showInfo?: boolean;
  showNext?: boolean;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, icon, onClick, showInfo = false, showNext = true, padding = 0 }) => {
  const dispatch = useDispatch();

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
      <SCustomRow cursorPointer padding={padding}>
        <CustomRow flexDirection="row" alignItems="flex-start" cursorPointer>
          <Title icon={icon} size="sS" font="DM Sans" fontWeight="B" color="charcoal" lineHeight={1.5}>
            {title}
            {subtitle && (
              <BodyText textType="bodyText" color="charcoal70" size="T" fontWeight="R">
                {subtitle}
              </BodyText>
            )}
          </Title>
          {showInfo && (
            <SIconWrapper>
              <Icon color="blue" name="circleInfo" size="smallest" onClick={onShowModalHandler} cursorPointer />
            </SIconWrapper>
          )}
        </CustomRow>
        {showNext && (
          <CustomRow marginLeft={10} cursorPointer>
            <Icon name="chevronRight" color="blue" size="smaller" cursorPointer />
          </CustomRow>
        )}
      </SCustomRow>
    </CustomCard>
  );
};
