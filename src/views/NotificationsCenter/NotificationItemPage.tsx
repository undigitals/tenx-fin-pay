import { BodyText } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { INotificationItem } from 'store/user/notificationsCenter/notificationsCenter.types';
import { useLazyGetNotificationByIdQuery, useLazyGetNotificationsQuery } from 'store/user/users.api';
import { Icon } from 'components/general/Icon/Icon';
import { format } from 'date-fns';
import { Loader } from 'components/general/Loader/Loader';
import { useToggle } from 'utils/hooks/useToggle';
import { SCustomCard } from './ItemCard/ItemCard.styles';
import { SettingsModal } from './SettingsModal/SettingsModal';
import { DeleteModal } from './DeleteModal/DeleteModal';

const alertMap = {
  security: '3EC55B87-4D10-4E96-9BB0-0C1C76EC1B9E',
  balance: '99784479-CC78-494F-9D6C-698526D05FBD',
};

const getIcon = (typeId: string) => {
  return typeId === alertMap.security ? <Icon name="security" size="normal" cursorPointer /> : <Icon name="creditCard" size="normal" cursorPointer />;
};

export const NotificationItemPage = () => {
  const { id } = useParams();
  const [getNotificationById, { isLoading }] = useLazyGetNotificationByIdQuery();
  const [getNotifications] = useLazyGetNotificationsQuery();
  const [item, setItem] = useState<INotificationItem | null>(null);
  const time = item?.dateSent.split('T')[1].substring(0, 5);
  const date = item?.dateSent && format(new Date(item?.dateSent), 'PP');
  const formattedHtml = item ? { __html: item?.htmlMessage } : { __html: '' };
  const settingsModal = useToggle();
  const deleteModal = useToggle();

  const handleClickDots = () => {
    settingsModal.show();
  };

  useEffect(() => {
    if (id) {
      getNotificationById(id)
        .unwrap()
        .then((res) => {
          // @ts-ignore
          setItem(res[0]);
          getNotifications(false);
        });
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <SCustomCard className="card">
        <CustomRow>
          <CustomRow>
            <span className={`icon-pad ${item?.alertCategoryId === alertMap.security ? 'security' : 'balance'}`}>{item && getIcon(item?.alertCategoryId)}</span>
            <CustomRow flexDirection="column" paddingLeft={8} paddingRight={12} alignItems="flex-start">
              <BodyText textType="bodyText" size="N" fontWeight="SB" color="charcoal" lineHeight="20px" marginBottom={4}>
                {item?.subject}
              </BodyText>
              <BodyText textType="bodyText" size="T" fontWeight="M" color="charcoal70" className="time" lineHeight="16px" marginBottom={4}>
                {time}, {date}
              </BodyText>
            </CustomRow>
          </CustomRow>

          <span className="dots">
            <Icon name="dotsMenuThin" size="normal" color="charcoal70" onClick={handleClickDots} cursorPointer />
          </span>
        </CustomRow>
        <CustomRow marginTop={32}>
          <div dangerouslySetInnerHTML={formattedHtml as { __html: string }} />
        </CustomRow>
      </SCustomCard>

      <SettingsModal open={settingsModal.isActive} onClose={settingsModal.hide} openDeleteModal={deleteModal.show} status={item?.status} />
      <DeleteModal open={deleteModal.isActive} onClose={deleteModal.hide} alertHistoryId={item?.alertHistoryId || ''} />
    </>
  );
};
