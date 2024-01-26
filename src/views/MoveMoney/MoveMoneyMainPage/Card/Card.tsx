import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from 'components/general/Icon/Icon';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Title, BodyText } from 'components/general/Typography';
import { setShowComingSoonModal } from 'store/ui.slice';

interface CardProps {
  title: string;
  subtitle?: string;
  icon: ReactElement;
  route?: string;
  last?: boolean;
  isComingSoon?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, icon, route, isComingSoon = false, last = false, onClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openComingSoonModal = (): void => {
    dispatch(setShowComingSoonModal(true));
  };

  const handleClick = () => {
    if (isComingSoon) {
      openComingSoonModal();
      return;
    }

    if (route) {
      navigate(route);
    }

    onClick?.();
  };

  return (
    <CustomCard marginBottom={last ? 35 : 0} padding="16px 20px" cursorPointer onClick={handleClick} className="move-money-card">
      <div className="flex flex-start move-money-card-inner">
        <div className="flex flex-start" onClick={handleClick}>
          <Title icon={icon} size="sS" font="DM Sans" fontWeight="B" color="charcoal">
            {title}
            {(isComingSoon || subtitle) && (
              <BodyText textType="bodyText" color="charcoal70" size="T" fontWeight="R" lineHeight={1.6}>
                {isComingSoon ? t('moveMoney.Coming Soon') : subtitle}
              </BodyText>
            )}
          </Title>
        </div>
        <div className="move-money-card-icon-wrapper" onClick={handleClick}>
          <Icon name="chevronRight" color="blue" size="smaller" cursorPointer />
        </div>
      </div>
    </CustomCard>
  );
};
