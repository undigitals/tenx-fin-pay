import React from 'react';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText } from 'components/general/Typography';
import { IconSign } from 'components/general/Icon/IconSign';
import { getFormattedDateFromString } from 'utils/helpers/dateHelpers';
import { parseISO, format } from 'date-fns';
import { useTranslation } from 'react-i18next';

interface IListItem {
  time: number;
  date: string;
  amount: number;
  first?: boolean;
  last?: boolean;
}

export const ListItem: React.FC<IListItem> = ({ time, date, amount, first, last }) => {
  const { t } = useTranslation();

  const formatDate = (value: string) => {
    const formatWeek = format(parseISO(value), 'eee');
    const formatDaysMonth = getFormattedDateFromString(value);
    return `${t(`tenxPayHome.${formatWeek}`)} ${formatDaysMonth}`;
  };

  const formatTime = (value: number) => {
    const hoursMinutes = new Date(value * 1000).toISOString().substring(11, 16);

    let hours = hoursMinutes.split(':')[0];
    let minutes = hoursMinutes.split(':')[1];

    if (hours === '00') hours = '';
    if (minutes === '00') minutes = '';
    if (hours.charAt(0) === '0') hours = hours.slice(1);
    if (minutes.charAt(0) === '0') minutes = minutes.slice(1);

    const timeString = `${hours ? `${hours} h` : ''} ${minutes ? `${minutes} min` : ''}`;

    return timeString;
  };

  return (
    <CustomRow marginTop={first ? 0 : 16} marginBottom={last ? 0 : 16}>
      <CustomRow justifyContent="flex-start">
        <IconSign iconName="time" />
        <CustomRow flexDirection="column" alignItems="flex-start" marginLeft={8}>
          <BodyText textType="bodyText" size="N" color="charcoal" fontWeight="B">
            {formatTime(time)}
          </BodyText>
          <BodyText textType="bodyText" size="T" color="charcoal60" fontWeight="B">
            {formatDate(date)}
          </BodyText>
        </CustomRow>
      </CustomRow>
      <CustomAmount amount={amount} size="smaller" sign />
    </CustomRow>
  );
};
