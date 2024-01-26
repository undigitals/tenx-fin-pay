import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { INotificationItem } from 'store/user/notificationsCenter/notificationsCenter.types';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { SBodyText, SCustomCard } from './ItemCard.styles';

interface IProps {
  notification: INotificationItem;
  openSettings: () => void;
  setCurrentNotification: (value: string) => void;
}

const alertMap = {
  security: '3EC55B87-4D10-4E96-9BB0-0C1C76EC1B9E',
  balance: '99784479-CC78-494F-9D6C-698526D05FBD',
};

const getIcon = (typeId: string) => {
  return typeId === alertMap.security ? <Icon name="security" size="normal" cursorPointer /> : <Icon name="creditCard" size="normal" cursorPointer />;
};

export const ItemCard: React.FC<IProps> = ({ notification, openSettings, setCurrentNotification }) => {
  const navigate = useNavigate();
  const isNew = notification.status === 'New';
  const time = notification.dateSent.split('T')[1].substring(0, 5);

  const handleClickDots = () => {
    setCurrentNotification(notification.alertHistoryId);
    openSettings();
  };

  const handleClickCard = () => {
    navigate(`${ROUTES.notificationsCenter.path}/${notification.alertHistoryId}`);
  };

  return (
    <SCustomCard className={`card ${isNew ? 'new' : ''}`}>
      {isNew && <span className="ellipsis" />}
      <CustomRow>
        <CustomRow onClick={handleClickCard}>
          <span className={`icon-pad ${notification.alertCategoryId === alertMap.security ? 'security' : 'balance'} ${isNew ? 'new' : ''}`}>{getIcon(notification.alertCategoryId)}</span>
          <CustomRow flexDirection="column" paddingLeft={8} paddingRight={12} alignItems="flex-start" cursorPointer>
            <BodyText textType="bodyText" size="N" fontWeight={isNew ? 'B' : 'R'} color="charcoal" lineHeight="20px" marginBottom={4} cursorPointer>
              {notification.subject}
            </BodyText>
            <BodyText textType="bodyText" size="T" fontWeight="M" color="charcoal70" className="time" lineHeight="16px" marginBottom={4}>
              {time}
            </BodyText>
            <SBodyText textType="bodyText" size="T" fontWeight="R" color="charcoal70" lineHeight="16px">
              {notification.plainMessage}
            </SBodyText>
          </CustomRow>
        </CustomRow>

        <span className="dots">
          <Icon name="dotsMenuThin" size="normal" color="charcoal70" onClick={handleClickDots} cursorPointer />
        </span>
      </CustomRow>
    </SCustomCard>
  );
};
